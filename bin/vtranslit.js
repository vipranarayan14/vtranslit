#!/usr/bin/env node

(function () {

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

  const fs = require('fs');

  const options = require('yargs')
    .usage('Usage: $0 -f [scheme] -t [scheme] -s [string] -i [file] -o [output]')
    .options({
      'f': {
        alias: 'from',
        default: 'Itrn',
        describe: 'scheme to transliterate from',
        type: 'string'
      },
      'i': {
        describe: 'path to the file to transliterate',
        type: 'string'
      },
      'o': {
        describe: 'path to write the transliterated output',
        type: 'string'
      },
      's': {
        alias: 'string',
        describe: 'string to transliterate',
        type: 'string'
      },
      't': {
        alias: 'to',
        default: 'Deva',
        describe: 'scheme to transliterate to',
        type: 'string'
      },
    })
    .help('h')
    .alias('h', 'help')
    .argv;

  const log = console.log; // eslint-disable-line no-console

  const handleOutput = outputString => {

    if (outputString) {

      if (options.o) {

        fs.writeFile(options.o, outputString, 'utf8', error => {

          if (error) {

            log(error);

          }

        });

        return;

      }

      log('Transliterated output:\n', outputString);

    }

  };

  const transliterate = (vt, string) => {

    console.time('TransliterationTime'); // eslint-disable-line no-console

    const outputString = vt(string.toString().trim());

    console.timeEnd('TransliterationTime'); // eslint-disable-line no-console

    handleOutput(outputString);

  };

  const handleInput = vt => {

    if (options.string) {

      transliterate(vt, options.string);

    } else if (options.i) {

      fs.readFile(options.i, 'utf8', (error, data) => {

        transliterate(vt, data);

      });

    }

  };

  if (options.string || options.i) {

    const vt = vtranslit.init(options.from, options.to);

    handleInput(vt);

  }

})();
