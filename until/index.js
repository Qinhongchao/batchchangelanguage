const tool = require('./tool.js');
const generateForm = (conf = []) => {
    let r = '';
    let script = {
        computed: {},
        methods: {},
    };
    let stateRrr = [];
    // let mutationsRrr = [];
    for (const item of conf) {
        //为了能够不仅生成表单的vuex,对type进行过滤(表单必须说明type,对没有type的对象默认为不是表单的字段，只引入不生成相应的计算属性)。但是生产生的模板只有表单。
        if (item.type) {
            let generate = require(`../template/${item.type}/index.js`);
            let tem = generate(item.options);
            //生成html模板
            r += tem.replace(/(\r|\n|\t|\s){2}/g, '');

            //生成script
            if (item.options.enterKeyEvent) {
                script.methods[item.options.enterKeyEvent] = `function() {}`;
            };
            script.methods.handleSearch = `function() {
                this.setByKey({
                    pageNum: 1
                  });
                this.$parent.$refs.customTable.$emit('setCurrentPage', 1);
                this.asyncSetTableData()
            }`.replace(/(\r|\n)/g, '');
            script.methods.handleReset = `function() {
                this.resetForm();
                this.setByKey({
                    pageNum: 1
                });
                this.$parent.$refs.customTable.$emit('setCurrentPage', 1);
                this.asyncSetTableData();
            }`.replace(/(\r|\n)/g, '');
            script.computed[item.options.VModel] = ` {
            get: function() {
                return this.form.${item.options.VModel}
            },
            set: function(val) {
                this.setFormByKey({${item.options.VModel}:val})
            }
        }`.replace(/(\r|\n)/g, '');
            // stateRrr.push(`'${item.options.VModel}'`)//不需要重复注入form里面的对象
            // mutationsRrr.push(`'set${tool.firstLetterToUpperCase(item.options.VModel)}'`)
            // console.log(stateRrr, "----------------")
        } else {
            //对不是表单的字段对象及行一层遍历,引入到相应的mapState，mapMutations里面。但模板中依然只有表单字段被引用。
            console.log(Object.entries(item), "--------------------------")
            Object.entries(item).map(item => {
                stateRrr.push(`'${item[0]}'`)
                    // mutationsRrr.push(`'set${tool.firstLetterToUpperCase(item[0])}'`)
            })
        }

    };
    //附加computed计算属性,生成mapstate
    script.computed.mapState = `...mapState('path',['form',${stateRrr}])`
        //添加mapMutations
    script.methods.mapMutations = `...mapMutations('path',['setFormByKey','setByKey','resetForm'])`
    script.methods.mapActions = `...mapActions('path', ['asyncSetTableData'])`
    script.mounted = `function(){this.asyncSetTableData();}`
    let s = `<script>
    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
    export default ${JSON.stringify(script).replace(/(\r|\t|\n|\\r\\n|")/g,'')} 
    </script>`
    let template = `<el-form  label-width="100px" size="mini">
    <div class="search-form">
    ${r}
     </div>
     <el-row :gutter="0">
     <el-col :span="24" style="text-align:center">
       <el-button @click="handleSearch" size="mini" type="primary">搜索</el-button>
       <el-button @click="handleReset" size="mini">重置</el-button>
     </el-col>
   </el-row>
    </el-form>`;
    // console.log("---------------")
    return [template, s]
};
const generateVuex = (list = []) => {
    if (!list || tool.getType(list) !== 'Array') {
        console.error('参数必须是数组对象!')
        return
    }
    let yu = list.map(item => {
        if (item.type) {
            return [item.options.VModel, item.options.VModelDefaultValue]
        }
        return item
    }).reduce((add, current) => {
        if (tool.getType(current) == 'Array') {
            //针对表单进行vuex生成
            add.state.form[current[0]] = ["Number", 'Array', 'Boolean'].includes(tool.getType(current[1])) ? current[1] : current[1] && `"'${current[1]}'"` || "''";
            // add.mutations[`set${tool.firstLetterToUpperCase(current[0])}`] = `
            //     function(state, data) {
            //     state.form.${current[0]} = data}`.replace(/(\r|\t|\n)/g, '')
        } else {
            //针对普通的对象生成vuex
            Object.entries(current).map(item => {
                add.state[item[0]] = ["Number", 'Array', 'Boolean'].includes(tool.getType(item[1])) ? item[1] : item[1] && `"'${item[1]}'"` || "''";
                // add.mutations[`set${tool.firstLetterToUpperCase(item[0])}`] = `
                // function(state, data) {state.${item[0]} = data}`.replace(/(\r|\t|\n)/g, '')
            })
        }

        return add
    }, {
        namespaced: true,
        state: {
            form: {}
        },
        mutations: {},
        actions: {},
        getters: {}
    });
    // yu.state.sortDefault = '';
    yu.actions.asyncSetTableData = `async function({commit,state}){
        let {
            form,
            pageSize,
            pageNum,
            sortType,
            sortBy,
            sortDefault
        } = state;
        let params = {
            model: form,
            pageSize,
            pageNum,
            orderBy: "sortBy ? state.sortDefault +',' + sortBy + ' ' + sortType + ',model_year_id' : state.sortDefault + ',model_year_id'"
        };
        let {list,pageTotal}=await ajaxGetList(params);
        commit('setTableData',list);
        commit('setPageTotal', pageTotal);
    }`.replace(/(\r|\t|\n|\\r\\n|"|\\)/g, '')
    yu.mutations.resetForm = 'function(state){}'
    yu.mutations.setTableData = `function(state,data=[]){state.tableData = data}`
    yu.mutations.setPageTotal = `function(state,data){state.pageTotal = data}`
    yu.mutations.setFormByKey = `function(state, data = {}) {
        Object.keys(data).forEach(item => {
            state.form[item] = data[item];
        })
    }`.replace(/(\r|\t|\n|\\r\\n|"|\\)/g, '')
    yu.mutations.setByKey = `function(state, data = {}) {
        Object.keys(data).forEach(item => {
            state[item] = data[item];
        })
    }`.replace(/(\r|\t|\n|\\r\\n|"|\\)/g, '')
    return ("import {ajaxGetList} from './ajax';" + "let formCopy=" + JSON.stringify(yu.state.form) + "export default ()=>{ return" + JSON.stringify(yu)).replace(/(\r|\t|\n|\\r\\n|"|\\)/g, '') + "}"
};
const generateIndexVue = (storeName) => {
    return `<template>
  <div >
    <!-- 搜索组件 -->
    <Search/>
    <!-- 主表格组件 -->
    <customTable :showAction='true' :defaultSort='defaultSort' @sortChange='sortChange' ref="customTable" :pageSize='pageSize' :pageTotal="pageTotal" @sizeChange="sizeChange" @currentChange="currentChange" :tableData="tableData" :tableProperty="tableProperty">
      <div slot="btn-group" slot-scope="scope">
      <el-tooltip content="编辑" effect="dark" placement="top">
          <el-button @click="edit(scope)" type="text" icon="el-icon-edit"></el-button>
        </el-tooltip>
      </div>
    </customTable>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { btoa } from "@/util";
import Search from "./search";
import customTable from "@/components/custom-table";
const orderByConfig = {
modelYear: "modelYear"
};
const sortTypeConfig = {
ascending: "asc",
descending: "desc"
};
let storeConf = require("./store.js");

export default {
beforeCreate() {
  !this.$store.state["${storeName}"] &&
    this.$store.registerModule("${storeName}", storeConf.default());
},
mounted() {
  this.pageNum !== 1 &&
    this.$refs.customTable.$emit("setCurrentPage", this.pageNum || 1);
},
// beforeRouteLeave(to, from, next) {
//   this.$store.unregisterModule("${storeName}");
//   next();
// },
destroyed() {
  this.$store.unregisterModule("${storeName}");
},
data() {
  return {
    id: null,
    tableProperty: [
      {
        label: "车型年",
        prop: "modelYear",
        sortable: "custom"
      },
      {
        label: "是否可用",
        prop: "isdelete"
      },
      {
        label: "最后更新人",
        prop: "updateBy"
      },
      {
        label: "最后更新时间",
        prop: "updateDate"
      }
    ]
  };
},
computed: {
  defaultSort() {
    return {
      prop: "modelYear",
      order: this.sortType
        ? this.sortType == "asc"
          ? "ascending"
          : "descending"
        : null
    };
  },
  ...mapState(["isAdd"]),
  ...mapState("${storeName}", [
    "pageSize",
    "pageNum",
    "sortType",
    "pageTotal",
    "sortBy",
    "tableData"
  ])
},
components: {
  Search,
  customTable
},

methods: {
  ...mapActions("${storeName}", ["asyncSetTableData"]),
  ...mapMutations("${storeName}", ["setByKey"]),
  edit(e) {
    console.log(e);
  },
  sortChange({ column, prop, order }) {
    console.log({ column, prop, order });
    this.setByKey({
      sortBy: prop && orderByConfig[prop],
      sortType: order && sortTypeConfig[order]
    });
    this.asyncSetTableData();
  },
  sizeChange({ pageSize, pageNum }) {
    //是否重置页码
    // this.$refs.customTable.$emit("setCurrentPage", 1);
    // this.pageNum = 1;
    //设定排序
    // this.$refs.customTable.$refs.customTable.sort(
    //   "operatorName",
    //   "descending"
    // );
    console.log(pageSize, pageNum, "sizeChange");
    this.setByKey({
      pageSize,
      pageNum
    });
    this.asyncSetTableData();
  },
  currentChange({ pageSize, pageNum }) {
    console.log(pageSize, pageNum, "currentChange");
    this.setByKey({
      pageSize,
      pageNum
    });
    this.asyncSetTableData();
  }
}
};
</script>`
}



module.exports = {
    generateForm,
    generateVuex,
    generateIndexVue
};