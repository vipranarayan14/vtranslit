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

```bash
const { vTranslit } = require('../');

const vt = vTranslit('Itrn', 'Deva');

vt('stringToTransliterate');
```

## Browser usage

```js
const vTranslit = window.vTranslit;

const vt = vtranslit('Itrn', 'Deva');

vt('stringToTransliterate');
```

The codes for scheme are based on the [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) (Codes for the representation of names of scripts), expect ITRANS which is given a similar code in accordance with the standards definition.
