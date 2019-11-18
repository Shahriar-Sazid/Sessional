const fs = require('fs');
const path = require('path');
const pug = require('pug');

module.exports.createClientPug = (dir, src, dest, fn) => {
  const jsFunctionString = pug.compileFileClient(
    path.join(dir, `/_views/${src}`),
    {
      name: fn
    }
  );
  fs.writeFileSync(path.join(dir, `/src/js/${dest}`), jsFunctionString);
};
