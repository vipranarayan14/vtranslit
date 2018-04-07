const { vTranslit } = require('../');

const vt = vTranslit.init('Itrn', 'Deva');
// const vt = vtranslit('Deva', 'Itrn');

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
  // `
  // गीतागोपालौ औषधार्थं वनम् एति ।
  // `
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
