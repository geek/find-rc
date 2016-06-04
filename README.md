# find-rc
Find a `rc` file given a name.  Inspiration from [rc](https://github.com/dominictarr/rc).

The callback is executed on the first found file.  Here is the order that
folders will be searched:

1. Current directory
2. Parent of current directory, until the root folder is encountered
3. $HOME/.${apprc}
4. $HOME/.${app}/config
5. $HOME/.config/${app}
6. $HOME/.config/${app}/config
7. /etc/${app}rc
8. /etc/${app}.rc


### `(appname, [startDir], callback)`

- `appname` - name of file you are looking for.  Example: `lab`.  It will be formatted with `.{appname}rc`
- `startDir` - (optional) directory to start looking for the file.  Defaults to `process.cwd`
- `callback` - callback function to receive result.  Signature is `(err, filePath)`

Example

```js
const FindRc = require('find-rc');

FindRc('lab', (err, filePath) => {
  if (filePath) {
    // load file and parse configuration
  }
});
```
