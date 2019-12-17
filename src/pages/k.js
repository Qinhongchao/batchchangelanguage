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
            VModel: 'switc23h',
            VModelDefaultValue: true,
            enterKeyEvent: "handleSubmit",
        }
    }

];
module.exports = list;