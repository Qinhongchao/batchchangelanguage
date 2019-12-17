// 平台：弹出框选择，单选，来源：【应用配置】【CR申请单配置】【项目配置】下"不删除"且"已发布"的"车型平台"集合

// 项目：弹出框选择，多选，来源：【应用配置】【CR申请单配置】【项目配置】下"不删除"且"已发布"的"车型代码"集合；若选择了平台，项目名称只能选择该平台下的数据

// 申请类型：下拉菜单（Local CR、Global CR.）

// 申请日期：时间区段查询，模糊查询
let list = [{
    type: 'input',
    options: {
        formItemLabel: "申请单编号",
        VModel: 'requestNo',
        enterKeyEvent: "handleSearch",
        clearable: true,
    }
},
{
    type: 'input',
    options: {
        formItemLabel: "CR号",
        VModel: 'crNo',
        enterKeyEvent: "handleSearch",
        clearable: true,
    }
},
{
    type: 'input',
    options: {
        formItemLabel: "主题",
        VModel: 'subject',
        enterKeyEvent: "handleSearch",
        clearable: true,
    }
},

{
    type: 'input',
    options: {
        formItemLabel: "当前节点",
        VModel: 'activityCnDisplayname',
        enterKeyEvent: "handleSearch",
        clearable: true,
    }
},
{
    type: 'input',
    options: {
        formItemLabel: "起草人",
        VModel: 'drafterName',
        enterKeyEvent: "handleSearch",
        clearable: true,
    }
},


{
    type: 'input',
    options: {
        formItemLabel: "平台",
        VModel: 'architecture',
        enterKeyEvent: "handleSearch",
        clearable: true,
    }
},
{
    type: 'input',
    options: {
        formItemLabel: "项目",
        VModel: 'program',
        enterKeyEvent: "handleSearch",
        clearable: true,
    }
},

{
    type: 'select',
    options: {
        formItemLabel: "申请类型",
        VModel: 'source',
        VModelDefaultValue: '',
        enterKeyEvent: "handleSubmit",
        clearable: true,
        options: [{
            value: 'Local CR',
            label: 'Local CR'
        }, {
            value: 'Global CR',
            label: 'Global CR'
        }],
    }
},
{
    type: 'input',
    options: {
        formItemLabel: "操作时间",
        VModel: 'operationTime',
        enterKeyEvent: "handleSubmit",
        clearable: true,
    }
},
{
    pageSize: 10,
    pageNum: 1,
    pageTotal: 0,
    sortType: "asc",
    orderBy: "carRoof",
    sortDefault: "isdelete asc",
    tableData: []
}

]
module.exports = list;