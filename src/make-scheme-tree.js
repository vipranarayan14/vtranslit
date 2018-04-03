const getAkshara = akshara => (Array.isArray(akshara)) ? akshara[0] : akshara;

const makeFromSchemeLeaf = (akshara, aksharaIndex, alternateIndex, schemeBranch, schemeSubset, tokenLengths) => {

  if (akshara) {

    schemeBranch[akshara] = {

      aksharaIndex: `${schemeSubset}#${aksharaIndex}`,
      alternateIndex,
      char: akshara,
      type: schemeSubset

    };

    tokenLengths.push(akshara.length);

  }

};

const makeToSchemeLeaf = (akshara, aksharaIndex, scheme, schemeBranch, schemeSubset, addSchemeSubset) => {

  const charDetails = {
    char: {},
    type: schemeSubset
  };

  if (addSchemeSubset) {

    const addAkshara = scheme.data[addSchemeSubset][aksharaIndex];

    charDetails.char[addSchemeSubset] = getAkshara(addAkshara);

  }

  charDetails.char[schemeSubset] = getAkshara(akshara);

  schemeBranch[`${schemeSubset}#${aksharaIndex}`] = charDetails;

};

// returns a branch for fromSchemeTree.
const makeFromSchemeBranch = (scheme, schemeSubset, tokenLengths) => {

  const schemeBranch = {};

  if (scheme.about.type === 'roman' && schemeSubset === 'consonants') {

    return schemeBranch;

  };

  scheme.data[schemeSubset].forEach((akshara, aksharaIndex) => {

    if (!Array.isArray(akshara)) {

      makeFromSchemeLeaf(
        akshara,
        aksharaIndex,
        0,
        schemeBranch,
        schemeSubset,
        tokenLengths
      );

      return;

    }

    akshara.forEach((alternateAkshara, alternateIndex) => {

      makeFromSchemeLeaf(
        alternateAkshara,
        aksharaIndex,
        alternateIndex,
        schemeBranch,
        schemeSubset,
        tokenLengths
      );

    });

  });

  return schemeBranch;

};

// Returns a branch for toSchemeTree.
const makeToSchemeBranch = (scheme, schemeSubset, addSchemeSubset = '') => {

  const schemeBranch = {};

  scheme.data[schemeSubset].forEach((akshara, aksharaIndex) => {

    makeToSchemeLeaf(akshara, aksharaIndex, scheme, schemeBranch, schemeSubset, addSchemeSubset);

  });

  return schemeBranch;

};

//Returns a scheme tree nade with given 'fromScheme'.
export const makeFromSchemeTree = fromScheme => {

  const tokenLengths = [];

  let maxTokenLength = 0;

  const fromSchemeTree = Object.assign({},

    makeFromSchemeBranch(fromScheme, 'deadConsonants', tokenLengths),
    makeFromSchemeBranch(fromScheme, 'consonants', tokenLengths),
    makeFromSchemeBranch(fromScheme, 'vowels', tokenLengths),
    makeFromSchemeBranch(fromScheme, 'vowelMarks', tokenLengths),
    makeFromSchemeBranch(fromScheme, 'symbols', tokenLengths)

  );

  maxTokenLength = Math.max(...tokenLengths);

  return { fromSchemeTree, maxTokenLength };

};

//Returns a scheme tree nade with given 'toScheme'.
export const makeToSchemeTree = toScheme => {

  let toSchemeTree = {};

  toSchemeTree = Object.assign({},
    toSchemeTree,
    makeToSchemeBranch(toScheme, 'deadConsonants', 'consonants'),
    makeToSchemeBranch(toScheme, 'consonants', 'deadConsonants'),
    makeToSchemeBranch(toScheme, 'vowels', 'vowelMarks'),
    makeToSchemeBranch(toScheme, 'vowelMarks', 'vowels'),
    makeToSchemeBranch(toScheme, 'symbols')
  );

  return toSchemeTree;

};
