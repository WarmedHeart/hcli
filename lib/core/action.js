const { promisify } = require('util');
const path = require('path');

const downloadRepo = promisify(require('download-git-repo'));

const repoConfig = require('../config/repo_config');
const terminal = require('../utils/terminal');
const { handleEjsToFile } = require('../utils/file');
const log = require('../utils/file');

/**
 * 创建项目
 * @param {*} projectName 项目名称
 * @param {*} otherArg 后续其他参数
 */
const createProject = async (projectName, otherArg) => {
  // 1. 提示信息
  log.hint('please wait a moment, install~');
  // 2. clone项目
  await downloadRepo(repoConfig.vueGitRepo, projectName, { clone: true });
  // 3. 执行npm install命令
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await terminal.spawn(npm, ['install'], { cwd: `./${projectName}`});
  // 4. 打开浏览器(交由webpack默认打开)

  // 5. 执行npm run start命令
  await terminal.spawn(npm, ['run', 'serve'], { cwd: `./${projectName}` });
};
/**
 * 创建组件
 * @param {*} name 组件名
 * @param {*} dest 生成目录
 */
const addComponent = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/vue-component.ejs', `${name}.vue`)
};

/**
 * 创建page页
 * @param {*} name 组件名
 * @param {*} dest 生成目录
 */
const addPage = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/vue-view.ejs', `${name}.vue`)
  handleEjsToFile(name, dest, '../template/vue-router.ejs', 'router.js')
  handleEjsToFile(name, dest, '../template/vue-store.ejs', 'store.js')
  handleEjsToFile(name, dest, '../template/vue-type.ejs', 'type.js')
}

module.exports = {
  createProject,
  addComponent,
  addPage
};
