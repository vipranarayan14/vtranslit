import { getCharDetails } from './char-details-provider';

/* eslint-disable complexity */
export const tokenize = (str, fromSchemeTree, state) => {

  const inStr = str.slice(0, str.length);
  const tokens = [];

  for (let i = 0, l = inStr.length; i < l; i += 1) {

    const maxSeek = state.maxTokenLength;

    let char = inStr[i],
      charDetails = getCharDetails(char, fromSchemeTree),
      newCharDetails = charDetails,
      seeked = 0;

    if (charDetails) {

      // TODO: seek even if newCharDetails not found for supporting 'AUM'.

      while (newCharDetails && seeked < maxSeek) {

        charDetails = newCharDetails;

        i += 1;

        char += inStr[i];

        newCharDetails = getCharDetails(char, fromSchemeTree);

        seeked += 1;

      }

      i = i - 1;

      seeked = 0;

    } else if (!charDetails) {

      while (!newCharDetails && seeked < 3) {

        i += 1;

        char += inStr[i];

        newCharDetails = getCharDetails(char, fromSchemeTree);

        charDetails = newCharDetails;

        seeked += 1;

      }

      if (!charDetails) {

        i -= seeked;

        charDetails = {

          char: inStr[i],
          type: 'undefined'

        };

      }

    }

    // llog(`token: "${charDetails.char}"`);

    tokens.push(charDetails);

  }

  return tokens;

};
