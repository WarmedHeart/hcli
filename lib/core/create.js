const program = require('commander');

const {
  createProject,
  addComponent,
  addPage
} = require('./action');

const createCommands = () => {
  // 创建项目指令
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a newly created directory')
    .action(createProject);
  
  program
    .command('addcpn <name>')
    .description('add vue component, eg: oneself addcpn NavBar [-d src/components]')
    .action(name => addComponent(name, program.opts().dest || 'src/components'));

  program
    .command('addview <name>')
    .description('add vue view, eg: oneself addpage Home [-d dest]')
    .action(name => addPage(name, program.opts().dest || `src/views/${ name.toLowerCase() }`));
};

module.exports = createCommands;