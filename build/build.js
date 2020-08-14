'use strict';
require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('生产构建中...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
        chunks: false,
        chunkModules: false,
      }) + '\n\n'
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('  因为错误发生, 构建失败.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  构建完成. 所有文件位于 /dist 中.\n'));
    console.log(
      chalk.yellow(
        '  提示: 构建完的文件必须放置在 http 服务器中, 以访问.\n' +
          '  在本地直接打开index.html将无效.\n'
      )
    );
    console.log(
      chalk.cyan('  提示: 可以通过运行 npm run web 来建立一个简单的 http 服务器以访问.\n')
    );
  });
});
