export type BookingProvider = 'calendly' | 'cal.id' | 'calid' | 'custom';

/** Public integration settings live here; leave unset until verified values exist. */
export const contactConfig = {
  booking: {
    provider: 'calendly' as BookingProvider,
    calendlyUrl: '',
    calIdUrl: '',
    customUrl: '',
  },
  contact: {
    email: '',
    whatsappNumber: '',
    linkedinUrl: '',
    phone: '',
  },
  forms: {
    endpoint: '',
  },
  typicalResponse: 'Typical response: within two business days.',
};

export function getBookingUrl() {
  const { booking } = contactConfig;
  if (booking.provider === 'calendly') return booking.calendlyUrl;
  if (booking.provider === 'cal.id' || booking.provider === 'calid') return booking.calIdUrl;
  return booking.customUrl;
}
