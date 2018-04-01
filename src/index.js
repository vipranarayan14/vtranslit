import { makeFromSchemeTree, makeToSchemeTree } from './make-scheme-tree';
import { getScheme } from './get-scheme';
import { processTokens } from './process-tokens';
import { tokenize } from './tokenize';
import { translitTokens } from './translit-tokens';

export const vTranslit = (fromSchemeCode, toSchemeCode) => {

  };

  const fromScheme = getScheme(fromSchemeCode);
  const toScheme = getScheme(toSchemeCode);

  const fromSchemeTree = makeFromSchemeTree(fromScheme, state);
  const toSchemeTree = makeToSchemeTree(toScheme, state);

  return inStr => {

    const tokens = tokenize(inStr, fromSchemeTree, state);

    const { processedTokens, tokensType } = processTokens(tokens, fromSchemeTree, toScheme);

    const outStr = translitTokens(processedTokens, tokensType, toSchemeTree);

    return outStr.join('');

  };

};
