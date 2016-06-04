# find-rc
Find a .rc file given a name

### `(filename, [startDir], callback)`

- `filename` - name of file you are looking for.  Example: `.labrc`
- `startDir` - (optional) directory to start looking for the file.  Defaults to `process.cwd`
- `callback` - callback function to receive result.  Signature is `(err, filePath)`

Example

```js
const FindRc = require('find-rc');

FindRc('.labrc', (err, filePath) => {
  if (filePath) {
    // load file and parse configuration
  }
});
```
