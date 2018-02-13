import { getCharDetails } from './char-details-provider';

/* eslint-disable complexity */

export const translitTokens = (tokens, fromSchemeTree, toSchemeTree) => {

  const outStr = [];
  const vowelConditions = ['strStart', 'avasAna', 'vowelMarks', 'vowels'];

  tokens.forEach((token, index) => {

    const prevToken = (index > 0) ? tokens[index - 1] : { type: 'strStart' };

    if (
      token.type === 'vowelMarks' &&
      vowelConditions.indexOf(prevToken.type) > -1
    ) {

      token = getCharDetails(`*${token.char}`, fromSchemeTree);

    }

    if (token.type === 'undefined') {

      outStr.push('');

    } else if (token.type === 'avasAna') {

      outStr.push(token.char);

    } else {

      outStr.push(toSchemeTree[token.aksharaIndex].char.join());

    }

  });

  return outStr;

};
