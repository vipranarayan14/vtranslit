import { findScheme } from './find-scheme';
import { getScheme } from './get-scheme';
import { listAvailableSchemes } from './list-available-schemes';

export const manageSchemes = (schemes) => ({
  find: findScheme(schemes),
  get: getScheme(schemes),
  list: listAvailableSchemes(schemes),
});
