import sitecoreItem from './sitecoreTemplates/contentItem.item'

export default ParseItem = (soureFile) => {
  const cleanFile = clean(sitecoreItem);
  const fieldsString = cleanFile.split('/\n----\S+----,/');
  fieldString.forEach((field) => {
    const listofValues = field.split(',');
    const blah = [
      "----blah----,",
      "id: {RANDOMGUID},",
      "database: master,",
      "path: /itemPath/itemName,",
      "parent: {PARENTGUID},",
      "name: itemName,",
      "master: {000}",
      "template: {TEMPLATEGUID},",
      "templatekey: templateName,",
    ];

  });
};


clean = (file) => {
  return (file.replace('\n\n', '\n')).replace('\n', ',\n');
}
