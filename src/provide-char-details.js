/* eslint-disable complexity */

export const getCharDetails = (char, fromSchemeTree) => {

  let charDetails = {};
  const charDetailsInFromSchemeTree = fromSchemeTree[char];

  if (char === ' ') {

    charDetails = {
      char,
      type: 'pause'
    };

  } else if (char === '_') {

    charDetails = {
      char,
      type: 'skip'
    };

  } else if (charDetailsInFromSchemeTree) {

    charDetails = charDetailsInFromSchemeTree;

  } else {

    charDetails = {
      char,
      type: 'unknown'
    };

  }

  return charDetails;

};
