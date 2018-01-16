export const mapChars = (fromScheme, toScheme) => {

  const charMap = {};

  mapVowels(charMap, fromScheme, toScheme);

  mapConsonants(charMap, fromScheme, toScheme);

  mapSymbols(charMap, fromScheme, toScheme);

  mapAlternates(charMap, fromScheme);

  charMap[' '] = ' ';

  return charMap;

};

const mapSymbols = (charMap, fromScheme, toScheme) => {

  fromScheme.symbols.forEach((symbol, index) => {

    charMap[symbol] = toScheme.symbols[index];

  });

};

const mapConsonants = (charMap, fromScheme, toScheme) => {

  fromScheme.consonants.forEach((consonant, letterIndex) => {

    fromScheme.vowelMarks.forEach((mark, markIndex) => {

      charMap[`${consonant}${mark}`] = `${toScheme.consonants[letterIndex]}${toScheme.vowelMarks[markIndex]}`;

    });

  });

};

const mapVowels = (charMap, fromScheme, toScheme) => {

  fromScheme.vowels.forEach((vowel, index) => {

    charMap[vowel] = toScheme.vowels[index];

  });

};

const mapAlternates = (charMap, fromScheme) => {

  if (!fromScheme.alternates) {

    return;

  }

  Object.keys(fromScheme.alternates).map(alternate => {

    charMap[fromScheme.alternates[alternate]] = charMap[alternate];

  });

};
