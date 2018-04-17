import { devanagariScheme } from './vtranslit-schemes/vtranslit-Deva-scheme';
import { itransScheme } from './vtranslit-schemes/vtranslit-Itrn-scheme';
import { kannadaScheme } from './vtranslit-schemes/vtranslit-Knda-scheme';
import { tamilScheme } from './vtranslit-schemes/vtranslit-Taml-scheme';
import { teluguScheme } from './vtranslit-schemes/vtranslit-Telu-scheme';

const schemes = {
  'Deva': devanagariScheme,
  'Itrn': itransScheme,
  'Knda': kannadaScheme,
  'Taml': tamilScheme,
  'Telu': teluguScheme
};

export const getAvailableSchemes = () => {

  const availableSchemes = [];

  Object.values(schemes).forEach(scheme => {

    availableSchemes.push({
      code: scheme.about.schemeCode,
      name: scheme.about.schemeName
    });

  });

  return availableSchemes;

};

export const getScheme = schemeCode => {

  if (schemes[schemeCode]) {

    return schemes[schemeCode];

  }

  throw new Error(`No Scheme found with the given schemeCode: '${schemeCode}'`);

};
