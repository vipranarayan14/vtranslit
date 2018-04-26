import { maxOcurrance } from './utils';

const findSchemeForChar = schemes => char =>

  schemes.find(scheme => {

    const unicodeBlock = scheme.about.unicodeBlock;

    const [lowerLimit, upperLimit] = unicodeBlock
      .split('-')
      .map(limit => parseInt(limit, 16));

    const charCode = char.charCodeAt(0);

    return charCode >= lowerLimit && charCode <= upperLimit;

  });

export const findScheme = schemes => str => {

  const maxSampleSize = 10;
  const sampleStr = str.slice(0, maxSampleSize);

  const schemeForChars = [];

  sampleStr.split('').forEach(char => {

    const schemeForChar = findSchemeForChar(schemes)(char);

    if (schemeForChar) {

      schemeForChars.push(schemeForChar.about.code);

    }

  });

  return maxOcurrance(schemeForChars);

};
