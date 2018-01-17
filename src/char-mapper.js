const mapConsonants = (charMap, fromScheme, toScheme) => {

  fromScheme.consonants.forEach((consonant, letterIndex) => {

    fromScheme.vowelMarks.forEach((mark, markIndex) => {

      mark.forEach(alternateMark => {

        consonant.forEach(alternateConsonant => {

          charMap[`${alternateConsonant}${alternateMark}`] =
            `${toScheme.consonants[letterIndex]}${toScheme.vowelMarks[markIndex][0]}`;

        });

      });

    });

  });

};

const mapSymbols = (charMap, fromScheme, toScheme) => {

  fromScheme.symbols.forEach((symbol, index) => {

    symbol.forEach(alternateSymbol => charMap[alternateSymbol] = toScheme.symbols[index][0]);

  });

};

const mapVowels = (charMap, fromScheme, toScheme) => {

  fromScheme.vowels.forEach((vowel, index) => {

    vowel.forEach(alternateVowel => charMap[alternateVowel] = toScheme.vowels[index][0]);

  });

};

export const mapChars = (fromScheme, toScheme) => {

  const charMap = {};

  mapVowels(charMap, fromScheme, toScheme);

  mapConsonants(charMap, fromScheme, toScheme);

  mapSymbols(charMap, fromScheme, toScheme);

  charMap[' '] = ' ';

  return charMap;

};
