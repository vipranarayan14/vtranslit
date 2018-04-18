import vTranslitDevaScheme from 'vtranslit-deva-scheme';
import vTranslitItrnScheme from 'vtranslit-itrn-scheme';
import vTranslitKndaScheme from 'vtranslit-knda-scheme';
import vTranslitTamlScheme from 'vtranslit-taml-scheme';
import vTranslitTeluScheme from 'vtranslit-telu-scheme';

export const schemes = [
  vTranslitDevaScheme,
  vTranslitItrnScheme,
  vTranslitKndaScheme,
  vTranslitTamlScheme,
  vTranslitTeluScheme
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

export const getScheme = schemeCode => {

  const scheme = schemes.find(_scheme => _scheme.about.schemeCode === schemeCode);

  if (scheme) {

    return scheme;

  }

  throw new Error(`No Scheme found with the given schemeCode: '${schemeCode}'`);

};
