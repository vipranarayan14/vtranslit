/* eslint-disable complexity */

export const processTokens = (Tokens, fromSchemeTree, toSchemeType) => {

  const tokens = Tokens.slice();

  const tokensType = [];

  for (let index = 0; index < tokens.length; index += 1) {

    const token = tokens[index];

    const nextToken = (index < tokens.length - 1) ? tokens[index + 1] : { type: 'strEnd' };

    const prevToken = (index > 0) ? tokens[index - 1] : { type: 'strStart' };

    let tokenType = token.type;

    if (toSchemeType === 'brahmic') {

      if (tokenType === 'deadConsonants' && nextToken.type === 'vowelMarks') {

        tokenType = 'consonants';

      } else if (tokenType === 'vowels' && prevToken.type === 'deadConsonants') {

        tokenType = 'vowelMarks';

      } else if (tokenType === 'vowelMarks' && prevToken.type !== 'deadConsonants') {

        tokenType = 'vowels';

      }

    } else if (toSchemeType === 'roman') {

      if (tokenType === 'consonants' && nextToken.type === 'vowelMarks') {

        tokenType = 'deadConsonants';

      }

    }

    tokensType.push(tokenType);

  }

  return { processedTokens: tokens, tokensType };

};
