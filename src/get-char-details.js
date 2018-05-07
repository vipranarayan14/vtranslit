const reservedCharsList = {

  ' ': {
    type: 'pause'
  },

  '_': {
    type: 'skip'
  }

};

const markers = {

  '#{': {
    type: 'marker-open-toggle-mode',
  },

  '}#': {
    type: 'marker-close-toggle-mode',
  }

};

const findInReservedChars = (char, reservedChars) => {

  const reservedChar = reservedChars[char];

  return (reservedChar) ? (

    Object.assign({},

      reservedChar,

      { char }
    )

  ) : (

    null

  );

};

const initReservedChars = options =>

  (options.translitMode > 0) ? (

    Object.assign({},

      reservedCharsList,

      markers

    )

  ) : (

    reservedCharsList

  );

export const getCharDetails = (fromSchemeTree, options) => char => {

  const reservedChars = initReservedChars(options);

  const charDetailsInReservedTokens = findInReservedChars(char, reservedChars);
  const charDetailsInFromSchemeTree = fromSchemeTree[char];

  const charDetailsForOtherChars = {
    char,
    type: 'unknown'
  };

  if (charDetailsInReservedTokens) {

    return charDetailsInReservedTokens;

  } else if (charDetailsInFromSchemeTree) {

    return charDetailsInFromSchemeTree;

  }

  return charDetailsForOtherChars;

};
