import { expect } from 'chai';
import { vtranslit } from '../../../src/index';

describe('vtranslit from Deva to Itrn', () => {

  const vt = vtranslit('Deva', 'Itrn');

  it('should transliterate `वाक् इव` to `vAk iva`', () => {

    expect(vt('वाक् इव')).to.equal('vAk iva');

  });

});
