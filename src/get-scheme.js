import { devanagariScheme } from './vtranslit-schemes/vtranslit-deva-scheme';
import { itransScheme } from './vtranslit-schemes/vtranslit-itran-scheme';

export const getScheme = schemeCode =>

  [
    devanagariScheme,
    itransScheme
  ].find(scheme => scheme.about.scriptCode === schemeCode);
