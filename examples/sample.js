const { vTranslit } = require('../');

const vtItrnToDeva = vTranslit.init('Itrn', 'Deva');
const vtDevaToItrn = vTranslit.init('Deva', 'Itrn');

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

const logTranslited = (strings, vtranslit) =>

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
${ vtranslit(str) }
******************
`);
    /* eslint-enable no-console */

  });

logTranslited(stringsInItrn, vtItrnToDeva);
logTranslited(stringsInDeva, vtDevaToItrn);
