import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Cherry_Bomb_One,
  DynaPuff,
  Lilita_One,
} from 'next/font/google';

// export const fontNunitoSans = Nunito_Sans({
//   subsets: ['latin'],
//   variable: '--font-nunitoSans',
// });

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400'],
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontCherryBomb = Cherry_Bomb_One({
  subsets: ['latin'],
  variable: '--font-cherry-bomb',
  weight: ['400'],
});

export const fontDynaPuff = DynaPuff({
  subsets: ['latin'],
  variable: '--font-dynaPuff',
  weight: ['400'],
});

export const fontLilitaOne = Lilita_One({
  subsets: ['latin'],
  variable: '--font-lilita-one',
  weight: ['400'],
});
