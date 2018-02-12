import { devanagariScheme } from './vtranslit-schemes/vtranslit-dev-scheme';
import { itransScheme } from './vtranslit-schemes/vtranslit-itrans-scheme';

// returns a branch for fromSchemeTree
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
        char: akshara,
        type: schemeSubset

      };

    });

    state.aksharaIndex += 1;

  });

  return schemeTreeBranch;

};

const makeFromSchemeTree = (fromScheme, state) => {

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

const makeToSchemeTree = (toScheme, state) => {

  const toSchemeTree = Object.assign({},

    makeToSchemeTreeBranch(toScheme, 'consonants', state),

    makeToSchemeTreeBranch(toScheme, 'vowels', state),

    makeToSchemeTreeBranch(toScheme, 'symbols', state),

    makeToSchemeTreeBranch(toScheme, 'vowelMarks', state)

  );

  state.aksharaIndex = 0;

  return toSchemeTree;

};

const getCharDetails = (char, fromSchemeTree) => {

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

/* eslint-disable complexity */
const tokenize = (str, fromSchemeTree, state) => {

  const inStr = str.slice(0, str.length);
  const tokens = [];

  for (let i = 0, l = inStr.length; i < l; i += 1) {

    const maxSeek = state.maxTokenLength;

    let char = inStr[i],
      charDetails = getCharDetails(char, fromSchemeTree),
      newCharDetails = charDetails,
      seeked = 0;

    if (charDetails) {

      // TODO: seek even if newCharDetails not found for supporting 'AUM'.

      while (newCharDetails && seeked < maxSeek) {

        charDetails = newCharDetails;

        i += 1;

        char += inStr[i];

        newCharDetails = getCharDetails(char, fromSchemeTree);

        seeked += 1;

      }

      i = i - 1;

      seeked = 0;

    } else if (!charDetails) {

      while (!newCharDetails && seeked < 3) {

        i += 1;

        char += inStr[i];

        newCharDetails = getCharDetails(char, fromSchemeTree);

        charDetails = newCharDetails;

        seeked += 1;

      }

      if (!charDetails) {

        i -= seeked;

        charDetails = {

          char: inStr[i],
          type: 'undefined'

        };

      }

    }

    // llog(`token: "${charDetails.char}"`);

    tokens.push(charDetails);

  }

  return tokens;

};

export const vtranslit = str => {

  const state = {

    aksharaIndex: 0,
    maxTokenLength: 0,
    tokenLengths: []

  };

  const fromSchemeTree = makeFromSchemeTree(itransScheme, state);

  const toSchemeTree = makeToSchemeTree(devanagariScheme, state);

  const tokens = tokenize(str, fromSchemeTree, state);

  const outStr = [];

  const vowelConditions = ['strStart', 'avasAna', 'vowelMarks', 'vowels'];

  for (let index = 0; index < tokens.length; index += 1) {

    const token = tokens[index];

    const nextToken = (index < tokens.length - 1) ? tokens[index + 1] : { type: 'strEnd' };

    if (
      token.type === 'consonants' &&
      nextToken.type !== 'vowelMarks'
    ) {

      if (index < tokens.length) {

        tokens.splice(index + 1, 0, getCharDetails('halantam', fromSchemeTree));

      }

    }

  }

  tokens.forEach((token, index) => {

    const prevToken = (index > 0) ? tokens[index - 1] : { type: 'strStart' };

    if (
      token.type === 'vowelMarks' &&
      vowelConditions.indexOf(prevToken.type) > -1
    ) {

      token = getCharDetails(`*${token.char}`, fromSchemeTree);

    }

    if (token.type === 'undefined') {

      outStr.push('');

    } else if (token.type === 'avasAna') {

      outStr.push(token.char);

    } else {

      outStr.push(toSchemeTree[token.aksharaIndex].char.join());

    }

  });

  return outStr.join('');

};

/* eslint-enable complexity */
