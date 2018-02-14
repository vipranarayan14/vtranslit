import { makeFromSchemeTree, makeToSchemeTree } from './scheme-tree-maker';
import { processTokens } from './process-tokens';
import { tokenize } from './tokenizer';
import { translitTokens } from './translit-tokens';

export const vtranslit = (fromScheme, toScheme) => {

  const state = {

    aksharaIndex: 0,
    maxTokenLength: 0,
    tokenLengths: []

  };

  const fromSchemeTree = makeFromSchemeTree(fromScheme, state);

  const toSchemeTree = makeToSchemeTree(toScheme, state);

  return inStr => {

    const tokens = tokenize(inStr, fromSchemeTree, state);

    const processedTokens = processTokens(tokens, fromSchemeTree);

    const outStr = translitTokens(processedTokens, fromSchemeTree, toSchemeTree);

    return outStr.join('');

  };

};
