const program = require('commander');

const helpOptions = () => {
  program.option('-o --onself', 'a oneself option');

  program.option('-s --src <src>', 'a source folder');
  program.option('-d --dest <dest>', 'a destination folder, eg: -d src/pages, 错误/src/pages');
  program.option('-f --framework <framework>', 'your framework name');
  
}

module.exports = helpOptions;
