/* eslint-disable complexity */

const canTranslitForOpenMarker = toggleMode => {

  if (toggleMode === 1) {

    return false;

  } else if (toggleMode === 2) {

    return true;

  }

  return true;

};

const canTranslitForCloseMarker = toggleMode => {

  if (toggleMode === 1) {

    return true;

  } else if (toggleMode === 2) {

    return false;

  }

  return true;

};

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

      canTranslit = canTranslitForOpenMarker(options.toggleMode);

    } else if (tokenType === 'marker-close-toggle-mode') {

      canTranslit = canTranslitForCloseMarker(options.toggleMode);

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
