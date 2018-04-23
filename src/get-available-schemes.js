import { schemes } from './schemes';

export const getAvailableSchemes = () => {

  const availableSchemes = [];

  schemes.forEach(scheme => {

    availableSchemes.push({
      code: scheme.about.code,
      name: scheme.about.name
    });

  });

  return availableSchemes;

};
