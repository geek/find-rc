'use strict';

const Fs = require('fs');
const Path = require('path');


module.exports = function (filename, startDir, callback) {
  if (typeof startDir === 'function') {
    callback = startDir;
    startDir = process.cwd();
  }

  const filePath = Path.join(startDir, filename);
  Fs.stat(filePath, (err, stat) => {
    if (stat && stat.isFile()) {
      return callback(null, filePath);
    }

    if (Path.dirname(filePath) === Path.sep) {
      return callback(new Error(`${filename} not found`));
    }

    module.exports(filename, Path.dirname(startDir), callback);
  });
};
