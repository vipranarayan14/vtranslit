import { getCharDetails } from './char-details-provider';

/* eslint-disable complexity */

export const analyzeTokens = (Tokens, fromSchemeTree) => {

  const tokens = Tokens.slice();

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

  return tokens;

};
