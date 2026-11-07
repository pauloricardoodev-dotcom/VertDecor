import type { ContactInfo } from '../types';

// PLACEHOLDERS — preencher com os dados oficiais da Vert Decor. Não inventar.
export const contact: ContactInfo = {
  whatsapp: '',
  whatsappMessage: 'Olá, Vert Decor! Gostaria de conhecer as peças da coleção.',
  instagram: '',
  email: '',
};

export const whatsappUrl = (info: ContactInfo = contact): string | null =>
  info.whatsapp
    ? `https://wa.me/${info.whatsapp}?text=${encodeURIComponent(info.whatsappMessage)}`
    : null;
