// @flow

import fs from 'fs';
import path from 'path';
import generateItem from './lib/itemGenerator';

const argv = require('yargs')
  .string('dist')
  .string('src')
  .argv;

const {
  dist: destination,
  src: source,
} = argv;

function readAllFiles(src) {
  const sourcePath = path.resolve(__dirname, '..', src);

  const files = fs.readdirSync(sourcePath).sort();

  // eslint-disable-next-line
  return files.map(file => require(path.resolve(sourcePath, file)));
}

function generate() {
  const files = readAllFiles(source);
  files.forEach(file => generateItem(file, { destination }));
}

generate();
