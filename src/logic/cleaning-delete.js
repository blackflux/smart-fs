import fs from 'fs';
import path from 'path';

export default (filepath) => {
  try {
    fs.unlinkSync(filepath);
    let cpath = filepath;
    while (cpath !== path.sep) {
      cpath = path.normalize(path.join(cpath, '..'));
      fs.rmdirSync(cpath);
    }
  } catch (e) {
    if (e.code !== 'ENOTEMPTY') {
      throw e;
    }
  }
};
