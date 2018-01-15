import { expect } from 'chai';
import { translit } from '../../src';

describe('translit', () => {

  it('should transliterate ` ` to ` `', () => {

    expect(translit(' ')).to.equal(' ');

  });

});
