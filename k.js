let list = [{
        key: [],
        total: 0
    }, {
        type: 'radio',
        options: {
            formItemLabel: "单选",
            label: 1,
            VModel: 'res',
            VModelDefaultValue: "string",
            text: '显示的内容required'
        }
    }, {
        type: 'checkbox',
        options: {
            formItemLabel: "多选",
            label: [1, 2],
            VModel: 'checkbox',
            VModelDefaultValue: [],
            text: '显示的内容required',
            enterKeyEvent: false,
            group: false
        }
    },
    {
        type: 'input',
        options: {
            formItemLabel: "input",
            VModel: 'input',
            VModelDefaultValue: false,
            enterKeyEvent: "handleSubmit",
            placeholder: '显示的内容required',
            clearable: true,
            type: 'textarea'
        }
    },
    {
        type: 'select',
        options: {
            formItemLabel: "select",
            VModel: 'select',
            VModelDefaultValue: [],
            enterKeyEvent: "handleSubmit",
            placeholder: '显示的内容required',
            clearable: true,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '黄金糕2'
            }],
        }
    },
    {
        type: 'switch',
        options: {
            formItemLabel: "switch",
            VModel: 'switch',
            VModelDefaultValue: true,
            enterKeyEvent: "handleSubmit",
        }
    }

];
// const tool = require('../until/tool.js');

// let yu = list.map(item => {
//     if (item.type) {
//         return [item.options.VModel, item.options.VModelDefaultValue]
//     }
//     return item
// }).reduce((add, current) => {
//     if (tool.getType(current) == 'Array') {
//         //针对表单进行vuex生成
//         add.state.form[current[0]] = ["Number", 'Array', 'Boolean'].includes(tool.getType(current[1])) ? current[1] : current[1] && `"'${current[1]}'"` || "''";
//         add.mutations[`set${tool.firstLetterToUpperCase(current[0])}`] = `
//             function(state, data) {
//             state.form.${current[0]} = data}`.replace(/(\r|\t|\n)/g, '')
//     } else {
//         //针对普通的对象生成vuex
//         Object.entries(current).map(item => {
//             add.state[item[0]] = ["Number", 'Array', 'Boolean'].includes(tool.getType(item[1])) ? item[1] : item[1] && `"'${item[1]}'"` || "''";
//             add.mutations[`set${tool.firstLetterToUpperCase(item[0])}`] = `
//             function(state, data) {state.${item[0]} = data}`.replace(/(\r|\t|\n)/g, '')
//         })
//     }

//     return add
// }, {
//     namespaced: true,
//     state: {
//         form: {}
//     },
//     mutations: {}
// })
// yu.mutations.resetForm = 'function(state){state.form=JSON.parse(JSON.stringify(state.form))}'
// console.log(JSON.stringify(yu).replace(/(\r|\t|\n|\\r\\n|"|\\)/g, ''))
// let fs = require('fs')
// fs.writeFile("lk.js", "export default" + JSON.stringify(yu).replace(/(\r|\t|\n|\\r\\n|"|\\)/g, ''))
module.exports = list;