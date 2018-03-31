// returns a branch for fromSchemeTree.
const makeFromSchemeTreeBranch = (scheme, schemeSubset, state) => {

  const schemeTreeBranch = {};

  scheme[schemeSubset].forEach((akshara, aksharaIndex) => {

    akshara.forEach((alternateAkshara, alternateIndex) => {

      schemeTreeBranch[alternateAkshara] = {

        aksharaIndex: `${schemeSubset}#${aksharaIndex}`,
        alternateIndex,
        char: alternateAkshara,
        type: schemeSubset

      };

      state.tokenLengths.push(alternateAkshara.length);

    });

  });

  return schemeTreeBranch;

};

// Returns a branch for toSchemeTree.
const makeToSchemeTreeBranch = (scheme, schemeSubset, addSchemeSubset = '') => {

  const schemeTreeBranch = {};

  scheme[schemeSubset].forEach((akshara, aksharaIndex) => {

    akshara.every((alternateAkshara, alternateIndex) => {

      const charDetails = {
        alternateIndex,
        char: {},
        type: schemeSubset
      };

      if (addSchemeSubset) {

        charDetails.char[addSchemeSubset] = scheme[addSchemeSubset]
          [aksharaIndex]
          [alternateIndex];

      }

      charDetails.char[schemeSubset] = alternateAkshara;

      schemeTreeBranch[`${schemeSubset}#${aksharaIndex}`] = charDetails;

      return false;

    });

  });

  return schemeTreeBranch;

};

//Returns a scheme tree nade with given 'fromScheme'.
export const makeFromSchemeTree = (fromScheme, state) => {

  let fromSchemeTree = {};

  [
    'deadConsonants',
    'consonants',
    'vowels',
    'vowelMarks',
    'symbols'
  ].forEach(schemeItem => {

    fromSchemeTree = Object.assign({},
      fromSchemeTree,
      makeFromSchemeTreeBranch(fromScheme, schemeItem, state)
    );

  });

  state.maxTokenLength = Math.max(...state.tokenLengths);

  return fromSchemeTree;

};

//Returns a scheme tree nade with given 'toScheme'.
export const makeToSchemeTree = toScheme => {

  let toSchemeTree = {};

  toSchemeTree = Object.assign({},
    toSchemeTree,
    makeToSchemeTreeBranch(toScheme, 'deadConsonants', 'consonants'),
    makeToSchemeTreeBranch(toScheme, 'consonants', 'deadConsonants'),
    makeToSchemeTreeBranch(toScheme, 'vowels', 'vowelMarks'),
    makeToSchemeTreeBranch(toScheme, 'vowelMarks', 'vowels'),
    makeToSchemeTreeBranch(toScheme, 'symbols')
  );

  return toSchemeTree;

};
