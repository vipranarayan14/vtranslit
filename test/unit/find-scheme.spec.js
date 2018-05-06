import { expect } from 'chai';
import { findScheme } from '../../src/scheme/find-scheme';
import { vTranslitSchemeDeva } from 'vtranslit-scheme-deva';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

const find = findScheme([
  vTranslitSchemeDeva,
  vTranslitSchemeItrn
]);

describe('findScheme', () => {

  it('should return scheme code as `Itrn` for the given string', () => {

    expect(find('viSNu')).to.equal('Itrn');

  });

  it('should return scheme code as `Deva` for the given string', () => {

    expect(find('विष्णु')).to.equal('Deva');

  });

  it('should return scheme code as `Itrn` for the given mixed string', () => {

    expect(find('nalinI दल')).to.equal('Itrn');

  });

  it('should return scheme code as `Deva` for the given mixed string', () => {

    expect(find('नलिनी dala')).to.equal('Deva');

  });

  it('should return scheme code as `Itrn` for the given equally mixed string', () => {

    expect(find('kumuदिनी')).to.equal('Itrn');

  });

  it('should return scheme code as `Deva` for the given equally mixed string', () => {

    expect(find('कुमुdinI')).to.equal('Deva');

  });

  it('should return scheme code as `Itrn` for the given mixed string', () => {

    expect(find('rAmaH vanaM गच्छति । तत्र सीता सह निवसति ।')).to.equal('Itrn');

  });

  it('should return scheme code as `Deva` for the given equally mixed string', () => {

    expect(find('रामः वनं gachChati | tatra sItA saha nivasati |')).to.equal('Deva');

  });

});
