// returns a branch for fromSchemeTree.
const makeFromSchemeTreeBranch = (scheme, schemeSubset, state) => {

  const schemeTreeBranch = {};

  scheme[schemeSubset].forEach(akshara => {

    akshara.forEach((alternateAkshara, alternateIndex) => {

      schemeTreeBranch[alternateAkshara] = {

        aksharaIndex: state.aksharaIndex,
        alternateIndex,
        char: alternateAkshara,
        type: schemeSubset

      };

      state.tokenLengths.push(alternateAkshara.length);

    });

    state.aksharaIndex += 1;

  });

  return schemeTreeBranch;

};

// Returns a branch for toSchemeTree.
const makeToSchemeTreeBranch = (scheme, schemeSubset, state) => {

  const schemeTreeBranch = {};

  scheme[schemeSubset].forEach(akshara => {

    akshara.forEach((alternateAkshara, alternateIndex) => {

      schemeTreeBranch[state.aksharaIndex] = {

        alternateIndex,
        char: alternateAkshara,
        type: schemeSubset

      };

    });

    state.aksharaIndex += 1;

  });

  return schemeTreeBranch;

};

//Returns a scheme tree nade with given 'fromScheme'.
export const makeFromSchemeTree = (fromScheme, state) => {

  const fromSchemeTree = Object.assign({},

    makeFromSchemeTreeBranch(fromScheme, 'consonants', state),

    makeFromSchemeTreeBranch(fromScheme, 'vowels', state),

    makeFromSchemeTreeBranch(fromScheme, 'symbols', state),

    makeFromSchemeTreeBranch(fromScheme, 'vowelMarks', state)

  );

  state.aksharaIndex = 0;
  state.maxTokenLength = Math.max(...state.tokenLengths);

  return fromSchemeTree;

};

//Returns a scheme tree nade with given 'toScheme'.
export const makeToSchemeTree = (toScheme, state) => {

  const toSchemeTree = Object.assign({},

    makeToSchemeTreeBranch(toScheme, 'consonants', state),

    makeToSchemeTreeBranch(toScheme, 'vowels', state),

    makeToSchemeTreeBranch(toScheme, 'symbols', state),

    makeToSchemeTreeBranch(toScheme, 'vowelMarks', state)

  );

  state.aksharaIndex = 0;

  return toSchemeTree;

};
