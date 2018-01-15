import { expect } from 'chai';
import { vtranslit } from '../../src';

describe('vtranslit', () => {

  it('should transliterate ` ` to ` `', () => {

    expect(vtranslit(' ')).to.equal(' ');

  });

});
