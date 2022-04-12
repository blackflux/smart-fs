import fs_ from 'fs';

import dirname_ from './logic/dirname.js';
import filename_ from './logic/filename.js';

import guessFile_ from './logic/guess-file.js';
import walkDir_ from './logic/walk-dir.js';
import cleaningDelete_ from './logic/cleaning-delete.js';

import smartParse_ from './logic/smart-parse.js';
import smartRead_ from './logic/smart-read.js';
import smartWrite_ from './logic/smart-write.js';

export const fs = fs_;

export const dirname = dirname_;
export const filename = filename_;

export const guessFile = guessFile_;
export const walkDir = walkDir_;
export const cleaningDelete = cleaningDelete_;

export const smartParse = smartParse_;
export const smartRead = smartRead_;
export const smartWrite = smartWrite_;

export default {
  ...fs_,

  dirname,
  filename,

  guessFile,
  walkDir,
  cleaningDelete,

  smartParse,
  smartRead,
  smartWrite
};
