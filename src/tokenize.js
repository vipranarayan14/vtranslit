import { getCharDetails } from './provide-char-details';

/* eslint-disable complexity */
export const tokenize = (str, fromSchemeTree, state) => {

  const inStr = str.slice(0, str.length);
  const maxSeek = state.maxTokenLength;

  const tokens = [];

  let seeked = 0,
    strSlice = '',
    tempCharDetails = [],
    tokenFound = [];

  for (let i = 0, l = inStr.length; i < l; i += 1) {

    seeked += 1;

    strSlice += inStr[i];
    const charDetails = getCharDetails(strSlice, fromSchemeTree);

    tempCharDetails.push(charDetails);

    if (charDetails.type !== 'unknown') {

      tokenFound.push(true);

    } else {

      tokenFound.push(false);

    }

    if (seeked === maxSeek || i === inStr.length - 1) {

      let foundIndex = tokenFound.lastIndexOf(true);

      if (foundIndex > -1) {

        tokens.push(tempCharDetails[foundIndex]);

      } else {

        foundIndex = 0;

        tokens.push(tempCharDetails[0]);

      }

      // resetting the 'i' to pick the next untokenized char.
      i -= (seeked - 1) - foundIndex;

      // reset variables
      seeked = 0;
      strSlice = '';
      tempCharDetails = [];
      tokenFound = [];

    }

  }

  return tokens;

};
