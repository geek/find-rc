'use strict';

const Code = require('code');
const Lab = require('lab');
const FindRc = require('../');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

it('finds a file in the current directory', (done) => {
  FindRc('package.json', (err, filePath) => {
    expect(err).to.not.exist();
    expect(filePath).to.exist();
    expect(filePath).to.contain('package.json');
    done();
  });
});


it('finds a file in a parent directory', (done) => {
  FindRc('package.json', __dirname, (err, filePath) => {
    expect(err).to.not.exist();
    expect(filePath).to.exist();
    expect(filePath).to.contain('package.json');
    done();
  });
});


it('reports an error when a file isn\'t found', (done) => {
  FindRc('.no_way_will_this_exist', (err, filePath) => {
    expect(err).to.exist();
    expect(filePath).to.not.exist();
    done();
  });
});
