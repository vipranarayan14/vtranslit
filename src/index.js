import { init } from './init';
import { manageSchemes } from './scheme/manage-schemes';

export const vTranslit = (schemes = []) => {

  if (!schemes.length) {

    throw new Error('Function vTranslit requires vtranslit schemes in an array format.');

  }

  const schemesManager = manageSchemes(schemes);

  return {

    find: schemesManager.find,
    init: init(schemesManager.get, schemesManager.list),
    list: schemesManager.list

  };

};
