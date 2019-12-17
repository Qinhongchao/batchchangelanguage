const tool = require('../../until/tool.js');
let template = require("art-template");
let view = require('./template.art');
// template.defaults.htmlMinifierOptions = {
//     collapseWhitespace: true,

// };
template.defaults.imports.getType = (data) => Object.prototype.toString.call(data).replace(/(\[|\]|object|\s)/g, '');;
const generateRadio = (options, opt = {
    group: true,
    enterKeyEvent: false
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
//     label: [1, 2],
//     VModel: 'res',
//     text: '显示的内容required',
//     enterKeyEvent: "handleSubmit",
//     group: false,
// };
// let html = generateRadio(s)
module.exports = generateRadio