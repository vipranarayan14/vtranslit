import { devanagariScheme } from './vtranslit-schemes/vtranslit-Deva-scheme';
import { itransScheme } from './vtranslit-schemes/vtranslit-Itrn-scheme';
import { kannadaScheme } from './vtranslit-schemes/vtranslit-Knda-scheme';
import { tamilScheme } from './vtranslit-schemes/vtranslit-Taml-scheme';
import { teluguScheme } from './vtranslit-schemes/vtranslit-Telu-scheme';

const schemes = [
  itransScheme,
  devanagariScheme,
  kannadaScheme,
  tamilScheme,
  teluguScheme
];

export const getAvailableSchemes = () => {

  const availableSchemes = [];

  schemes.forEach(scheme => {

    availableSchemes.push({
      code: scheme.about.schemeCode,
      name: scheme.about.schemeName
    });

  });

  return availableSchemes;

};

export const getScheme = schemeCode =>

  schemes.find(scheme => scheme.about.schemeCode === schemeCode);
