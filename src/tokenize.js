const cannotSeek = (seeked, maxSeek, inStr, i) => seeked === maxSeek || i === inStr.length - 1;

const getTokenDetails = (tempCharDetails, foundIndex) =>

  (foundIndex > -1) ? {

    foundIndex,
    token: tempCharDetails[foundIndex]

  } : {

    foundIndex: 0,
    token: tempCharDetails[0]

  };

const isTokenFound = charDetails => (charDetails.type !== 'unknown') ? true : false;

export const tokenize = (str, maxTokenLength, getCharDetails) => {

  const inStr = str.slice(0, str.length);
  const maxSeek = maxTokenLength;

  const tokens = [];

  let seeked = 0,
    strSlice = '',
    tempCharDetails = [],
    tokenFound = [];

  for (let i = 0, l = inStr.length; i < l; i += 1) {

    seeked += 1;

    strSlice += inStr[i];

    const charDetails = getCharDetails(strSlice);

    tempCharDetails.push(charDetails);

    tokenFound.push(isTokenFound(charDetails));

    if (cannotSeek(seeked, maxSeek, inStr, i)) {

      let foundIndex = tokenFound.lastIndexOf(true);

      const tokenDetails = getTokenDetails(tempCharDetails, foundIndex);

      foundIndex = tokenDetails.foundIndex;

      tokens.push(tokenDetails.token);

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
