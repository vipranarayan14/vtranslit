const { vTranslit } = require('../');

const vTranslitDevaScheme = require('vtranslit-deva-scheme');
const vTranslitItrnScheme = require('vtranslit-itrn-scheme');

const vtranslit = vTranslit([
  vTranslitDevaScheme,
  vTranslitItrnScheme,
]);

const vtItrnToDeva = vtranslit.init('Itrn', 'Deva');
const vtDevaToItrn = vtranslit.init('Deva', 'Itrn');

const stringsInItrn = [
  `
  shlokaH :
  vAgarthAviva saMpRRiktau vAgarthapratipattaye |
  jagataH pitarau vande pArvatIparameshvarau ||
  `,
  `
  chihnAH : @#$%^&*(){}[]\/?<>,~\`-=
  itarAkShrANi: P, J, K, f, F, G  
  `
];

const stringsInDeva = [
  `
  गीतागोपालौ औषधार्थं वनम् एति ।
  `
];

const logTranslited = (strings, vt) =>

  strings.forEach((str, index) => {

    /* eslint-disable no-console */
    console.log(`
sampleString: ${index + 1}
******************
${ str }
******************
    `);

    console.log(`
Output:
******************
${ vt(str) }
******************
`);
    /* eslint-enable no-console */

  });

logTranslited(stringsInItrn, vtItrnToDeva);
logTranslited(stringsInDeva, vtDevaToItrn);
