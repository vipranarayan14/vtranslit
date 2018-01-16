import { expect } from 'chai';
import { vtranslit } from '../../src';

describe('vtranslit', () => {

  it('should transliterate to ` ` for ` `', () => {

    expect(vtranslit(' ')).to.equal(' ');

  });

  it('should transliterate to `प्र` for `pra`', () => {

    expect(vtranslit('pra')).to.equal('प्र');

  });

  it('should transliterate to `क्षेत्रज्ञ` for `kShetraj~na`', () => {

    expect(vtranslit('kShetraj~na')).to.equal('क्षेत्रज्ञ');

  });

});
