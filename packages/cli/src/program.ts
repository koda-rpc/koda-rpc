import { Command } from 'commander';
import packageJson = require('../package.json');
import { genTypesAction } from './gen-types';

const program = new Command();

program
  .name('kodarpc')
  .description('CLI for KodaRPC')
  .version(packageJson.version);

program
  .command('gen-types')
  .description('Generate TypeScript declaration files from KodaRPC Schema')
  .argument('<path-to-schema>', 'Path to KodaRPC Schema')
  .option('-o, --output <string>', 'Path to TypeScript declaration file path', '')
  .action(genTypesAction)

export { program };
