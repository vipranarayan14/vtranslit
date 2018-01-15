const getMatchingChar = (tokenSlice, charMap) => charMap[tokenSlice] ? charMap[tokenSlice] : '';

const isCharFoundOrTokenSliceEmpty = (char, tokenSlice) => char || tokenSlice === '';

export const getChar = (token, charMap) => {

  let tokenSlice = token.slice(0, token.length),
    processedLength = tokenSlice.length,
    char = '';

  for (let i = 0, length = token.length; i < length; i += 1) {

    char = getMatchingChar(tokenSlice, charMap);

    if (isCharFoundOrTokenSliceEmpty(char, tokenSlice)) {

      break;

    }

    tokenSlice = tokenSlice.slice(0, -1);
    processedLength = tokenSlice.length;

  }

  return {
    char,
    processedLength,
    tokenSlice
  };

};
