const options = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('string', 'input a string')
  .command('file', 'input a file',

    {

      inputFilePath: {
        alias: 'i',
        demand: 'Specify the path to the file to be transliterated',
        description: 'The path to the file to be transliterated',
        type: 'string'
      },

      outputFilePath: {
        alias: 'o',
        description: 'The path to the file to be transliterated',
        type: 'string'
      }

    }

  )
  .options({
    from: {
      alias: 'f',
      choices: ['Itrn', 'Deva'],
      demand: 'Specify Scheme to transliterate from',
      describe: 'Scheme to transliterate from',
      global: true,
      type: 'string'
    },

    to: {
      alias: 't',
      choices: ['Itrn', 'Deva'],
      demand: 'Specify Scheme to transliterate to',
      describe: 'Scheme to transliterate to',
      global: true,
      type: 'string'
    }
  })

  .alias('v', 'version')
  .describe('v', 'show version information')

  .help('h')
  .alias('h', 'help')

  .argv;

console.log(options); // eslint-disable-line
