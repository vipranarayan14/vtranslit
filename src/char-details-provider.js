/* eslint-disable complexity */

export const getCharDetails = (char, fromSchemeTree) => {

  let charDetails = {};
  const charDetailsInFromSchemeTree = fromSchemeTree[char];

  if (char === ' ' || char === '_') {

    charDetails = {
      char,
      type: 'pause'
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
