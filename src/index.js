import { devanagariScheme } from './vtranslit-schemes/vtranslit-dev-scheme';
import { getChar } from './char';
import { itransScheme } from './vtranslit-schemes/vtranslit-itrans-scheme';
import { mapChars } from './char-mapper';

const maxTokenLength = 5;

export const vtranslit = string => {

  let outputString = '';

  string = `${ string }`;

  for (let i = 0, length = string.length; i < length; i += 1) {

    const token = string.substr(i, maxTokenLength);

    const charMap = mapChars(itransScheme, devanagariScheme);

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
