import { expect } from 'chai';
import { vTranslit } from '../../../src/index';
import { vTranslitSchemeDeva } from 'vtranslit-scheme-deva';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

const vtranslit = vTranslit([vTranslitSchemeDeva, vTranslitSchemeItrn]);

const vt = vtranslit.init('Deva', 'Itrn');

describe('vtranslit from Deva to Itrn', () => {
  it('should not transliterate `#$%&*!$%()^&^$#&(=+-` and just return them', () => {
    expect(vt('#$%&*!$%()^&^$#&(=+-')).to.equal('#$%&*!$%()^&^$#&(=+-');
  });

  it('should transliterate ` ` to ` `', () => {
    expect(vt(' ')).to.equal(' ');
  });

  it('should transliterate `ॐ` to `OM`', () => {
    expect(vt('ॐ')).to.equal('OM');
  });

  it('should transliterate `ऽ` to `.a`', () => {
    expect(vt('ऽ')).to.equal('.a');
  });

  it('should transliterate `श्री` to `shrI`', () => {
    expect(vt('श्री')).to.equal('shrI');
  });

  it('should transliterate `अ` to `a`', () => {
    expect(vt('अ')).to.equal('a');
  });

  it('should transliterate `ख` to `kha`', () => {
    expect(vt('ख')).to.equal('kha');
  });

  it('should not transliterate `ङ्` to `N^`', () => {
    expect(vt('ङ्')).to.not.equal('N^');
  });

  it('should transliterate `षीं` to `ShIM`', () => {
    expect(vt('षीं')).to.equal('ShIM');
  });

  it('should transliterate `प्र` to `pra`', () => {
    expect(vt('प्र')).to.equal('pra');
  });

  it('should transliterate `अ इ उ ण्` to `a i u N`', () => {
    expect(vt('अ इ उ ण्')).to.equal('a i u N');
  });

  it('should transliterate `॥ १-१ ॥` to `|| 1-1 ||`', () => {
    expect(vt('॥ १-१ ॥')).to.equal('|| 1-1 ||');
  });

  it('should transliterate `क्षेत्रज्ञ` to `kShEtraj~na`', () => {
    expect(vt('क्षेत्रज्ञ')).to.equal('kShEtraj~na');
  });

  it('should transliterate given phrase', () => {
    expect(vt('गीतागोपालौ औषधार्थं वनम् एति ।')).to.equal(
      'gItAgOpAlau auShadhArthaM vanam Eti |'
    );
  });

  it('should transliterate the given verse', () => {
    expect(
      vt(
        'वागर्थाविव संपृक्तौ वागर्थप्रतिपत्तये ।' +
          'जगतः पितरौ वन्दे पार्वतीपरमेश्वरौ ॥'
      )
    ).to.equal(
      'vAgarthAviva saMpRRiktau vAgarthapratipattayE |' +
        'jagataH pitarau vandE pArvatIparamEshvarau ||'
    );
  });
});
