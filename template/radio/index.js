const tool = require('../../until/tool.js');
let template = require("art-template");

let view = require('./template.art');
template.defaults.imports.getType = (data) => Object.prototype.toString.call(data).replace(/(\[|\]|object|\s)/g, '');;
const generateRadio = (options, opt = {
    group: true,
    enterKeyEvent: false
}) => {
    let OPT = {
        ...opt,
        ...options
    };
    // console.log(OPT)
    return view({
        OPT
    });
};

// let s = {
//     label: true,
//     VModel: 'res',
//     text: '显示的内容required',
//     enterKeyEvent: "handleSubmit",
//     group: false,
// };
// let html = generateRadio(s)
// console.log(html)

module.exports = generateRadio