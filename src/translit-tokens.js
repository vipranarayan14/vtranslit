/* eslint-disable complexity */

const canTranslitForOpenMarker = translitMode => {

  if (translitMode === 1) {

    return false;

  } else if (translitMode >= 2) {

    return true;

  }

  return true;

};

const canTranslitForCloseMarker = translitMode => {

  if (translitMode === 1) {

    return true;

  } else if (translitMode >= 2) {

    return false;

  }

  return true;

};

export const translitTokens = (tokens, tokensType, toSchemeTree, options) => {

  const outStr = [];

  let canTranslit = true,
    captureSchemeCode = false,
    capturedSchemeCode = '';

  if (options.translitMode >= 2) {

    canTranslit = false;

  }

  tokens.forEach((token, index) => {

    const tokenType = tokensType[index];

    if (tokenType === 'marker-open-translit-mode') {

      canTranslit = canTranslitForOpenMarker(options.translitMode);

    } else if (tokenType === 'marker-close-translit-mode') {

      canTranslit = canTranslitForCloseMarker(options.translitMode);

    } else if (tokenType === 'marker-translit-scheme') {

      if (canTranslit) {

        capturedSchemeCode = '';
        captureSchemeCode = true;

      } else {

        outStr.push(token.char);

      }

    } else if (tokenType === 'pause') {

      if (captureSchemeCode) {

        captureSchemeCode = false;

      } else {

        outStr.push(token.char);

      }

    } else if (tokenType === 'unknown') {

      if (canTranslit && options.translitMode === 3 && captureSchemeCode) {

        capturedSchemeCode += token.char;

      } else {

        outStr.push(token.char);

      }

    } else if (tokenType === 'skip') {

      outStr.push('');

    } else {

      if (canTranslit) {

        if (options.translitMode === 3) {

          if (captureSchemeCode) {

            capturedSchemeCode += token.char;

          } else {

            const $toSchemeTree = toSchemeTree[capturedSchemeCode];

            if ($toSchemeTree) {

              outStr.push(
                $toSchemeTree[token.aksharaIndex].char[tokenType]
              );

            } else {

              outStr.push(token.char);

            }

          }

        } else {

          outStr.push(toSchemeTree[token.aksharaIndex].char[tokenType]);

        }

      } else {

        outStr.push(token.char);

      }

    }

  });

  return outStr;

};
