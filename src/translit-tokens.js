import { getCharDetails } from './provide-char-details';

/* eslint-disable complexity */

export const translitTokens = (tokens, fromSchemeTree, toSchemeTree, toScheme) => {

  const outStr = [];

  tokens.forEach((token, index) => {

    const prevToken = (index > 0) ? tokens[index - 1] : { type: 'strStart' };

    if (
      toScheme.about.type === 'brahmic' &&
      token.type === 'vowelMarks' &&
      prevToken.type !== 'consonants'
    ) {

      token = getCharDetails(`*${token.char}`, fromSchemeTree);

    }

    if (token.type === 'unknown') {

      outStr.push(token.char);

    } else if (token.type === 'pause') {

      outStr.push(token.char);

    } else if (token.type === 'skip') {

      outStr.push('');

    } else {

      outStr.push(toSchemeTree[token.aksharaIndex].char);

    }

  });

  return outStr;

};
