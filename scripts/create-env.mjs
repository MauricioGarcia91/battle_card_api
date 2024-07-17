import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'module';

const CWD = process.env.INIT_CWD;
const require = createRequire(CWD);

const localEnvPath = path.join(CWD, 'config/local-env.json');
const localEnvJson = require(localEnvPath);

const envContentFile = Object.entries(localEnvJson).reduce(
  (accValue, [key, value]) => {
    accValue += `${key}=${value}\n`;
    return accValue;
  },
  ''
);

const envPath = path.join(CWD, '.env');

await fs.writeFile(envPath, envContentFile);
