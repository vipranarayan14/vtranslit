const { translit } = require('../');

const sampleString = '  ss a A ~Na^Nana shaNa';

/* eslint-disable no-console */
console.log(`
  ******************
  sampleString: "${ sampleString }
  ******************
`);

console.log(`
  ******************
   Output: "${ translit(sampleString) }"
  ******************
`);
/* eslint-enable no-console */
