import fs from 'fs';
import _ from 'lodash';

export default function parseTemplate(path) {
  const data = fs.readFileSync(path, 'utf8')
  const fieldsString = data.toString().replace(/\n/g, ',').split(/----\S+----,/);
  const jsonFields = [];

  fieldsString.forEach((field) => {
    const listOfValues = field.split(',');
    const fields = {};
    listOfValues.forEach((row) => {
      if (row) {
        const keyValuePair = row.split(': ');
        const key = keyValuePair[0];
        const value = keyValuePair[1];

        if (key && value) {
          fields[_.camelCase(key)] = value;
        }
        else {
          fields.value = key;
        }
      }
    });
    jsonFields.push(fields);
  });
  const itemJson = {
    ...jsonFields[1],
    fields: [],
  };
  jsonFields.slice(2).forEach((field) => {
    if (field.key) {
      itemJson[_.camelCase(field.key)] = field.value;
    }
  });

  const newPath = path.split('/');
  newPath.pop();
  const itemFolder = `${newPath.join('/')}/${itemJson.name}`;

  const contentFolders = fs.readdirSync(itemFolder).filter(folder => fs.statSync(itemFolder +"/"+ folder).isDirectory());

  contentFolders.forEach((fieldFolder) => {
    const files = fs.readdirSync(`${itemFolder}/${fieldFolder}`);
    files.forEach((file) => {
      const fileData = fs.readFileSync(`${itemFolder}/${fieldFolder}/${file}`, 'utf8')
        .toString().replace(/\r\n/g, ',').split(/----\S+----,/);
      const metaData = fileData[1].split(',');
      const fieldData = {};
      metaData.forEach((row) => {
        if (row) {
          const keyValuePair = row.split(': ');
          const key = keyValuePair[0];
          const value = keyValuePair[1];

          if (key && value) {
            fieldData[_.camelCase(key)] = value;
          } else {
            fieldData.value = key;
          }
        }
      });
      itemJson.fields.push({
        ...fieldData,
      });
    });
  });

  return itemJson;

}
