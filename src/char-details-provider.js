export const getCharDetails = (char, fromSchemeTree) => {

  let charDetails = {};

  if (char === ' ' || char === '_') {

    charDetails = {
      char,
      type: 'avasAna'
    };

  } else {

    charDetails = fromSchemeTree[char];

  }

  return charDetails;

};
