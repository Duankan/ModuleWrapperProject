'use strict';

const config = require('../config/index');
const utils = require('./utils');
const os = require('os');
const path = require('path');
const fs = require('fs');
const util = require('util');
const archiver = require('archiver');
const yaml = require('js-yaml');

const mkdtemp = util.promisify(fs.mkdtemp);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);

/* 支持新的平台应用部署方式 */
(async function depoly() {
  try {
    const temp = await mkdtemp(path.join(os.tmpdir(), 'kproject-cli'));

    /* 部署入口文件 */
    const template = `- hosts: allsrv
  remote_user: root
  roles:
  - kproject-cli`;
    await writeFile(path.join(temp, 'kproject-cli.yml'), template);
    await mkdir(path.join(temp, 'kproject-cli'));

    const folder = path.join(temp, 'kproject-cli');
    await mkdir(path.join(folder, 'tasks'));
    await mkdir(path.join(folder, 'files'));
    await mkdir(path.join(folder, 'templates'));

    /* 创建tasks */
    const tasks = `- name: Copy kproject-cli to deployPath
  unarchive: src=kproject-cli.tar.gz dest=${config.build.deployPath}/kproject-cli owner=ktw group=ktw
- name: Copy config to configPath
  template: src=config.yml  dest=${config.build.deployPath}/kproject-cli/config owner=ktw group=ktw`;
    await writeFile(path.join(folder, 'tasks/main.yml'), tasks);

    /* 创建files */
    const output = fs.createWriteStream(path.join(folder, 'files/kproject-cli.tar.gz'));
    const tar = archiver('tar', {
      gzip: true,
    });
    tar.pipe(output);
    tar.file('index.html', { name: 'index.html' });
    tar.file('favicon.ico', { name: 'favicon.ico' });
    tar.directory(path.join(__dirname, '../dist/static/'), 'static');
    await tar.finalize();

    /* 创建templates */
    const kConfig = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, '../dist/config/k-config.yml'), 'utf8')
    );

    const kDepoly = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, '../src/config/system/k-config-depoly.yml'), 'utf8')
    );

    /* templates变量配置文件 */
    let str = '';
    const matched = {};
    for (const key in kDepoly) {
      if (kDepoly.hasOwnProperty(key)) {
        const element = kDepoly[key];
        matched[element.name] = element.type;
        str += Object.values(element).join(',') + os.EOL;
      }
    }

    /* 将替换完变量名的配置文件写入 */
    await writeFile(
      path.join(folder, 'templates/k-config.yml'),
      yaml.safeDump(utils.replaceMatched(kConfig, matched))
    );

    /* 将生成的配置文件模版写入 */
    await writeFile(path.join(temp, 'kproject-cli.text'), str);

    const deployPath = path.join(__dirname, '../dist/kproject-cli.tar.gz');
    try {
      /* 检查是否有之前生产的部署包 */
      const fstat = await stat(deployPath);
      await unlink(deployPath);
    } catch (error) {
    } finally {
      /* 生成最终部署包 */
      const deploy = fs.createWriteStream(deployPath);
      const tarGzip = archiver('tar', {
        gzip: true,
      });
      tarGzip.pipe(deploy);
      tarGzip.directory(`${temp}/`, false);
      await tarGzip.finalize();
    }
  } catch (error) {
    throw error;
  }
})();
