#!/usr/bin/env node
// http://m.sohu.com/a/275486462_495695
//  https://blog.csdn.net/qq_26733915/article/details/80461257
// const camelToKebabCase = require("camel-to-kebab"); //驼峰转中划线

// console.log(camelToKebabCase("HelloWorld"));

var colors = require('colors');
colors.setTheme({
    info: 'green',
    help: 'cyan',
    input: 'grey',
    warn: 'yellow',
    success: 'blue',
    error: 'red'
});
var program = require('commander');
const shell = require("shelljs")
const pkg = require("../package.json");
const fs = require("fs");
const path = require("path");
var inquirer = require('inquirer')
let {
    generateForm,
    generateVuex,
    generateIndexVue
} = require("../until/index.js");
program
    .version(pkg.version, '-v, --version')
    .command("generate [outputPath] [entryPath]")
    .option('-c, --config [value]', 'An optional value')
    .alias('g')
    .description('根据模板对象生成表单默认生成.vue文件')
    .action(function (outputPath, entryPath = './src/pages', cmd) {
        // console.log(entryPath, "oooooooooooooooooooooooooooooo");
        let configPath = path.resolve(process.cwd(), entryPath, cmd.config);
        let config = require(configPath);
        // console.log(config, "---------------------");
        let entry = path.resolve(process.cwd(), entryPath);
        // console.log(outputPath)
        if (fs.existsSync(entry)) {
            fs.readdir(entry, function (err, files) {
                console.log(files, "--------------0000");
                if (err) {
                    console.log('文件夹不存在!请检查...'.error)
                    process.exit(1)
                } else {
                    let isExt = fs.existsSync(path.resolve(__dirname, entry, outputPath));
                    // console.log(isExt, outputPath, fs.existsSync(path.resolve(__dirname, entry, outputPath)), "---------------");
                    if (isExt) {
                        console.log(`文件${entry}/${outputPath}已经存在!请慎重选择`.warn);
                        inquirer.prompt([{
                            type: 'input',
                            name: 'fileName',
                            message: '请输入新的文件名称:',
                        }]).then(r => {
                            console.log('文件生成中...'.help)
                            let extString = r.fileName.split(".").length > 1 ? r.fileName : (r.fileName + '.vue');
                            let file = path.resolve(process.cwd(), entry, outputPath, "../", extString);
                            let [re, script] = generateForm(config);
                            fs.writeFileSync(file, `<template><div> ${re} </div></template>${script}`)
                            console.log(`文件创建成功!路径${file}`.success)
                            process.exit(1)
                        })
                    } else {
                        console.log('文件生成中...'.help)
                        let [re, script] = generateForm(config);
                        try {
                            fs.writeFileSync(`${entry}/${outputPath}`, `<template> ${re}</template>${script}`)
                        } catch (error) {
                            console.log(`${entry}/${outputPath}文件夹不存在`.error);
                            process.exit(0)
                        }
                        console.log(`文件创建成功!路径${entry}/${outputPath}`.success);
                        process.exit(1)

                    }
                }
            })
        } else {
            console.log("文件不存在！".error);
            process.exit(1)
        }

    })
program
    .command("generate [outputPath] [entryPath]")
    .option('-c, --config [value]', 'An optional value')
    .alias('gvuex')
    .description('根据模板对象生成vuex,默认生成.js')
    .action(function (outputPath, entryPath = "./src/pages", cmd) {
        // console.log(cmd.config, "oooooooooooooooooooooooooooooo");
        let configPath = path.resolve(process.cwd(), entryPath, cmd.config);
        let config = require(configPath);
        // console.log(config, "---------------------");
        let entry = path.resolve(process.cwd(), entryPath);
        // console.log(outputPath)
        if (fs.existsSync(entry)) {
            fs.readdir(entry, function (err, files) {
                if (err) {
                    console.log('文件夹不存在!请检查...'.error)
                    process.exit(1)
                } else {
                    let isExt = fs.existsSync(path.resolve(__dirname, entry, outputPath));
                    if (isExt) {
                        console.log(`文件${entry}/${outputPath}已经存在!请慎重选择`.warn);
                        inquirer.prompt([{
                            type: 'input',
                            name: 'fileName',
                            message: '请输入新的文件名称:',
                        }]).then(r => {
                            console.log('文件生成中...'.help)
                            let vuex = generateVuex(config);
                            let extString = r.fileName.split(".").length > 1 ? r.fileName : (r.fileName + '.js');
                            let file = path.resolve(process.cwd(), entry, outputPath, "../", extString);
                            fs.writeFileSync(file, vuex)
                            console.log(`文件创建成功!路径${file}`.success)
                            process.exit(1)
                        })
                    } else {
                        console.log('文件生成中...'.help)
                        let vuex = generateVuex(config);
                        try {
                            fs.writeFileSync(`${entry}/${outputPath}`, vuex)
                        } catch (error) {
                            console.log(`${entry}/${outputPath}文件夹不存在`.error)
                            process.exit(0)
                        }
                        console.log(`文件创建成功!路径${entry}/${outputPath}`.success);
                        process.exit(1)
                    }
                }
            })
        } else {
            console.log("文件不存在！");
            process.exit(1)
        }

    })



program
    .command("generate  [entryPath]")
    .option('-c, --config [value]', 'An optional value')
    .option('-sn, --storeName [value]', 'An optional value')
    .alias('gall')
    .description('根据模板对象生成vuex,默认生成.js')
    .action(function (entryPath = "./src/pages", cmd) {
        console.log(cmd.storeName);
        let entry = path.resolve(process.cwd(), entryPath);
        let configPath = path.resolve(process.cwd(), entryPath, cmd.config);
        let config = require(configPath);
        let search = generateForm(config);
        let store = generateVuex(config);


        let allFilesName = [{
            name: "search.vue",
            data: search
        }, {
            name: "store.js",
            data: store
        }];
        allFilesName.forEach(item => {
            fs.writeFileSync(`${entry}/${item.name}`, item.name.includes(".vue") ? `<template>${item.data[0]}</template>${item.data[1].replace(/path/g, cmd.storeName)}` : item.data);
            console.log(`文件创建成功!路径${entry}/${item.name}`.success);
        })
        console.log(path.resolve());
        // fs.copyFileSync('ajax.js', `${entry}/ajax.js`);
        // console.log(`文件创建成功!路径${entry}/ajax.js`.success);
        fs.writeFileSync(`${entry}/index.vue`, generateIndexVue(cmd.storeName))
        console.log(`文件创建成功!路径${entry}/index.vue`.success);

        process.exit(1)
    })

program.parse(process.argv);