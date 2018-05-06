import { expect } from 'chai';
import { vTranslit } from '../../src/index';
import { vTranslitSchemeDeva } from 'vtranslit-scheme-deva';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

const vtranslit = vTranslit([
  vTranslitSchemeDeva,
  vTranslitSchemeItrn
]);

/*
  options.toggleMode: 0 // no toggling i.e. all are translit'ed
  options.toggleMode: 1 // everything translit'ed except #{}# contents
  options.toggleMode: 2 // only #{}# translit'ed.
*/

describe('vTranslit in toggleMode 0', () => {

  const options = {

    toggleMode: 0

  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit the everything of the given string.', () => {

    expect(vt('#{mahA}#viSNu')).to.equal('महाविष्णु');

  });

});

describe('vTranslit in toggleMode 1', () => {

  const options = {

    toggleMode: 1

  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit the everything execpt contents of #{}#.', () => {

    expect(vt('#{Lord}# viSNu')).to.equal('Lord विष्णु');

  });

});

describe('vTranslit in toggleMode 2', () => {

  const options = {

    toggleMode: 2

  };

  const vt = vtranslit.init('Itrn', 'Deva', options);

  it('should translit the contents of #{}# and skip the rest.', () => {

    expect(vt('Lord #{viSNu}#')).to.equal('Lord विष्णु');

  });

});
