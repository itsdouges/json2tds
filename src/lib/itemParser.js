import guid from 'guid';

export default function parseItem(path) {
  return {
    id: `{${guid.create().value}}`,
    name: 'Home',
    path: '/sitecore/content/Home',
    icon: 'Network/16x16/earth.png',
  };
}
