/* eslint-disable complexity */

export const validateSchemes = schemes => {

  // handle `null`, `undefined`, etc.
  if (!schemes) {

    throw new Error('Function vTranslit should be initiated with a list vTranslit schemes.');

  }

  // handle `object`, `function`, etc.
  else if (!Array.isArray(schemes)) {

    throw new Error('vTranslit schemes are expected to be in array format.');

  }

  // handle single scheme array
  else if (schemes.length < 2) {

    throw new Error('Atleast two vTranslit schemes are required to init vTranslit.');

  }

  else {

    schemes.map(scheme => {

      if (
        !scheme.about
        || !scheme.data
        || !scheme.about.code
        || !scheme.about.name
        || !scheme.about.type
        || !scheme.about.unicodeBlock
      ) {

        throw new Error('One or more of the provided vTranslit scheme are invalid.');

      }

    });

    return schemes;

  }

};
