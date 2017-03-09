const defaultTemplate = {
  id: '{1930BBEB-7805-471A-A3BE-4858AC7CF696}',
  name: 'Standard Template',
  icon: 'Applications/16x16/form_blue.png',
};

export default function parseTemplate(path) {
  return {
    ...defaultTemplate,
  };
}
