import { charMap } from './char-mapper';
import { getChar } from './char';

const maxTokenLength = 3;

export const vtranslit = string => {

  let outputString = '';

  string = `${ string }`;

  for (let i = 0, length = string.length; i < length; i += 1) {

    const token = string.substr(i, maxTokenLength);

    const {
      char,
      processedLength
    } = getChar(token, charMap);

    const processedIndex = processedLength === 0 ? processedLength : processedLength - 1;

    outputString += char;

    i += processedIndex;

  }

  return outputString;

};
