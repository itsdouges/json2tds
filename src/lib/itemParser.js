import fs from 'fs';

export default function parseItem(path) {

  const data = fs.readFileSync(path, 'utf8')
  const fieldsString = data.toString().replace('\n', ',\n').split('/----\S+----,/');

  console.log(fieldsString);
  console.log('LENGTH', fieldsString.length);

  const jsonFields = [];
  fieldsString.forEach((field) => {
    const listOfValues = field.split(',');
    const fields = {};
    listOfValues.forEach((row) => {
      const keyValuePair = row.split(': ');
      const key = keyValuePair[0];
      const value = keyValuePair[1];
      fields[key] = value;
    });
	  jsonFields.push(fields);
  });

  return {
    id: '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}',
    name: 'Home',
    path: '/sitecore/content/Home',
    icon: 'Applications/16x16/form_blue.png',
  };
}
