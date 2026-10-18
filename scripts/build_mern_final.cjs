const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../src/data/topics');
const mernPath = path.join(targetDir, 'mern.ts');

const mern1 = require('./build_mern.cjs');
