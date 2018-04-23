import { schemes } from './schemes';

export const getScheme = schemeCode => {

  const scheme = schemes.find(_scheme => _scheme.about.schemeCode === schemeCode);

  if (scheme) {

    return scheme;

  }

  throw new Error(`No Scheme found with the given schemeCode: '${schemeCode}'`);

};
