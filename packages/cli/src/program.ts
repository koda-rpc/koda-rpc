import { Command } from 'commander';
import packageJson = require('../package.json');
import { genTypesAction } from './gen-types';
import { serializeAction } from './serialize';
import { deserializeAction } from './deserialize';

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
  .action(genTypesAction);

program
  .command('serialize')
  .description('Serialize message from KodaRPC schema')
  .argument('<path-to-schema>', 'Path to KodaRPC Schema')
  .option('-c, --call-method <string>', 'Service and method names. Format: Service.method')
  .option('-t, --type <string>', 'Type of compiled data, Format: request | response')
  .option('-p, --parameters <string>', 'Method Parameters. Format: 1, {"foo": "bar"}')
  .option('-o, --output <string>', 'Path to binary output')
  .action(serializeAction);

  program
  .command('deserialize')
  .description('Deserialize message from KodaRPC schema')
  .argument('<path-to-schema>', 'Path to KodaRPC Schema')
  .option('-i, --input <string>', 'Binary encoded message file (.bin)')
  .option('-t, --type <string>', 'Type of compiled data, Format: request | response')
  .action(deserializeAction);

export { program };
