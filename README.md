# `npm install find-rc`

Find a `rc` file given a name.  Inspiration from [rc](https://github.com/dominictarr/rc).

[![Build Status](https://secure.travis-ci.org/geek/find-rc.svg)](http://travis-ci.org/geek/find-rc)


Here is the order that folders will be searched:

1. Current directory
2. Parent of current directory, until the root folder is encountered
3. $HOME/.${apprc}
4. $HOME/.${app}/config
5. $HOME/.config/${app}
6. $HOME/.config/${app}/config
7. /etc/${app}rc
8. /etc/${app}.rc


### `(appname, [startDir])`

- `appname` - name of file you are looking for.  Example: `lab`.  It will be formatted with `.{appname}rc`
- `startDir` - (optional) directory to start looking for the file.  Defaults to `process.cwd`

Example

```js
const FindRc = require('find-rc');

const filePath = FindRc('lab');
if (filePath) {
  // load file and parse configuration
  const rc = require(filePath);
}
```
