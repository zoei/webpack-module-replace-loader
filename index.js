const path = require('path');
const fs = require('fs');


function getReplacedResourcePath(resourcePath, options) {
  const { replacements = [], separator = '.' } = options || {};
  const { dir, name, ext }  = path.parse(resourcePath);
  let newResourcePath = resourcePath;
  for(r of replacements) {
    if (!r[1]) continue;
    newResourcePath = path.resolve(dir, `${name}${separator}${r[0]}${ext}`);
    if (fs.existsSync(newResourcePath)) break;
  }
  return newResourcePath;
}

module.exports = function(source) {
  this.cacheable && this.cacheable();
  const newResourcePath = getReplacedResourcePath(this.resourcePath, this.getOptions);
  if (newResourcePath === this.resourcePath) {
    return source;
  }
  try {
    return require(newResourcePath);
  } catch (e) {
    return source;
  }
};