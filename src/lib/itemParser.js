import fs from 'fs';
import _ from 'lodash';

export default function parseItem(path) {
  const data = fs.readFileSync(path, 'utf8');
  const fieldsString = data.toString().replace(/\r?\n/g, ',').split(/----\S+----,/);
  const jsonFields = [];

  fieldsString.forEach((field) => {
    const listOfValues = field.split(',');
    const fields = {};
    listOfValues.forEach((row) => {
      if (row) {
        const [key, value] = row.split(': ');
        if (key && value) {
          fields[_.camelCase(key)] = value;
        } else {
          fields.value = key;
        }
      }
    });

    jsonFields.push(fields);
  });

  const [baseData] = jsonFields.filter(field => !!field.database);
  const itemJson = {
    ...baseData,
  };

  jsonFields.slice(2).forEach((field) => {
    if (field.key) {
      itemJson[_.camelCase(field.key)] = field.value;
    }
  });

  return itemJson;
}
