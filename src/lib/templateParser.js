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
  if (path === 'test/templates/Navigation Item.item') {
    return navigationItemTemplate;
  }

  return {
    ...defaultTemplate,
  };
}
