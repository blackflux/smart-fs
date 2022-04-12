import fs from 'fs';
import dirname from './logic/dirname.js';
import filename from './logic/filename.js';

import guessFile from './logic/guess-file.js';
import walkDir from './logic/walk-dir.js';
import cleaningDelete from './logic/cleaning-delete.js';

import smartParse from './logic/smart-parse.js';
import smartRead from './logic/smart-read.js';
import smartWrite from './logic/smart-write.js';

export default {
  ...fs,

  dirname,
  filename,

  guessFile,
  walkDir,
  cleaningDelete,

  smartParse,
  smartRead,
  smartWrite
};
