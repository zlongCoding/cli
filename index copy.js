#!/usr/bin/env node 

const fs = require('fs');
const loadPerfConfig = require("./scripts/loadConfig").loadPerfConfig
const program = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
// loadPerfConfig()
let newProjectName = ''
program.version('1.0.0', '-v, --version')
    .command('init <name>')
    .action((name) => {

        if(!fs.existsSync(name)){
            newProjectName = name
            inquirer.prompt([
                {
                    name: 'description',
                    message: '请输入项目描述'
                },
                {
                    name: 'author',
                    message: '请输入作者名称'
                }
            ]).then((answers) => {
                const spinner = ora('正在下载模板...');
                spinner.start();
                download('direct:https://gitee.com/zllong_892/template-cli.git', name, {clone: true}, (err) => {
                    if(err){
                        spinner.fail();
                        console.log(chalk.red(err));
                    }else{
                        spinner.succeed();
                        const fileName = `${name}/package.json`;
                        const meta = {
                            name,
                            description: answers.description,
                            author: answers.author
                        }
                        if(fs.existsSync(fileName)){
                            const content = fs.readFileSync(fileName).toString();
                            const result = handlebars.compile(content)(meta);
                            fs.writeFileSync(fileName, result);
                        }
                        console.log(chalk.green('项目初始化完成'));
                    }
                })
            })
        }else{
            // 错误提示项目已存在，避免覆盖原有项目
            console.log( chalk.red('项目已存在'));
        }
    })
program.parse(process.argv);