export const getScheme = schemes => schemeCode => {

  const scheme = schemes.find(_scheme =>

    _scheme.about.code === schemeCode

  );

  if (scheme) {

    return scheme;

  }

  throw new Error(`No Scheme found with the given schemeCode: '${schemeCode}'`);

};
