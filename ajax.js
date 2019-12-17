//改文件是运行gall命令的时候要复制的文件
import axios from "@/axios"
import {
    formatTimeStamp
} from "@/util";
export const ajaxGetList = async params => {
    let {
        data
    } = await axios.post("/crdnconf/modelYear/batch/v1", params);
    console.log(data.list);
    let list = data.list.map(item => {
        return {
            ...item,
            updateDate: formatTimeStamp(item.updateDate)
        }
    });
    return Promise.resolve({
        list,
        pageTotal: data.total
    })
};
export const getItemById = id => axios.get('/crdnconf/modelYear/' + id);
export const updataItem = params => axios.put('/crdnconf/modelYear/update', params)
export const addItem = params => axios.post('/crdnconf/modelYear/add', params) import axios from "@/axios"
import {
    formatTimeStamp
} from "@/util";
export const ajaxGetList = async params => {
    let {
        data
    } = await axios.post("/crdnconf/modelYear/batch/v1", params);
    console.log(data.list);
    let list = data.list.map(item => {
        return {
            ...item,
            updateDate: formatTimeStamp(item.updateDate)
        }
    });
    return Promise.resolve({
        list,
        pageTotal: data.total
    })
};
export const getItemById = id => axios.get('/crdnconf/modelYear/' + id);
export const updataItem = params => axios.put('/crdnconf/modelYear/update', params)
export const addItem = params => axios.post('/crdnconf/modelYear/add', params)