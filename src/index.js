const charMap = {
  '^Na': 'ङ',
  '~Na': 'ञ',
  'A': 'आ',
  'Na': 'ण',
  'a': 'अ',
  'aa': 'आ',
  'na': 'न',
  'sha': 'श',
  'RRi': 'ऋ',
  'RRI': 'ॠ',
  'LLi': 'ऌ',
  'LLI': 'ॡ',
  ' ': ' '
};

const maxTokenLength = 3;

export const translit = window.translit = string => {

  let outputString = '';

  string = `${ string }`;

  for (let i = 0, length = string.length; i < length; i += 1) {

    const token = string.substr(i, maxTokenLength);

    const {
      char,
      processedLength
    } = getChar(token);

    const processedIndex = processedLength === 0 ? processedLength : processedLength - 1;

    outputString += char;

    i += processedIndex;

  }

  return outputString;

};

const getMatchingChar = tokenSlice => charMap[tokenSlice] ? charMap[tokenSlice] : '';

const isCharFoundOrTokenSliceEmpty = (char, tokenSlice) => char || tokenSlice === '';

const getChar = token => {

  let tokenSlice = token.slice(0, token.length),
    processedLength = tokenSlice.length,
    char = '';

  for (let i = 0, length = token.length; i < length; i += 1) {

    char = getMatchingChar(tokenSlice);

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
