'use strict';

const Fs = require('fs');
const Path = require('path');


const internals = {};


module.exports = function (appname, startDir, callback) {
  if (typeof startDir === 'function') {
    callback = startDir;
    startDir = process.cwd();
  }

  const dirPaths = internals.dirPaths(startDir, `.${appname}rc`);
  internals.checkPaths(dirPaths, (err, filePath) => {
    if (!err && filePath) {
      return callback(null, filePath);
    }

    // Didn't find in the parent folders, try at home next
    return internals.findAtHome(appname, callback);
  });
};


internals.findAtHome = function (appname, callback) {
  const homePaths = internals.homePaths(appname);
  internals.checkPaths(homePaths, callback);
};


internals.checkPaths = function (paths, callback, index) {
  index = index || 0;
  internals.isFile(paths[index], (err, filePath) => {
    if (!err && filePath) {
      return callback(null, filePath);
    }

    if (++index === paths.length) {
      return callback(new Error('file not found in paths'));
    }

    internals.checkPaths(paths, callback, index);
  });
};


internals.isFile = function (filePath, callback) {
  Fs.stat(filePath, (err, stat) => {
    if (stat && stat.isFile()) {
      return callback(null, filePath);
    }

    return callback(err);
  });
};


internals.dirPaths = function (directory, filename) {
  const filePaths = [];

  do {
    filePaths.push(Path.join(directory, filename));
    directory = Path.dirname(directory);
  } while (directory !== Path.sep);

  return filePaths;
};


internals.homePaths = function (appname) {
  const home = process.env.USERPROFILE || process.env.HOME;
  return [
    Path.join(home, `.${appname}rc`),
    Path.join(home, `.${appname}`, 'config'),
    Path.join(home, '.config', appname),
    Path.join(home, '.config', appname, 'config'),
    Path.join('/etc', `${appname}rc`),
    Path.join('/etc', `${appname}.rc`)
  ];
};
