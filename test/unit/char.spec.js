import { charMap } from '../../src/char-mapper';
import { expect } from 'chai';
import { getChar } from '../../src/char';

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

  it('should transliterate `~Na w` to `ञ`', () => {

    expect(getChar('~Na w', charMap)).to.deep.equal({
      char: 'ञ',
      processedLength: 3,
      tokenSlice: '~Na'
    });

  });

  it('should not transliterate `w ~Na` to `ञ`', () => {

    expect(getChar('w ~Na', charMap)).not.to.deep.equal({
      char: 'ञ',
      processedLength: 3,
      tokenSlice: '~Na'
    });

  });

  it('should transliterate `Ana` to `आ`', () => {

    expect(getChar('Ana', charMap)).to.deep.equal({
      char: 'आ',
      processedLength: 1,
      tokenSlice: 'A'
    });

  });

});
