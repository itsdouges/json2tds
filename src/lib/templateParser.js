import fs from 'fs';
import _ from 'lodash';

const defaultTemplate = {
  id: '{1930BBEB-7805-471A-A3BE-4858AC7CF696}',
  name: 'Standard Template',
  icon: 'Applications/16x16/form_blue.png',
};

const navigationItemTemplate = {
  id: '{9A323321-593C-4C34-ABB9-DD140578AF02}',
  name: 'Navigation Item',
  icon: 'Control/32x32/button_b_h.png',
  fields: [{
    id: '{D5079DF8-11B4-47E4-AFE8-F2548054C4DF}',
    name: 'Link Item',
  }],
};

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

  // find folder of template name
  const fieldFolder = `test/templates/Navigation Item/Content/`;
  const files = fs.readdirSync(fieldFolder);
  files.forEach((file) => {
    const fileData = fs.readFileSync(`${fieldFolder}${file}`, 'utf8').toString().replace(/\r\n/g, ',').split(/----\S+----,/);;
    const metaData = fileData[1].split(',');
    const fieldData = {};
    metaData.forEach((row) => {
      if (row) {
        const keyValuePair = row.split(': ');
        const key = keyValuePair[0];
        const value = keyValuePair[1];

        if (key && value) {
          fieldData[_.camelCase(key)] = value;
        }
        else {
          fieldData.value = key;
        }
      }
    });
    itemJson.fields.push({
      ...fieldData,
    })
  });

  return itemJson;

}
