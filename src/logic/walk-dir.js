import fs from 'fs';
import path from 'path';

export default (dirpath) => {
  const result = [];

  const files = [dirpath];
  do {
    const filepath = files.pop();
    const stat = fs.lstatSync(filepath);
    if (stat.isDirectory()) {
      fs
        .readdirSync(filepath)
        .forEach((f) => files.push(path.join(filepath, f)));
    } else if (stat.isFile()) {
      result.push(path.relative(dirpath, filepath));
    }
  } while (files.length !== 0);

  return result;
};
