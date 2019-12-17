<template>
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
  !this.$store.state["rbntest"] &&
    this.$store.registerModule("rbntest", storeConf.default());
},
mounted() {
  this.pageNum !== 1 &&
    this.$refs.customTable.$emit("setCurrentPage", this.pageNum || 1);
},
// beforeRouteLeave(to, from, next) {
//   this.$store.unregisterModule("rbntest");
//   next();
// },
destroyed() {
  this.$store.unregisterModule("rbntest");
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
  ...mapState("rbntest", [
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
  ...mapActions("rbntest", ["asyncSetTableData"]),
  ...mapMutations("rbntest", ["setByKey"]),
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
</script>