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

const sampleString = '  ss a A ~Na^Nana shaNa';

const translit = string => {

  let outputString = '';

  string = `${ string }`;

  for (let i = 0, length = string.length; i < length; i += 1) {

    const token = string.substr(i, maxTokenLength);

    const {
      char,
      processedLength
    } = getChar(token);

    let processedIndex = 0;

    processedIndex = processedLength === 0 ? processedLength : processedLength - 1;

    outputString += char;

    i += processedIndex;

  }

  return outputString;

};

const getMatchingChar = tokenSlice => charMap[tokenSlice] ? charMap[tokenSlice] : '';

const isCharFoundOrTokenSliceEmpty = (char, tokenSlice) => char || tokenSlice === '';

function getChar(token) {

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

}

/* eslint-disable no-console */
console.log(
  '\n******************',
  `\n sampleString: "${ sampleString }"`,
  '\n******************'
);

console.log(
  '\n******************',
  `\n Output: "${ translit(sampleString) }"`,
  '\n******************'
);
/* eslint-enable no-console */
