import { devanagariScheme } from './vtranslit-schemes/vtranslit-dev-scheme';
import { getChar } from './char';
import { itransScheme } from './vtranslit-schemes/vtranslit-itrans-scheme';
import { mapChars } from './char-mapper';

const maxTokenLength = 6;

const vtranslit = charMap => string => {

  let outputString = '';

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

export const initVtranslit = (fromScheme = itransScheme, toScheme = devanagariScheme) => {

  const charMap = mapChars(fromScheme, toScheme);

  return vtranslit(charMap);

};
