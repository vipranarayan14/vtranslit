import { multiTranslit } from './multi-translit';
import { prepareOptions } from './prepare-options';
import { singleTranslit } from './single-translit';

export const init = (getScheme, listSchemes) =>

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
