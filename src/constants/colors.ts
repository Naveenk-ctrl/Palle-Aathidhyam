// Brand colour palette for Palle Aathidhyam
// Warm earthy tones reflecting traditional Telugu cuisine & rural heritage

export const colors = {
  primaryGreen: '#1F4D2E',
  secondaryGreen: '#2E6A3D',
  cream: '#F8F4EA',
  ivory: '#FDF8EF',
  gold: '#D4AF37',
  woodBrown: '#6B4A2D',
  darkBrown: '#3A2415',
  leafGreen: '#4C8C4A',
  lightGold: '#F1D27A',
  white: '#FFFFFF',
  black: '#151515',
} as const;

export const gradients = {
  hero: 'linear-gradient(180deg, rgba(26,26,26,0.4) 0%, rgba(26,26,26,0.7) 100%)',
  cta: 'linear-gradient(135deg, #1F4D2E 0%, #2E6A3D 50%, #1F4D2E 100%)',
  goldShimmer:
    'linear-gradient(135deg, #D4AF37 0%, #F1D27A 50%, #D4AF37 100%)',
  footer: 'linear-gradient(180deg, #1F4D2E 0%, #0f2a18 100%)',
} as const;

export type ColorName = keyof typeof colors;
export type GradientName = keyof typeof gradients;