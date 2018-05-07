import { expect } from 'chai';
import { vTranslit } from '../../src/index';
import { vTranslitSchemeDeva } from 'vtranslit-scheme-deva';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

const vtranslit = vTranslit([
  vTranslitSchemeDeva,
  vTranslitSchemeItrn
]);

/*
  options.translitMode: 0 'everything' // no toggling i.e. all are translit'ed
  options.translitMode: 1 'outside-markers-only' // everything translit'ed except #{}# contents
  options.translitMode: 2 'inside-markers-only' // only #{}# translit'ed.
*/

describe('vTranslit in translitMode 0', () => {

  const options = {

    translitMode: 0

  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit the everything of the given string.', () => {

    expect(vt('#{mahA}# viSNu')).to.equal('#{महा}# विष्णु');

  });

});

describe('vTranslit in translitMode 1', () => {

  const options = {

    translitMode: 1

  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit the everything execpt contents of #{}#.', () => {

    expect(vt('#{Lord}# viSNu')).to.equal('Lord विष्णु');

  });

});

describe('vTranslit in translitMode 2', () => {

  const options = {

    translitMode: 2

  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit the contents of #{}# and skip the rest.', () => {

    expect(vt('Lord #{viSNu}#')).to.equal('Lord विष्णु');

  });

});
