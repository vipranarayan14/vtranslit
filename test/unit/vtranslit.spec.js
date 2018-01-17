import { expect } from 'chai';
import { initVtranslit } from '../../src';

const vtranslit = initVtranslit();

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

  it('should transliterate the given verse', () => {

    expect(vtranslit(
      'vAgarthAviva saMpRRiktau vAgarthapratipattaye |' +
      'jagataH pitarau vande pArvatIparameshvarau ||')).to.equal(
      'वागर्थाविव संपृक्तौ वागर्थप्रतिपत्तये ।' +
      'जगतः पितरौ वन्दे पार्वतीपरमेश्वरौ ॥'
    );

  });

});
