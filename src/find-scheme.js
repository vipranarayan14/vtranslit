import { maxOcurrance } from './utils';
import { schemes } from './schemes';

const findSchemeForChar = char =>

  schemes.find(scheme => {

    const unicodeBlock = scheme.about.unicodeBlock;

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

    const schemeForChar = findSchemeForChar(char);

    if (schemeForChar) {

      schemeForChars.push(schemeForChar.about.code);

    }

  });

  return maxOcurrance(schemeForChars);

};
