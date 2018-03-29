const { vtranslit } = require('../');

const vt = vtranslit('Itrn', 'Deva');

const sampleStrings = [
  `
  shlokaH :
  vAgarthAviva saMpRRiktau vAgarthapratipattaye |
  jagataH pitarau vande pArvatIparameshvarau ||
  `,
  `
  chihnAH : @#$%^&*(){}[]\/?<>,~\`-=
  itarAkShrANi: P, J, K, f, F, G  
  `,
  `
  chihnaiH itraAkshraiH cha sahitaM vAkhyaM:
  #rAma, @kRRishhNaH, P. rAmanujam.
  `
];

sampleStrings.forEach((sampleString, index) => {

  /* eslint-disable no-console */
  console.log(`
  sampleString: ${index + 1}
  ******************
  "${ sampleString }"
  ******************
`);

  console.log(`
  Output:
  ******************
  "${ vt(sampleString) }"
  ******************
`);
  /* eslint-enable no-console */

});
