import { devanagariScheme } from './vtranslit-schemes/vtranslit-Deva-scheme';
import { itransScheme } from './vtranslit-schemes/vtranslit-Itrn-scheme';

export const getScheme = schemeCode =>

  [
    devanagariScheme,
    itransScheme
  ].find(scheme => scheme.about.scriptCode === schemeCode);
