module.exports = class VTranslitCli {

  constructor(fromScheme, toScheme) {

    const { vTranslit } = require('../');

    const { vTranslitSchemeDeva } = require('vtranslit-scheme-deva');
    const { vTranslitSchemeItrn } = require('vtranslit-scheme-itrn');
    const { vTranslitSchemeKnda } = require('vtranslit-scheme-knda');
    const { vTranslitSchemeTaml } = require('vtranslit-scheme-taml');
    const { vTranslitSchemeTelu } = require('vtranslit-scheme-telu');

    const vtranslit = vTranslit([
      vTranslitSchemeDeva,
      vTranslitSchemeItrn,
      vTranslitSchemeKnda,
      vTranslitSchemeTaml,
      vTranslitSchemeTelu
    ]);

    this.vt = vtranslit.init(fromScheme, toScheme);
    this.log = console.log; // eslint-disable-line no-console

  }

  file(inputFilePath, outputFilePath) {

    const fs = require('fs');

    fs.readFile(inputFilePath, 'utf8', (readError, data) => {

      if (readError) {

        throw new Error(readError);

      }

      const output = this.vt(data);

      if (outputFilePath) {

        fs.writeFile(outputFilePath, output, 'utf8', writeError => {

          if (writeError) {

            throw new Error(writeError);

          }

        });

        return this.log(`Transliterated output written to the file: '${outputFilePath}'.`);

      }

      return this.log('Transliterated output:\n', output);

    });

  }

  string(str) {

    this.log(this.vt(str));

  }

};
