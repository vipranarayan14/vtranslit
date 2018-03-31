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

    akshara.every((alternateAkshara, alternateIndex) => {

      schemeTreeBranch[state.aksharaIndex] = {

        alternateIndex,
        char: alternateAkshara,
        type: schemeSubset

      };

      // disables alternate chars when transliterating to a 'roman' scheme.
      if (scheme.about.type === 'roman') {

        return false;

      }

      return true;

    });

    state.aksharaIndex += 1;

  });

  return schemeTreeBranch;

};

const makeDeadConsonants = scheme => {

  const deadConsonants = [];

  scheme.consonants.forEach(akshara => {

    const deadConsonant = [];

    akshara.forEach(alternateAkshara => {

      if (alternateAkshara) {

        deadConsonant.push(alternateAkshara + scheme.virama[0][0]);

      } else {

        deadConsonant.push(alternateAkshara);

      }

    });

    deadConsonants.push(deadConsonant);

  });

  scheme.deadConsonants = deadConsonants;

  return scheme;

};

//Returns a scheme tree nade with given 'fromScheme'.
export const makeFromSchemeTree = (fromScheme, state) => {

  const scheme = makeDeadConsonants(fromScheme);

  const fromSchemeTree = Object.assign({},

    makeFromSchemeTreeBranch(scheme, 'consonants', state),

    makeFromSchemeTreeBranch(scheme, 'vowelMarks', state),

    makeFromSchemeTreeBranch(scheme, 'vowels', state),

    makeFromSchemeTreeBranch(scheme, 'symbols', state),

    makeFromSchemeTreeBranch(scheme, 'deadConsonants', state)

  );

  state.aksharaIndex = 0;
  state.maxTokenLength = Math.max(...state.tokenLengths);

  return fromSchemeTree;

};

//Returns a scheme tree nade with given 'toScheme'.
export const makeToSchemeTree = (toScheme, state) => {

  const scheme = makeDeadConsonants(toScheme);

  const toSchemeTree = Object.assign({},

    makeToSchemeTreeBranch(scheme, 'consonants', state),

    makeToSchemeTreeBranch(scheme, 'vowelMarks', state),

    makeToSchemeTreeBranch(scheme, 'vowels', state),

    makeToSchemeTreeBranch(scheme, 'symbols', state),

    makeToSchemeTreeBranch(scheme, 'virama', state)

  );

  state.aksharaIndex = 0;

  return toSchemeTree;

};
