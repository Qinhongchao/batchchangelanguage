#!/usr/bin/env node



var program = require('commander');
const pkg = require("../package.json");
const fs = require("fs");
const path = require("path");
program
    .version(pkg.version, '-v, --version')
    .command("generate [sourcePath] [langConfigPath]")
    .option('-c, --config [value]', 'An optional value')
    .alias('g')
    .description('根据配置替换中英文')
    .action(function (sourcePath, langConfigPath = './src/pages', cmd) {
        let configPath = path.resolve(process.cwd(), langConfigPath);
        let getSourcePath = path.resolve(process.cwd(), sourcePath);
        console.log(getSourcePath,"oooooooooooooooooooooooooooooo");
        let config = require(configPath);
        let configKeys=Object.keys(config);
            fs.readFile(getSourcePath, function (err, content) {
                // console.log(content, "--------------0000");
                let str=content.toString();
                let res='';
                for(let key of configKeys){
                    let reg=new RegExp(`\\w+\\s{0,}=+\\s{0,}["|']${config[key]}\\s{0,}["|']`);
                    res+=str.replace(reg,a=>{
                        let _list=a.replace(/\s/g,'').split('=');
                        return `:${_list[0]}="$t('${key}')"`
                    });
                    str=res;
                };
                    let fileName=path.parse(getSourcePath);
                    let generatePath=sourcePath.split("/");
                        generatePath.pop()
                        try {
                            fs.writeFileSync(`${generatePath.join("/")}/${fileName.name}-copy.vue`, ` ${str}`)
                        } catch (error) {
                            console.log(`${entry}/${sourcePath}文件夹不存在`.error);
                            process.exit(0)
                        }
                        process.exit(1)
            })

    })

program.parse(process.argv);