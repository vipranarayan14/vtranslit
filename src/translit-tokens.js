/* eslint-disable complexity */

export const translitTokens = (tokens, tokensType, toSchemeTree, options) => {

  const outStr = [];

  let canTranslit = true;

  if (options.toggleMode === 2) {

    canTranslit = false;

  }

  tokens.forEach((token, index) => {

    const tokenType = tokensType[index];

    if (tokenType === 'unknown' || tokenType === 'pause') {

      outStr.push(token.char);

    } else if (tokenType === 'skip') {

      outStr.push('');

    } else if (tokenType === 'marker-open-toggle-mode') {

      if (options.toggleMode === 1) {

        canTranslit = false;

      } else if (options.toggleMode === 2) {

        canTranslit = true;

      }

    } else if (tokenType === 'marker-close-toggle-mode') {

      if (options.toggleMode === 1) {

        canTranslit = true;

      } else if (options.toggleMode === 2) {

        canTranslit = false;

      }

    } else {

      if (canTranslit) {

        outStr.push(toSchemeTree[token.aksharaIndex].char[tokenType]);

      } else {

        outStr.push(token.char);

      }

    }

  });

  return outStr;

};
