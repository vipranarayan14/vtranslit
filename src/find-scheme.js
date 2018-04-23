import { maxOcurrance } from './utils';

const unicodeBlocks = {

  'Deva': '0900-097F',
  'Itrn': '0020-007F',
  'Knda': '0C80-0CFF',
  'Taml': '0B80-0BFF',
  'Telu': '0C00-0C7F'

};

const findSchemeForChar = char =>

  Object.keys(unicodeBlocks).find(scheme => {

    const unicodeBlock = unicodeBlocks[scheme];

    const [lowerLimit, upperLimit] = unicodeBlock
      .split('-')
      .map(limit => parseInt(limit, 16));

    const charCode = char.charCodeAt(0);

    return charCode >= lowerLimit && charCode <= upperLimit;

  });

export const findScheme = str => {

  const maxSampleSize = 10;
  const sampleStr = str.slice(0, maxSampleSize);

  const schemeForChars = [];

  sampleStr.split('').forEach(char => {

    schemeForChars.push(findSchemeForChar(char));

  });

  return maxOcurrance(schemeForChars);

};
