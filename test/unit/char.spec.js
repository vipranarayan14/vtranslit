import { devanagariScheme } from '../../src/vtranslit-schemes/vtranslit-dev-scheme';
import { expect } from 'chai';
import { getChar } from '../../src/char';
import { itransScheme } from '../../src/vtranslit-schemes/vtranslit-itrans-scheme';
import { mapChars } from '../../src/char-mapper';

const charMap = mapChars(itransScheme, devanagariScheme);

describe('getChar', () => {

  it('should return char `अ` for `a`', () => {

    expect(getChar('a', charMap)).to.deep.equal({
      char: 'अ',
      processedLength: 1,
      tokenSlice: 'a'
    });

  });

  it('should return char `आ` for `aa`', () => {

    expect(getChar('aa', charMap)).to.deep.equal({
      char: 'आ',
      processedLength: 2,
      tokenSlice: 'aa'
    });

  });

  it('should return char `ञ` for `~na w`', () => {

    expect(getChar('~na w', charMap)).to.deep.equal({
      char: 'ञ',
      processedLength: 3,
      tokenSlice: '~na'
    });

  });

  it('should not return char `ञ` for `w ~na`', () => {

    expect(getChar('w ~na', charMap)).not.to.deep.equal({
      char: 'ञ',
      processedLength: 3,
      tokenSlice: '~na'
    });

  });

  it('should return char `आ` for `Ana`', () => {

    expect(getChar('Ana', charMap)).to.deep.equal({
      char: 'आ',
      processedLength: 1,
      tokenSlice: 'A'
    });

  });

  it('should return char `प्` for `p`', () => {

    expect(getChar('p', charMap)).to.deep.equal({
      char: 'प्',
      processedLength: 1,
      tokenSlice: 'p'
    });

  });

  it('should return `` for `-`', () => {

    expect(getChar('', charMap)).to.deep.equal({
      char: '',
      processedLength: 0,
      tokenSlice: ''
    });

  });

});
