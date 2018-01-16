import { devanagariScheme } from './../../src/vtranslit-schemes/vtranslit-dev-scheme';
import { expect } from 'chai';
import { itransScheme } from './../../src/vtranslit-schemes/vtranslit-itrans-scheme';
import { mapChars } from '../../src/char-mapper';

describe('mapChars', () => {

  const charMap = mapChars(itransScheme, devanagariScheme);

  it('should return an object literal', () => {

    expect(charMap).to.be.an('object');

  });

  it('should contain all of these - [`aa`, `A`, `|`, `RRI`]', () => {

    expect(charMap).to.contain.all.keys(['aa', 'A', '|', 'RRI']);

  });

  it('should not contain any of these - [`k`, `kh`, `.m`, `.h`, ``]', () => {

    expect(charMap).not.to.contain.any.of.keys(['k', 'kh', '.m', '.h', '']);

  });

});
