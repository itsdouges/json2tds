export default function parseItem(path) {

  const cleanFile = clean(path);
  const fieldsString = cleanFile.split('/\n----\S+----,/');
  fieldString.forEach((field) => {
    const listofValues = field.split(',');
  });

  return {
    id: '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}',
    name: 'Home',
    path: '/sitecore/content/Home',
    icon: 'Applications/16x16/form_blue.png',
  };
}

clean = (file) => {
  return (file.replace('\n\n', '\n')).replace('\n', ',\n');
}
