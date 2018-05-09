import { multiTranslit } from './multi-translit';
import { prepareOptions } from './prepare-options';
import { singleTranslit } from './single-translit';

const checkFromSchemeCode = fromSchemeCode => {

  if (fromSchemeCode !== 'Itrn') {

    throw new Error('Multi scheme translit requires from scheme to be `Itrn`.');

  }

};

export const init = (getScheme, listSchemes) =>

  (fromSchemeCode, toSchemeCode, userOptions) => inStr => {

    if (fromSchemeCode === toSchemeCode) {

      return inStr;

    }

    const options = prepareOptions(userOptions);

    if (toSchemeCode === 'Multi') {

      checkFromSchemeCode(fromSchemeCode);

      return multiTranslit(
        fromSchemeCode,
        listSchemes,
        getScheme,
        options
      )(inStr);

    }

    return singleTranslit(
      fromSchemeCode,
      toSchemeCode,
      getScheme,
      options
    )(inStr);

  };
