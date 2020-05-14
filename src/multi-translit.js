import { makeFromSchemeTree, makeToSchemeTree } from './make-scheme-tree';
import { translitString } from './translit-string';

export const multiTranslit = (...params) => {
  const [fromSchemeCode, listSchemes, getScheme, options] = params;

  const fromScheme = getScheme(fromSchemeCode);
  const toSchemes = [];

  const { fromSchemeTree, maxTokenLength } = makeFromSchemeTree(fromScheme);

  listSchemes().forEach((scheme) => {
    toSchemes.push(getScheme(scheme.code));
  });

  const toSchemeTrees = {};

  toSchemes.forEach((toScheme) => {
    toSchemeTrees[toScheme.about.code] = makeToSchemeTree(toScheme);
  });

  options.translitMode = 3; // 'marked' + 'multi'

  return (inStr) =>
    translitString(
      toSchemes,
      fromSchemeTree,
      toSchemeTrees,
      maxTokenLength,
      options
    )(inStr);
};
