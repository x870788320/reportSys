import { get, post } from "./axios"
console.log(post)

//参数格式化
const paramsFormat = params => Object.keys(params).reduce((pre,key,index,arr) =>
    `${!index? '?': ''}${pre}${key}=${params[key]}${((arr.length - 1) > index)? '&': ''}`, '')


//区域数据
export const getQYInfo = df => get(`/sft/org/resporder/liststat/qy?df=${df}`)

//行业  ttp://127.0.0.1:7778/sft/org/resporder/liststat/hy?hy=%E5%BB%BA%E6%9D%90&df=1
export const getHYList = params => get("/sft/org/resporder/list/hy?page=1&limit=10", params)
export const getHYInfo = params => get(`/sft/org/resporder/liststat/hy${paramsFormat(params)}`)

//镇街  http://127.0.0.1:7778/sft/org/resporder/liststat/zj?zj=%E4%B8%B4%E7%A9%BA%E7%BB%8F%E6%B5%8E%E6%A0%B8%E5%BF%83%E5%8C%BA&df=1
export const getZJList = params => get("/sft/org/resporder/list/zj?page=1&limit=10", params)
export const getZJInfo = params => get(`/sft/org/resporder/liststat/zj${paramsFormat(params)}`)



//map   http://127.0.0.1:7778/sft/org/com/all?page=1&limit=10
export const getCompanyInfo = params => get(`/sft/org/com/all?page=1&limit=10`, params)

//企业信息 http://192.168.1.116:7778/sft/org/resporder/liststat/60/4
export const getQYInfoFrom60 = params => get(`/sft/org/resporder/liststat/${params.id}/${params.df}`)
// {hy:data.name,df:df}