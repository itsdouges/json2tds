import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';

// Inputs path: test/sitecore/content/Home match: *.csproj
// travels up tree until it finds an item
export default function findUpTree(startPath, extension) {
  let currentPath = startPath;
  let file;

  while (!file) {
    const files = fs.readdirSync(currentPath);

    for (let i = 0; i < files.length; i += 1) {
      const filePath = path.join(currentPath, files[i]);
      const stat = fs.lstatSync(filePath);

      if (!stat.isDirectory() && _.endsWith(filePath, extension)) {
        // eslint-disable-next-line
        return {
          data: fs.readFileSync(filePath).toString(),
          filePath: currentPath,
        };
      }
    }

    currentPath = currentPath.split('/').slice(0, -1).join('/');
  }

  throw new Error(`.scproj file was not found for ${startPath}`);
}
