import { findScheme, getAvailableSchemes, getScheme } from 'vtranslit-schemes';
import { makeFromSchemeTree, makeToSchemeTree } from './make-scheme-tree';
import { getCharDetails } from './get-char-details';
import { processTokens } from './process-tokens';
import { translitTokens } from './translit-tokens';
import { vTokenize } from 'vtokenize';

const init = (fromSchemeCode, toSchemeCode) => {

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
      getCharDetails(fromSchemeTree)
    );

    const {
      processedTokens,
      tokensType
    } = processTokens(tokens, fromSchemeTree, toScheme);

    const outStr = translitTokens(
      processedTokens,
      tokensType,
      toSchemeTree
    );

    return outStr.join('');

  };

};

export const vTranslit = {
  findScheme,
  getAvailableSchemes,
  init
};
