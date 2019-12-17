const tool = require('../../until/tool.js');
let template = require("art-template");
let view = require('./template.art');
// template.defaults.htmlMinifierOptions = {
//     collapseWhitespace: true,
// };
template.defaults.imports.getType = (data) => Object.prototype.toString.call(data).replace(/(\[|\]|object|\s)/g, '');;
const generateRadio = (options, opt = {
    enterKeyEvent: false,
    placeholder: false,
    clearable: true,
    type: false,
    rules: false
}) => {
    let OPT = {
        ...opt,
        ...options
    };
    return view({
        OPT
    });
};

// let s = {
//     formItemLabel: "input",
//     VModel: 'input',
//     enterKeyEvent: "handleSubmit",
//     placeholder: '显示的内容required',
//     clearable: false,
//     type: 'textarea',
// };
// let html = generateRadio(s)
// console.log(html);
module.exports = generateRadio