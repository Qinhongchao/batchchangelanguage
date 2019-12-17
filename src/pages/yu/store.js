import {
    ajaxGetList
} from './ajax';
let formCopy = {
    requestNo: '',
    crNo: '',
    subject: '',
    activityCnDisplayname: '',
    drafterName: '',
    architecture: '',
    program: '',
    source: '',
    operationTime: ''
}
export default () => {
    return {
        namespaced: true,
        state: {
            form: {
                requestNo: '',
                crNo: '',
                subject: '',
                activityCnDisplayname: '',
                drafterName: '',
                architecture: '',
                program: '',
                source: '',
                operationTime: ''
            },
            pageSize: 10,
            pageNum: 1,
            pageTotal: 0,
            sortType: 'asc',
            orderBy: 'carRoof',
            sortDefault: 'isdelete asc',
            tableData: []
        },
        mutations: {
            resetForm: function (state) {},
            setTableData: function (state, data = []) {
                state.tableData = data
            },
            setPageTotal: function (state, data) {
                state.pageTotal = data
            },
            setFormByKey: function (state, data = {}) {
                Object.keys(data).forEach(item => {
                    state.form[item] = data[item];
                })
            },
            setByKey: function (state, data = {}) {
                Object.keys(data).forEach(item => {
                    state[item] = data[item];
                })
            }
        },
        actions: {
            asyncSetTableData: async function ({
                commit,
                state
            }) {
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
                    orderBy: sortBy ? state.sortDefault + ',' + sortBy + ' ' + sortType + ',model_year_id' : state.sortDefault + ',model_year_id'
                };
                let {
                    list,
                    pageTotal
                } = await ajaxGetList(params);
                commit('setTableData', list);
                commit('setPageTotal', pageTotal);
            }
        },
        getters: {}
    }
}