import { expect } from 'chai';
import { vTranslit } from '../../../src/index';

// const fs = require('fs');

describe('vtranslit from Deva to Itrn', () => {

  const vt = vTranslit('Deva', 'Itrn');

  it('should transliterate `वाक् इव` to `vAk iva`', () => {

    expect(vt('वाक् इव')).to.equal('vAk iva');

  });

  // it('should transliterate a given data from file', () => {

  //   fs.readFile('files/test-deva-to-itrn.txt', 'utf8', (inputError, inputData) => {

  //     fs.readFile('files/test-itrn-to-deva.txt', 'utf8', (outputError, outputData) => {

  //       expect(vt(inputData)).to.equal(outputData);

  //     });

  //   });

  // });

});
