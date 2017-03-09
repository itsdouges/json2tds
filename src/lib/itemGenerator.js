import fs from 'fs';
import guid from 'guid';
import { DOMParser, XMLSerializer } from 'xmldom';
import _ from 'lodash';

import findUpTree from './findUpTree';

const parseDateTimeString = str => str.replace(/:/g, '').replace(/-/g, '').replace('Z', '').replace('.', ':');

const createKey = key => `----${key}----`;

const field = data => `${createKey('field')}
field: ${data.id}
name: ${data.name}
key: ${data.name.toLowerCase()}
content-length: ${data.contentLength}

${data.value || ''}`;

function addToProject(data, path, parentPath) {
  const { data: xml, filePath } = findUpTree(path, '.scproj');
  const parser = new DOMParser();
  const xmlDom = parser.parseFromString(xml, 'text/xml');

  const includeName = `${parentPath}/${data.name}.item`.replace(/\/+/g, '\\').replace('\\', '');

  const nodes = Array.from(xmlDom.getElementsByTagName('SitecoreItem'));

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];

    if (includeName === node.getAttribute('Include')) {
      // Exists, bail out!
      return;
    }
  }

  const newNodeString = `<SitecoreItem Include="${includeName}">
  <Icon>/temp/IconCache/${data.icon}</Icon>
  <ItemDeployment>DeployOnce</ItemDeployment>
  <ChildItemSynchronization>NoChildSynchronization</ChildItemSynchronization>
</SitecoreItem>
`;

  const newNode = parser.parseFromString(newNodeString, 'text/xml');

  // console.log(newNode);

  const lastNode = _.last(nodes);
  lastNode.parentNode.appendChild(newNode);
  // Ok doesnt exist, lets add it to project!

  const newXml = new XMLSerializer().serializeToString(xmlDom);
  fs.writeFileSync(filePath, newXml);
}

export default function itemGenerator(data, template, parent, {
  destination,
  revision,
  createdBy,
}) {
  const id = guid.create();
  const created = parseDateTimeString(new Date().toISOString());

  const item = `${createKey('item')}
version: 1
id: {${id.value}}
database: master
path: ${parent.path}/${data.name}
parent: ${parent.id}
name: ${data.name}
master: {00000000-0000-0000-0000-000000000000}
template: ${template.id}
templatekey: ${template.name}

${createKey('version')}
language: en
version: 1
revision: ${revision}

${field({
  id: '{06D5295C-ED2F-4A54-9BF2-26228D113318}',
  name: '__Icon',
  contentLength: template.icon.length,
  value: template.icon,
})}
${field({
  id: '{BA3F86A2-4A1C-4D78-B63D-91C2779C1B5E}',
  name: '__Sortorder',
  contentLength: 1,
  value: data.sortOrder || 0,
})}
${field({
  id: '{25BED78C-4957-4165-998A-CA1B52F67497}',
  name: '__Created',
  contentLength: created.length,
  value: created,
})}
${field({
  id: '{5DD74568-4D4B-44C1-B513-0AF5F4CDA34F}',
  name: '__Created by',
  contentLength: createdBy.length,
  value: createdBy,
})}
${field({
  id: '{8CDC337E-A112-42FB-BBB4-4143751E123F}',
  name: '__Revision',
  contentLength: revision.length,
  value: revision,
})}
${field({
  id: '{D9CF14B1-FA16-4BA6-9288-E8A174D4D522}',
  name: '__Updated',
  contentLength: created.length,
  value: created,
})}
${field({
  id: '{BADD9CF9-53E0-4D0C-BCC0-2D784C282F6A}',
  name: '__Updated by',
  contentLength: createdBy.length,
  value: createdBy,
})}
${field({
  id: '{001DD393-96C5-490B-924A-B0F25CD9EFD8}',
  name: '__Lock',
  contentLength: 5,
  value: '<r />',
})}
`;

  fs.writeFileSync(`${destination}/${data.name}.item`, item);

  addToProject({
    ...data,
    icon: template.icon,
  }, destination, parent.path);
}
