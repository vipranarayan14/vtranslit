import { devanagariScheme } from './vtranslit-schemes/vtranslit-Deva-scheme';
import { itransScheme } from './vtranslit-schemes/vtranslit-Itrn-scheme';
import { tamilScheme } from './vtranslit-schemes/vtranslit-Taml-scheme';

export const getScheme = schemeCode =>

  [
    itransScheme,
    devanagariScheme,
    tamilScheme
  ].find(scheme => scheme.about.scriptCode === schemeCode);
