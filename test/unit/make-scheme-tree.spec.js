import { expect } from 'chai';
import { makeFromSchemeTree } from '../../src/make-scheme-tree';

const state = {

  aksharaIndex: 0,
  maxTokenLength: 0,
  tokenLengths: []

};

describe('makeFromSchemeTree', () => {

  const fromSchemeTree = makeFromSchemeTree('Itran', state);

  it('should return an object literal', () => {

    expect(fromSchemeTree).to.be.an('object');

  });

  it('should contain all of these - [`A`, `aa`, `RRI`, `|`, `p`, `~n`]', () => {

    expect(fromSchemeTree).to.contain.all.keys(['A', 'aa', 'RRI', '|', 'p', '~n']);

  });

  it('should not contain any of these - [``]', () => {

    expect(fromSchemeTree).not.to.contain.any.of.keys(['']);

  });

  it('should return an object when char is looked up', () => {

    expect(fromSchemeTree['~N']).to.be.an('object');

  });

  it('should return the details of the given char', () => {

    expect(fromSchemeTree['N^']).to.deep.equal({
      aksharaIndex: 4,
      alternateIndex: 1,
      char: 'N^',
      type: 'consonants'
    });

  });

});
