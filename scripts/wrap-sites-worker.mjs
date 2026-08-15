import { rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const serverDirectory = join(process.cwd(), 'dist', 'server');
const workerEntry = join(serverDirectory, 'index.js');
const applicationEntry = join(serverDirectory, 'application-handler.js');

await rename(workerEntry, applicationEntry);
await writeFile(
  workerEntry,
  `import handler from './application-handler.js';\n\nexport default {\n  fetch(request, environment, context) {\n    return handler(request, environment, context);\n  }\n};\n`,
  'utf8'
);
