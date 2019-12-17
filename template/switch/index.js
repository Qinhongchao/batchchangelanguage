const tool = require('../../until/tool.js');
let template = require("art-template");
let view = require('./template.art');
template.defaults.imports.getType = (data) => Object.prototype.toString.call(data).replace(/(\[|\]|object|\s)/g, '');;
const generateRadio = (options, opt = {
    enterKeyEvent: false,
    VModelDefaultValue: true
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
//     formItemLabel: "switch",
//     VModel: 'switc23h',
//     VModelDefaultValue: true,
//     enterKeyEvent: "handleSubmit",
// };
// let html = generateRadio(s)
// console.log(html);
module.exports = generateRadio