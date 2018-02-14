# vTranslit

A transliterator between ITRANS and any Indic Script.

NOTE: Currently supports only transliteration from ITRANS to Devanagari.

## Installation

```bash
npm install vtranslit
```

## Node usage

```bash
const { vtranslit } = require('../');

const vt = vtranslit('Itran', 'Deva');

vt('stringToTransliterate');
```

## Browser usage

```js
const vt = vtranslit('Itran', 'Deva');

vt('stringToTransliterate');
```
