export const listAvailableSchemes = schemes => () => {

  const availableSchemes = [];

  schemes.forEach(scheme => {

    availableSchemes.push({
      code: scheme.about.code,
      name: scheme.about.name
    });

  });

  return availableSchemes;

};
