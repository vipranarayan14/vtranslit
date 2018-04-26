# vTranslit

A transliterator between ITRANS and any Indic Script.

Currently supports transliteration from ITRANS (Itrn) to: 
- Devanagari (Deva)
- Kannada (Knda)
- Tamil (Taml)
- Telugu (Telu)

It also supports transliteration from the above mentioned schemes to ITRANS.

A beautiful [web app](https://vipranarayan14.github.io/vtranslit-web/) is also available.

## Installation

```bash
npm install vtranslit
```

## Node usage

```js
const { vTranslit } = require('vtranslit');

// install necessary schemes from "https://github.com/vipranarayan14/" using npm
const vTranslitDevaScheme = require('vtranslit-deva-scheme');
const vTranslitItrnScheme = require('vtranslit-itrn-scheme');

// add schemes to vTranslit
const vtranslit = vTranslit([
  vTranslitDevaScheme,
  vTranslitItrnScheme,
]);

// from ITRANS scheme to Devanagari scheme
const vtItrnToDeva = vtranslit.init('Itrn', 'Deva');

console.log(vtItrnToDeva('<stringToTransliterate>');

// from Devanagari scheme to ITRANS scheme
const vtDevaToItrn = vtranslit.init('Deva', 'Itrn');

console.log(vtDevaToItrn('<stringToTransliterate>');
```

The codes for scheme are based on the [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) (Codes for the representation of names of scripts), expect ITRANS which is given a similar code in accordance with the standards definition.
