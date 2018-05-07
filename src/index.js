import { makeFromSchemeTree, makeToSchemeTree } from './make-scheme-tree';
import { getCharDetails } from './get-char-details';
import { manageSchemes } from './scheme/manage-schemes';
import { prepareOptions } from './prepare-options';
import { processTokens } from './process-tokens';
import { translitTokens } from './translit-tokens';
import { vTokenize } from 'vtokenize';

const init = getScheme => (fromSchemeCode, toSchemeCode, userOptions) => {

  if (fromSchemeCode === toSchemeCode) {

    return inStr => inStr;

  }

  const options = prepareOptions(userOptions);

  const fromScheme = getScheme(fromSchemeCode);
  const toScheme = getScheme(toSchemeCode);

  const {
    fromSchemeTree,
    maxTokenLength
  } = makeFromSchemeTree(fromScheme);

  const toSchemeTree = makeToSchemeTree(toScheme);

  return inStr => {

    const tokens = vTokenize(
      inStr,
      maxTokenLength,
      getCharDetails(fromSchemeTree, options)
    );

    const {
      processedTokens,
      tokensType
    } = processTokens(tokens, fromSchemeTree, toScheme);

    const outStr = translitTokens(
      processedTokens,
      tokensType,
      toSchemeTree,
      options
    );

    return outStr.join('');

  };

};

export const vTranslit = (schemes = []) => {

  if (!schemes.length) {

    throw new Error('Function vTranslit requires vtranslit schemes in an array format.');

  }

  const schemesManager = manageSchemes(schemes);

  return {

    find: schemesManager.find,
    init: init(schemesManager.get),
    list: schemesManager.list

  };

};
