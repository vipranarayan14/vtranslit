import { expect } from 'chai';
import { findScheme } from '../../src/find-scheme';

describe('findScheme', () => {

  it('should return scheme code as `Itrn` for the given string', () => {

    expect(findScheme('viSNu')).to.equal('Itrn');

  });

  it('should return scheme code as `Deva` for the given string', () => {

    expect(findScheme('विष्णु')).to.equal('Deva');

  });

  it('should return scheme code as `Itrn` for the given mixed string', () => {

    expect(findScheme('nalinI दल')).to.equal('Itrn');

  });

  it('should return scheme code as `Deva` for the given mixed string', () => {

    expect(findScheme('नलिनी dala')).to.equal('Deva');

  });

  it('should return scheme code as `Itrn` for the given equally mixed string', () => {

    expect(findScheme('kumuदिनी')).to.equal('Itrn');

  });

  it('should return scheme code as `Deva` for the given equally mixed string', () => {

    expect(findScheme('कुमुdinI')).to.equal('Deva');

  });

  it('should return scheme code as `Itrn` for the given mixed string', () => {

    expect(findScheme('rAmaH vanaM गच्छति । तत्र सीता सह निवसति ।')).to.equal('Itrn');

  });

  it('should return scheme code as `Deva` for the given equally mixed string', () => {

    expect(findScheme('रामः वनं gachChati | tatra sItA saha nivasati |')).to.equal('Deva');

  });

});
