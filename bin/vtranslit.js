#!/usr/bin/env node

(function () {

  const { vtranslit } = require('../');

  const log = (...args) => console.log(...args); // eslint-disable-line no-console

  const stringToTranslit = process.argv[2];

  const vt = vtranslit('Itran', 'Deva');

  if (!stringToTranslit || stringToTranslit === '--help') {

    log('Usage: vtranslit [string to translit]');

    return;

  }

  log('Input:\n', stringToTranslit);
  log('Translitered output:\n', vt(stringToTranslit));

})();
