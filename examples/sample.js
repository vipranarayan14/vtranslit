const { vtranslit } = require('../');

// const sampleStr = 'ashh ssj';
// const sampleStr = 'A ~Na^NN^ana sha_aNa';
const sampleStr = 'AUM vAgarthAviva saMpRRikta_u au 123 j~naanaM JNshh | asti iti me autsukhyam ||';

/* eslint-disable no-console */
console.log(`
  ******************
  sampleString: "${ sampleStr }"
  ******************
`);

console.log(`
  ******************
   Output: "${ JSON.stringify(vtranslit(sampleStr)) }"
  ******************
`);
/* eslint-enable no-console */
