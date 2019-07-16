const fs = require('fs');

const builders = [
  'browser',
  'dev-server',
  'karma',
  'server',
];

for (const builder of builders) {
  const src = `./node_modules/@angular-devkit/build-angular/src/${builder}/schema.json`;
  const dest = `./dist/nyan-builder/${builder}/schema.json`;

  fs.copyFileSync(src, dest);
}
