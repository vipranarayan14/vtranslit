import { expect } from 'chai';
import { makeFromSchemeTree } from '../../../src/make-scheme-tree';

describe('fromSchemeTree for "Deva" scheme', () => {

  const state = {

    aksharaIndex: 0,
    maxTokenLength: 0,
    tokenLengths: []

  };

  const fromSchemeTree = makeFromSchemeTree('Deva', state);

  it('should be an object literal', () => {

    expect(fromSchemeTree).to.be.an('object');

  });

  it('should contain all of these vowels - [`अ`, `आ`, `ऊ`, `ऋ`, `ऌ`, `औ`]', () => {

    expect(fromSchemeTree).to.contain.all.keys(['अ', 'आ', 'ऊ', 'ऋ', 'ऌ', 'औ']);

  });

  it('should contain all of these consonants - [`क`, `ञ`, `ङ`, `ध`, `य`, `ळ`, `व`, `ष`]', () => {

    expect(fromSchemeTree).to.contain.all.keys(['क', 'ञ', 'ङ', 'ध', 'य', 'ळ', 'व', 'ष']);

  });

  it('should contain all of these vowelMarks - [`्`, `ा`, `ू`, `ॄ`, `े`, `ै`, `ौ`]', () => {

    expect(fromSchemeTree).to.contain.all.keys(['्', 'ा', 'ू', 'ॄ', 'े', 'ै', 'ौ']);

  });

  it('should contain all of these symbols - [`०`, `४`, `।`, `ऽ`, `ं`]', () => {

    expect(fromSchemeTree).to.contain.all.keys(['०', '४', '।', 'ऽ', 'ं']);

  });

  // it('should not contain any of these - [``]', () => {

  //   expect(fromSchemeTree).not.to.contain.any.of.keys(['']);

  // });

  it('should return an object when char is looked up', () => {

    expect(fromSchemeTree['ञ']).to.be.an('object');

  });

  it('should return the details of the given char', () => {

    expect(fromSchemeTree['ङ']).to.deep.equal({
      aksharaIndex: 4,
      alternateIndex: 0,
      char: 'ङ',
      type: 'consonants'
    });

  });

});
