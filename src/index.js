import { getAvailableSchemes, getScheme } from './schemes';
import { devanagariScheme } from './vtranslit-schemes/vtranslit-Deva-scheme';
import { itransScheme } from './vtranslit-schemes/vtranslit-Itrn-scheme';
import { kannadaScheme } from './vtranslit-schemes/vtranslit-Knda-scheme';
import { tamilScheme } from './vtranslit-schemes/vtranslit-Taml-scheme';
import { teluguScheme } from './vtranslit-schemes/vtranslit-Telu-scheme';

export const vTranslitSchemes = {

  devanagariScheme,
  getAvailableSchemes,
  getScheme,
  itransScheme,
  kannadaScheme,
  tamilScheme,
  teluguScheme

};
