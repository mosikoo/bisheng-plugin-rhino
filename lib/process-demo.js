const JsonML = require('jsonml.js/lib/utils');

function getCode(node) {
  return JsonML.getChildren(JsonML.getChildren(node)[0])[0];
}

module.exports = (markdownData) => {
  const { meta } = markdownData;
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-');

  const contentChildren = JsonML.getChildren(markdownData.content);

  const codeIndex = contentChildren.findIndex(node => (
    JsonML.getTagName(node) === 'pre' &&
    JsonML.getAttributes(node).lang === 'jsx'
  ));

  markdownData.content = contentChildren.slice(0, codeIndex);
  markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
  markdownData.rawCode = getCode(contentChildren[codeIndex]);

  return markdownData;
};
