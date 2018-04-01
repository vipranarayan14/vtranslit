// returns a branch for fromSchemeTree.
const makeFromSchemeTreeBranch = (scheme, schemeSubset, tokenLengths) => {

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

        tokenLengths.push(alternateAkshara.length);

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

const makeFromSchemeTreeBranchForConsonants = (fromScheme, tokenLengths) => {

  if (fromScheme.about.type !== 'roman') {

    return makeFromSchemeTreeBranch(fromScheme, 'consonants', tokenLengths);

  }

  return {};

};

//Returns a scheme tree nade with given 'fromScheme'.
export const makeFromSchemeTree = fromScheme => {

  const tokenLengths = [];

  let maxTokenLength = 0;

  const fromSchemeTree = Object.assign({},

    makeFromSchemeTreeBranch(fromScheme, 'deadConsonants', tokenLengths),
    makeFromSchemeTreeBranchForConsonants(fromScheme, tokenLengths),
    makeFromSchemeTreeBranch(fromScheme, 'vowels', tokenLengths),
    makeFromSchemeTreeBranch(fromScheme, 'vowelMarks', tokenLengths),
    makeFromSchemeTreeBranch(fromScheme, 'symbols', tokenLengths)

  );

  maxTokenLength = Math.max(tokenLengths);

  return { fromSchemeTree, maxTokenLength };

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
