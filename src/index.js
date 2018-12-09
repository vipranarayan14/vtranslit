import { init } from './init';
import { manageSchemes } from './scheme/manage-schemes';
import {validateSchemes} from './scheme/validate-schemes';

export const vTranslit = (schemes = []) => {

  const $schemes = validateSchemes(schemes);

  const {
    find,
    get,
    list
  } = manageSchemes($schemes);

  return {

    find,
    init: init(get, list),
    list

  };

};
