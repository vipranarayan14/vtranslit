import { expect } from 'chai';
import { vTranslit } from '../../../src/index';
import vTranslitDevaScheme from 'vtranslit-deva-scheme';
import vTranslitItrnScheme from 'vtranslit-itrn-scheme';

const vtranslit = vTranslit([
  vTranslitDevaScheme,
  vTranslitItrnScheme
]);

const vt = vtranslit.init('Itrn', 'Deva');

describe('vtranslit from Itrn to Deva', () => {

  it('should not transliterate `#$%&*!$%()^&^$#&(` and just return them', () => {

    expect(vt('#$%&*!$%()^&^$#&(')).to.equal('#$%&*!$%()^&^$#&(');

  });

  it('should transliterate ` ` to ` `', () => {

    expect(vt(' ')).to.equal(' ');

  });

  it('should transliterate `AUM` and `OM` to `ॐ`', () => {

    expect(vt('AUM')).to.equal('ॐ');
    expect(vt('OM')).to.equal('ॐ');

  });

  it('should transliterate `.a` to `ऽ`', () => {

    expect(vt('.a')).to.equal('ऽ');

  });

  it('should transliterate `shrI` to `श्री`', () => {

    expect(vt('shrI')).to.equal('श्री');

  });

  it('should transliterate `a` to `अ`', () => {

    expect(vt('a')).to.equal('अ');

  });

  it('should transliterate `_i` to `इ`', () => {

    expect(vt('_i')).to.equal('इ');

  });

  it('should transliterate `kha` to `ख`', () => {

    expect(vt('kha')).to.equal('ख');

  });

  it('should transliterate `N^` to `ङ्`', () => {

    expect(vt('N^')).to.equal('ङ्');

  });

  it('should transliterate `shhiiM` to `षीं`', () => {

    expect(vt('shhiiM')).to.equal('षीं');

  });

  it('should transliterate to `प्र` for `pra`', () => {

    expect(vt('pra')).to.equal('प्र');

  });

  it('should transliterate `a i u N` to `अ इ उ ण्`', () => {

    expect(vt('a i u N')).to.equal('अ इ उ ण्');

  });

  it('should transliterate to `॥ १-१ ॥` for `|| 1-1 ||`', () => {

    expect(vt('|| 1-1 ||')).to.equal('॥ १-१ ॥');

  });

  it('should transliterate to `क्षेत्रज्ञ` for `kShEtraj~na`', () => {

    expect(vt('kShEtraj~na')).to.equal('क्षेत्रज्ञ');

  });

  it('should transliterate given phrase', () => {

    expect(vt('gItaagOpAlau auShadhArthaM vanam Eti |'))
      .to.equal('गीतागोपालौ औषधार्थं वनम् एति ।');

  });

  it('should transliterate the given verse', () => {

    expect(vt(
      'vAgarthAviva saMpRRiktau vAgarthapratipattayE |' +
      'jagataH pitarau vandE pArvatIparamEshvarau ||')).to.equal(
      'वागर्थाविव संपृक्तौ वागर्थप्रतिपत्तये ।' +
      'जगतः पितरौ वन्दे पार्वतीपरमेश्वरौ ॥'
    );

  });

});
