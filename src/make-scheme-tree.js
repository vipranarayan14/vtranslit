// returns a branch for fromSchemeTree.
const makeFromSchemeTreeBranch = (scheme, schemeSubset, state) => {

  const schemeTreeBranch = {};

  scheme[schemeSubset].forEach((akshara, aksharaIndex) => {

    akshara.forEach((alternateAkshara, alternateIndex) => {

      if (alternateAkshara) {

        schemeTreeBranch[alternateAkshara] = {

          aksharaIndex: `${schemeSubset}#${aksharaIndex}`,
          alternateIndex,
          char: alternateAkshara,
          type: schemeSubset

        };

        state.tokenLengths.push(alternateAkshara.length);

      }

    });

  });

  return schemeTreeBranch;

};

// Returns a branch for toSchemeTree.
const makeToSchemeTreeBranch = (scheme, schemeSubset, addSchemeSubset = '') => {

  const schemeTreeBranch = {};

  scheme[schemeSubset].forEach((akshara, aksharaIndex) => {

    const charDetails = {
      char: {},
      type: schemeSubset
    };

    if (addSchemeSubset) {

      charDetails.char[addSchemeSubset] = scheme[addSchemeSubset][aksharaIndex][0];

    }

    charDetails.char[schemeSubset] = akshara[0];

    schemeTreeBranch[`${schemeSubset}#${aksharaIndex}`] = charDetails;

  });

  return schemeTreeBranch;

};

const makeFromSchemeTreeBranchForConsonants = (fromScheme, state) =>

  (fromScheme.about.type === 'roman') ? {} : makeFromSchemeTreeBranch(fromScheme, 'consonants', state);

//Returns a scheme tree nade with given 'fromScheme'.
export const makeFromSchemeTree = (fromScheme, state) => {

  const fromSchemeTree = Object.assign({},

    makeFromSchemeTreeBranch(fromScheme, 'deadConsonants', state),
    makeFromSchemeTreeBranchForConsonants(fromScheme, state),
    makeFromSchemeTreeBranch(fromScheme, 'vowels', state),
    makeFromSchemeTreeBranch(fromScheme, 'vowelMarks', state),
    makeFromSchemeTreeBranch(fromScheme, 'symbols', state)

  );

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
