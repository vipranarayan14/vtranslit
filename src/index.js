import { makeFromSchemeTree, makeToSchemeTree } from './scheme-tree-maker';
import { analyzeTokens } from './tokens-analyzer';
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

    const Tokens = tokenize(inStr, fromSchemeTree, state);

    const tokens = analyzeTokens(Tokens, fromSchemeTree);

    const outStr = translitTokens(tokens, fromSchemeTree, toSchemeTree);

    return outStr.join('');

  };

};
