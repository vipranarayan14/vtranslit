import { manageSchemes } from './scheme/manage-schemes';
import { multiTranslit } from './multi-translit';
import { prepareOptions } from './prepare-options';
import { singleTranslit } from './single-translit';

const init = (getScheme, listSchemes) =>

  (fromSchemeCode, toSchemeCode, userOptions) => {

    if (fromSchemeCode === toSchemeCode) {

      return inStr => inStr;

    }

    const options = prepareOptions(userOptions);

    if (toSchemeCode === 'Multi') {

      return inStr => multiTranslit(
        fromSchemeCode,
        listSchemes,
        getScheme,
        options
      )(inStr);

    }

    return inStr => singleTranslit(
      fromSchemeCode,
      toSchemeCode,
      getScheme,
      options
    )(inStr);

  };

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
