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

const findInReservedTokens = (char, reservedChars) => {

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

const initReservedTokens = options =>

  (options.translitMode > 0) ? (

    Object.assign({},

      reservedCharsList,

      markers

    )

  ) : (

    reservedCharsList

  );

export const getTokenDetails = (fromSchemeTree, options) => token => {

  const reservedTokens = initReservedTokens(options);

  const tokenInReservedTokens = findInReservedTokens(token, reservedTokens);
  const tokenInFromSchemeTree = fromSchemeTree[token];

  const unknownTokenDetails = {
    char: token,
    type: 'unknown'
  };

  if (tokenInReservedTokens) {

    return tokenInReservedTokens;

  } else if (tokenInFromSchemeTree) {

    return tokenInFromSchemeTree;

  }

  return unknownTokenDetails;

};
