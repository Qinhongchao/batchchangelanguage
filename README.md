## element-form;是一个根据element ui主题，自动生成表单的工具。生成的表单可能需要进行适量的改动才能符合你的需求。

##  生成.vue：`element-form g page testx.vue --config page/k.js`
##  生成.js：`element-form gvuex page testx.js --config page/k.js`
## 生成.js和vue(针对crdn项目的特殊命令) element-form gall src/pages/FappConfig/F01CRconfig/14VPPS  --config conf.js --storeName VPPS
## type:radio | checkbox |input |select |switch | date-picker | switch;
<!-- 键最好是小驼峰命名 -->
## type:radio;
options: 

|   配置            |   说明        |   类型        |   是否必填    |   默认    |
|   -------         | -----:        | :----:        | :----:        | :----:  |
|  formItemLabel | el-form-item需要绑定的label值   |  string  |  Y  |    |
| label| el-radio需要绑定的label值,当类型为数组时，会进行循环输出   |  String,number,boolean,array |  Y  | |
| VModel | el-radio-group绑定的键值 | string | Y | | |
|VModelDefaultValue|VModel默认的值，生成vuex文件时会将其默认为对应state的值|any|N|空字符|
|group|是否使用单选框组(不建议更改)|boolean|N|true|
|text|当group为false时需要绑定到el-radio上的额label|any|group为false必填| |
|enterKeyEvent|是否通过enter键进行提交|Boolean,string|N|false
    options:{
        formItemLabel:[string],required
        label:[String|number|boolean|array],绑定的值 required
        VModel:string,选中绑定的值required,
        VModelDefaultValue:[any]default:string
        text:'',显示的内容required
        group:[boolean],是否是单选框组,default:true
        enterKeyEvent:[boolean,string],是否监听enter键进行提交。default:false
    }
## type:checkbox;
options: 

|   配置            |   说明        |   类型        |   是否必填    |   默认    |
|   -------         | -----:        | :----:        | :----:        | :----:  |
|  formItemLabel | el-form-item需要绑定的label值   |  string  |  Y  |    |
| label| el-checkbox绑定的键值  |  array |  Y  | |
| VModel | el-checkbox-group绑定的键值 | array | Y | | |
|VModelDefaultValue|VModel默认的值，生成vuex文件时会将其默认为对应state的值|array|Y|[]|
|group|是否使用多选框组(不建议更改)|boolean|N|true|
|enterKeyEvent|是否通过enter键进行提交|Boolean,string|N|false|
    options:{
        formItemLabel:[string],required
        label:[String|number|boolean],绑定的值 required
        VModel:'',选中绑定的值required,
        VModelDefaultValue:[any]default:string
        group:[boolean],是否是多选框组,default:true
        enterKeyEvent:[boolean,string],是否监听enter键进行提交。default:false
    }
## type:input;
options: 

|   配置            |   说明        |   类型        |   是否必填    |   默认    |
|   -------         | -----:        | :----:        | :----:        | :----:  |
|  formItemLabel | el-form-item需要绑定的label值   |  string  |  Y  |    |
| VModel | el-input绑定的键值 | string | Y | | |
|VModelDefaultValue|VModel默认的值，生成vuex文件时会将其默认为对应state的值|string|N|空字符串|
|placeholder|placeholder|string|N|空字符|
|enterKeyEvent|是否通过enter键进行提交|Boolean,string|N|false|
|rules|验证规则|array|N|[]|
|clearable|是否清空|boolean|N|true|
|type|H5表单类型| | | |
      options:{
        formItemLabel:[string],required
        VModel:'',选中绑定的值required,
        VModelDefaultValue:[any]default:string
        enterKeyEvent:[boolean,string],是否监听enter键进行提交。default:false
        placeholder:[string boolean] default:false
        clearable:[boolean]default:true
        type:[textarea,text,其他H5里面的] default '',
        rules:[Array],default:false
    }
## type:select;
options: 

|   配置            |   说明        |   类型        |   是否必填    |   默认    |
|   -------         | -----:        | :----:        | :----:        | :----:  |
|  formItemLabel | el-form-item需要绑定的label值   |  string  |  Y  |    |
| VModel | el-select绑定的键值 | string | Y | | |
|VModelDefaultValue|VModel默认的值，生成vuex文件时会将其默认为对应state的值|string|N|空字符串|
|placeholder|placeholder|string|N|空字符|
|enterKeyEvent|是否通过enter键进行提交|Boolean,string|N|false|
|rules|验证规则|array|N|[]|
|clearable|是否清空|boolean|N|true|
|options|el-option绑定的对象|array|Y||
 
    options:{
            formItemLabel:[string],required
            VModel:'',选中绑定的值required,
            VModelDefaultValue:[any]default:string
            enterKeyEvent:[boolean,string],是否监听enter键进行提交。default:false
            placeholder:[string boolean] default:false
            clearable:[boolean]default:true
            options:[{
                value: '选项1',required
                label: '黄金糕',required
            }] required,
            rules:[Array],default:false
        }
## type:switch;

|   配置            |   说明        |   类型        |   是否必填    |   默认    |
|   -------         | -----:        | :----:        | :----:        | :----:  |
|  formItemLabel | el-form-item需要绑定的label值   |  string  |  Y  |    |
| VModel | el-switch绑定的键值 | string | Y | | |
|VModelDefaultValue|VModel默认的值，生成vuex文件时会将其默认为对应state的值|boolean|N|true|
|enterKeyEvent|是否通过enter键进行提交|Boolean,string|N|false|

    options:{
            formItemLabel:[string],required
            VModel:'',选中绑定的值required,
            VModelDefaultValue:[any]default:string
            enterKeyEvent:[boolean,string],是否监听enter键进行提交default:false。
    }
## type:date-picker;

    options:{
            formItemLabel:[string],required
            VModel:'',选中绑定的值required,
            VModelDefaultValue:[any]default:string
            enterKeyEvent:[boolean,string],是否监听enter键进行提交default:false。
    }
