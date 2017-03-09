import guid from 'guid';

export default function parseItem(path) {
  return {
    id: `{${guid.create().value}}`,
    name: 'Root',
    path: '/Root',
    icon: 'Network/16x16/earth.png',
  };
}
