# vtranslit

A transliterator between ITRANS and any Indic Script.

Currently supports transliteration from ITRANS ([Itrn][1]) to:
- Devanagari ([Deva][2])
- Kannada ([Knda][3])
- Tamil ([Taml][4])
- Telugu ([Telu][5])

It also supports transliteration from the above mentioned schemes to ITRANS.

This package is a library and is useful only for developers.

However, users can avail vTranslit's [cli](https://www.npmjs.com/package/vtranslit-cli) or [web app](https://vtranslit.netlify.com/).

## Installation

```bash
> npm install vtranslit
```

## Node usage

```js
const { vTranslit } = require('vtranslit');

// install necessary schemes from npm (links given above)
const { vTranslitSchemeDeva } = require('vtranslit-scheme-deva');
const { vTranslitSchemeItrn } = require('vtranslit-scheme-itrn');

// add schemes to vTranslit
const vtranslit = vTranslit(
  [
    vTranslitSchemeDeva,
    vTranslitSchemeItrn
  ]
);

// from ITRANS scheme to Devanagari scheme
const vtItrnToDeva = vtranslit.init('Itrn', 'Deva');

console.log(vtItrnToDeva('<stringToTransliterate>');

// from Devanagari scheme to ITRANS scheme
const vtDevaToItrn = vtranslit.init('Deva', 'Itrn');

console.log(vtDevaToItrn('<stringToTransliterate>');
```

The codes for scheme are based on the [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) (Codes for the representation of names of scripts), expect ITRANS which is given a similar code in accordance with the standards definition.

[1]: https://www.npmjs.com/package/vtranslit-scheme-itrn
[2]: https://www.npmjs.com/package/vtranslit-scheme-deva
[3]: https://www.npmjs.com/package/vtranslit-scheme-knda
[4]: https://www.npmjs.com/package/vtranslit-scheme-taml
[5]: https://www.npmjs.com/package/vtranslit-scheme-telu
