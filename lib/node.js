const path = require('path');
const processDemo = require('./process-demo');

module.exports = (markdownData, config = {}) => {
  const isDemo = /\/demo$/i.test(path.dirname(markdownData.meta.filename));
  if (isDemo) {
    return processDemo(markdownData, config);
  }

  return markdownData;
};
