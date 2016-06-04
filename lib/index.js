'use strict';

const Fs = require('fs');
const Path = require('path');


const internals = {};


module.exports = function (appname, startDir) {
  const dirPaths = internals.dirPaths(startDir || process.cwd(), `.${appname}rc`);
  const homePaths = internals.homePaths(appname);

  // Didn't find in the parent folders, try at home next
  return internals.checkPaths(dirPaths) || internals.checkPaths(homePaths);
};


internals.checkPaths = function (paths, index) {
  index = index || 0;
  if (internals.isFile(paths[index])) {
    return paths[index];
  }

  if (++index === paths.length) {
    return;
  }

  return internals.checkPaths(paths, index);
};


internals.isFile = function (filePath) {
  try {
    const stat = Fs.statSync(filePath);
    return stat.isFile();
  } catch (err) {
    return false;
  }
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
