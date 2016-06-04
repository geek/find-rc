'use strict';

const Code = require('code');
const Lab = require('lab');
const FindRc = require('../');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

it('finds an rc in the current working directory', (done) => {
  FindRc('find', (err, filePath) => {
    expect(err).to.not.exist();
    expect(filePath).to.exist();
    expect(filePath).to.contain('.findrc');
    done();
  });
});


it('finds a file in a parent directory', (done) => {
  FindRc('find', __dirname, (err, filePath) => {
    expect(err).to.not.exist();
    expect(filePath).to.exist();
    expect(filePath).to.contain('.findrc');
    done();
  });
});


it('reports an error when a file isn\'t found', (done) => {
  FindRc('no_way_will_this_exist', (err, filePath) => {
    expect(err).to.exist();
    expect(filePath).to.not.exist();
    done();
  });
});

it('reports an error when a file isn\'t found and env.USERPROFILE is set', (done) => {
  process.env.USERPROFILE = process.env.HOME;
  delete process.env.HOME;
  FindRc('no_way_will_this_exist', (err, filePath) => {
    expect(err).to.exist();
    expect(filePath).to.not.exist();
    done();
  });
});
