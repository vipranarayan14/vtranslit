#!/usr/bin/env node

(function() {

  const { vtranslit } = require('../');

  const log = (...args) => console.log(...args); // eslint-disable-line no-console

  const stringToTranslit = process.argv[2];

  if (!stringToTranslit) {

    log('Usage: translit [string to translit]');

    return;

  }

  log('Input:', stringToTranslit);
  log('Translitered output:', vtranslit(stringToTranslit));

})();
