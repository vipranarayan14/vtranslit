import { expect } from 'chai';
import { vTranslit } from '../../src/index';
import { vTranslitSchemeDeva } from 'vtranslit-scheme-deva';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

const vtranslit = vTranslit([vTranslitSchemeDeva, vTranslitSchemeItrn]);

/*
  options.translitMode: 0 'everything' // no toggling i.e. all are translit'ed
  options.translitMode: 1 'not marked' // everything translit'ed except #{}# contents
  options.translitMode: 2 'marked' // only #{}# translit'ed.
*/

describe('vTranslit in translitMode 0', () => {
  const options = {
    translitMode: 0,
  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit everything of the given string.', () => {
    expect(vt('#{mahA}# viSNu')).to.equal('#{महा}# विष्णु');
  });
});

describe('vTranslit in translitMode 1', () => {
  const options = {
    translitMode: 1,
  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit everything execpt contents of #{}#.', () => {
    expect(vt('#{Lord}# viSNu')).to.equal('Lord विष्णु');
  });
});

describe('vTranslit in translitMode 2', () => {
  const options = {
    translitMode: 2,
  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit the contents of #{}# and skip the rest.', () => {
    expect(vt('Lord #{viSNu}#')).to.equal('Lord विष्णु');
  });
});
