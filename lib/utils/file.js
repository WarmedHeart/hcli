const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const log = require('./log');

const handleEjsToFile = async (name, dest, template, fileName) => {
  // 1. 获取模板引擎.ejs
  const tempaltePath = path.resolve(__dirname, template);

  // 2. 解析模板引擎 result
  const middleLineName = name.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('-').toLowerCase();
  const lowerName = name.toLowerCase();
  const storeName = name[0].toLowerCase() + name.substring(1) + 'Store';
  const result = await ejsCompile(tempaltePath, { name, lowerName, middleLineName, storeName });
  
  // 3. 判断文件路径是否存在，不存在创建
  mkdirSync(dest);
  
  // 4. 将result写入文件
  const targetPath = path.resolve(dest, fileName);
  writeFile(targetPath, result);
}

const ejsCompile = (templatePath, data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, options, (err, str) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(str);
    })
  })
}

const writeFile = (path, content) => {
  if(fs.existsSync(path)) {
    log.error('the file already exists~');
    return;
  }
  return fs.promises.writeFile(path, content);
}

const mkdirSync = (dirname) => {
  if(fs.existsSync(dirname)) {
    return true;
  } else {
    if(mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = {
  handleEjsToFile
}