import { devanagariScheme } from '../../src/vtranslit-schemes/vtranslit-dev-scheme';
import { expect } from 'chai';
import { getChar } from '../../src/char';
import { itransScheme } from '../../src/vtranslit-schemes/vtranslit-itrans-scheme';
import { mapChars } from '../../src/char-mapper';

const charMap = mapChars(itransScheme, devanagariScheme);

describe('getChar', () => {

  it('should transliterate `a` to `अ`', () => {

    expect(getChar('a', charMap)).to.deep.equal({
      char: 'अ',
      processedLength: 1,
      tokenSlice: 'a'
    });

  });

  it('should transliterate `aa` to `आ`', () => {

    expect(getChar('aa', charMap)).to.deep.equal({
      char: 'आ',
      processedLength: 2,
      tokenSlice: 'aa'
    });

  });

  it('should transliterate `~na w` to `ञ`', () => {

    expect(getChar('~na w', charMap)).to.deep.equal({
      char: 'ञ',
      processedLength: 3,
      tokenSlice: '~na'
    });

  });

  it('should not transliterate `w ~na` to `ञ`', () => {

    expect(getChar('w ~na', charMap)).not.to.deep.equal({
      char: 'ञ',
      processedLength: 3,
      tokenSlice: '~na'
    });

  });

  it('should transliterate `Ana` to `आ`', () => {

    expect(getChar('Ana', charMap)).to.deep.equal({
      char: 'आ',
      processedLength: 1,
      tokenSlice: 'A'
    });

  });

  it('should transliterate `p` to `प्`', () => {

    expect(getChar('p', charMap)).to.deep.equal({
      char: 'प्',
      processedLength: 1,
      tokenSlice: 'p'
    });

  });

  it('should transliterate `pra` to `प्र`', () => {

    expect(getChar('pra', charMap)).to.deep.equal({
      char: 'प्र',
      processedLength: 1,
      tokenSlice: 'pra'
    });

  });

});
