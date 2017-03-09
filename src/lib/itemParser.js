import fs from 'fs';

export default function parseItem(path) {

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
          fields[key] = value;
        }
        else {
          fields['value'] = key;
        }
      }
    });
	  jsonFields.push(fields);
    console.log(jsonFields);
  });

  return {
    id: '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}',
    name: 'Home',
    path: '/sitecore/content/Home',
    icon: 'Applications/16x16/form_blue.png',
  };
}
