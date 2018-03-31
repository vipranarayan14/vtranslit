/* eslint-disable complexity */

export const translitTokens = (tokens, tokensType, toSchemeTree) => {

  const outStr = [];

  tokens.forEach((token, index) => {

    const tokenType = tokensType[index];

    if (tokenType === 'unknown') {

      outStr.push(token.char);

    } else if (tokenType === 'pause') {

      outStr.push(token.char);

    } else if (tokenType === 'skip') {

      outStr.push('');

    } else {

      outStr.push(toSchemeTree[token.aksharaIndex].char[tokenType]);

    }

  });

  return outStr;

};
