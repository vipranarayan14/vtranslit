const reservedChars = char =>

  ({

    ' ': {
      char,
      type: 'pause'
    },

    '#{': {
      char,
      type: 'marker-open-toggle-mode',
    },

    '_': {
      char,
      type: 'skip'
    },

    '}#': {
      char,
      type: 'marker-close-toggle-mode',
    }

  }[char]);

export const getCharDetails = fromSchemeTree => char => {

  const charDetailsInReservedTokens = reservedChars(char);
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
