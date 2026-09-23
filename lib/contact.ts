export const WHATSAPP_NUMBER = '59896082266';

export function whatsappHref(message = 'Hola, quiero conversar sobre un proyecto con Colonia Cloud.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
