import { findScheme } from './find-scheme';
import { getAvailableSchemes } from './get-available-schemes';
import { getScheme } from './get-scheme';

export const vTranslitSchemes = schemes => (

  {

    findScheme: findScheme(schemes),
    getAvailableSchemes: getAvailableSchemes(schemes),
    getScheme: getScheme(schemes),

  }

);
