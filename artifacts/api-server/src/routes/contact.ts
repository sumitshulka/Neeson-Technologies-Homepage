import { Router, type IRouter } from "express";
import {
  GetContactCaptchaConfigResponse,
  SubmitContactEnquiryBody,
  SubmitContactEnquiryResponse,
} from "@workspace/api-zod";

type RecaptchaValidation = {
  success?: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

const router: IRouter = Router();
const RECAPTCHA_SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_MIN_SCORE = 0.5;

function getContactReceiver(): URL | null {
  const raw = process.env.CONTACT_FORM_ENDPOINT?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

router.get("/contact/captcha-config", (_req, res): void => {
  const siteKey = process.env.RECAPTCHA_SITE_KEY?.trim();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();

  res.json(
    GetContactCaptchaConfigResponse.parse({
      captchaConfigured: Boolean(siteKey && secretKey),
      ...(siteKey && secretKey ? { siteKey } : {}),
      deliveryConfigured: Boolean(getContactReceiver()),
    }),
  );
});

router.post("/contact/enquiries", async (req, res): Promise<void> => {
  const parsed = SubmitContactEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      { fields: parsed.error.issues.map((issue) => issue.path.join(".")) },
      "Rejected invalid contact enquiry",
    );
    res.status(400).json({ error: "invalid_request" });
    return;
  }

  const enquiry = parsed.data;
  if (enquiry.website?.trim()) {
    res.status(202).json(SubmitContactEnquiryResponse.parse({ status: "accepted" }));
    return;
  }

  if (
    !enquiry.name.trim() ||
    !enquiry.company.trim() ||
    enquiry.question.trim().length < 10
  ) {
    res.status(400).json({ error: "invalid_request" });
    return;
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();
  const siteKey = process.env.RECAPTCHA_SITE_KEY?.trim();
  if (!secretKey || !siteKey) {
    res.status(503).json({ error: "captcha_not_configured" });
    return;
  }

  const receiver = getContactReceiver();
  if (!receiver) {
    res.status(503).json({ error: "contact_delivery_not_configured" });
    return;
  }

  let validation: RecaptchaValidation;
  try {
    const response = await fetch(RECAPTCHA_SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: enquiry.recaptchaToken,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      req.log.warn({ statusCode: response.status }, "Google reCAPTCHA verification request failed");
      res.status(503).json({ error: "captcha_verification_unavailable" });
      return;
    }

    validation = (await response.json()) as RecaptchaValidation;
  } catch (error) {
    req.log.error({ err: error }, "Google reCAPTCHA verification unavailable");
    res.status(503).json({ error: "captcha_verification_unavailable" });
    return;
  }

  if (
    !validation.success ||
    validation.action !== "contact_enquiry" ||
    typeof validation.score !== "number" ||
    validation.score < RECAPTCHA_MIN_SCORE
  ) {
    req.log.warn(
      {
        score: validation.score,
        action: validation.action,
        errorCodes: validation["error-codes"] ?? [],
      },
      "Google reCAPTCHA rejected contact enquiry",
    );
    res.status(400).json({ error: "captcha_invalid" });
    return;
  }

  const { name, email, company, role, question, timing } = enquiry;
  try {
    const receiverResponse = await fetch(receiver, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, company, role, question, timing }),
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });

    if (!receiverResponse.ok) {
      req.log.error(
        { statusCode: receiverResponse.status },
        "Contact receiver rejected verified enquiry",
      );
      res.status(502).json({ error: "contact_delivery_failed" });
      return;
    }
  } catch (error) {
    req.log.error({ err: error }, "Contact receiver unavailable");
    res.status(502).json({ error: "contact_delivery_failed" });
    return;
  }

  res.status(202).json(SubmitContactEnquiryResponse.parse({ status: "accepted" }));
});

export default router;
