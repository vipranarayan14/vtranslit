import { makeFromSchemeTree, makeToSchemeTree } from './make-scheme-tree';
import { translitString } from './translit-string';

export const singleTranslit = (...params) => {

  const [
    fromSchemeCode,
    toSchemeCode,
    getScheme,
    options
  ] = params;

  const fromScheme = getScheme(fromSchemeCode);
  const toScheme = getScheme(toSchemeCode);

  const {
    fromSchemeTree,
    maxTokenLength
  } = makeFromSchemeTree(fromScheme);

  const toSchemeTree = makeToSchemeTree(toScheme);

  return inStr => translitString(

    toScheme,
    fromSchemeTree,
    toSchemeTree,
    maxTokenLength,
    options

  )(inStr);

};
