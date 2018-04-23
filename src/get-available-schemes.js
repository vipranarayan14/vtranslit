import { schemes } from './schemes';

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
