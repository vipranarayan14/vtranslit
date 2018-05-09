import { getTokenDetails } from './get-token-details';
import { processTokens } from './process-tokens';
import { translitTokens } from './translit-tokens';
import { vTokenize } from 'vtokenize';

const getToSchemeType = (toScheme, options) =>

  (options.translitMode === 3) ? 'brahmic' : toScheme.about.type;

export const translitString = (...params) => inStr => {

  const [
    toScheme,
    fromSchemeTree,
    toSchemeTree,
    maxTokenLength,
    options
  ] = params;

  const tokens = vTokenize(
    inStr,
    maxTokenLength,
    getTokenDetails(fromSchemeTree, options)
  );

  const toSchemeType = getToSchemeType(toScheme, options);

  const {
    processedTokens,
    tokensType
  } = processTokens(tokens, fromSchemeTree, toSchemeType);

  const outStr = translitTokens(
    processedTokens,
    tokensType,
    toSchemeTree,
    options
  );

  return outStr.join('');

};
