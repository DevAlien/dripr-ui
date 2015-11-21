import fs from 'graceful-fs';
import pathFn from 'path';

function mkdirs(path) {
  if (fs.existsSync(path)) return;

  let parent = pathFn.dirname(path);

  if (!fs.existsSync(parent)) {
    mkdirs(parent);
  }

  fs.mkdirSync(path);
}

export default mkdirs;
