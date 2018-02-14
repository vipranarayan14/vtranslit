import { makeFromSchemeTree, makeToSchemeTree } from './scheme-tree-maker';
import { analyzeTokens } from './tokens-analyzer';
import { devanagariScheme } from './vtranslit-schemes/vtranslit-dev-scheme';
import { itransScheme } from './vtranslit-schemes/vtranslit-itrans-scheme';
import { tokenize } from './tokenizer';
import { translitTokens } from './translit-tokens';

export const vtranslit = str => {

  const state = {

    aksharaIndex: 0,
    maxTokenLength: 0,
    tokenLengths: []

  };

  const fromSchemeTree = makeFromSchemeTree(itransScheme, state);

  const toSchemeTree = makeToSchemeTree(devanagariScheme, state);

  const Tokens = tokenize(str, fromSchemeTree, state);

  const tokens = analyzeTokens(Tokens, fromSchemeTree);

  const outStr = translitTokens(tokens, fromSchemeTree, toSchemeTree);

  return outStr.join('');

};
