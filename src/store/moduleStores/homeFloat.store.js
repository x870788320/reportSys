import { bottomList } from '@/resource/homeFloat.js'
import { getZJInfo, getZJList, getHYList, getHYInfo, getQYInfo } from '@/serve'
import { comstat, hystat, zjstat, zj_list, hy_list, hy_info, zj_info } from "@/resource/homeMockData.js";
// import { comstat, hystat, zjstat, zj_list, hy_list, hy_info, zj_info, other_info, testData2 } from "@/resource/homeMockData.js";

export default {
    name:'float',
    namespaced: true,//使用命名空间，这样只在局部使用

    state: {
        bottomList: bottomList,
        currentLeftSe: {},        //左边三个当前的选择项
        currentButtonModule: {},
        QYInfo: { comstat, hystat, zjstat },    //后台获取的表格数据
        ZJList: zj_list,                        //后台获取的镇街等数据
        HYList: hy_list,
        HYinfo: hy_info,
        ZJInfo: zj_info,
        echartsDatas:{
            zjstat,
            cavg: zj_info.cavg,
            list7avg: zj_info.list7avg,
            listmap: zj_info.listmap,
            hy_hystats: hy_info.hystats,
            zj_hystats: zj_info.hystats,
        },
        qy_zh_info: {}
    },

    mutations: {
        changeCurrentLeftSe( state, item ){
            state.currentLeftSe = item
            state.currentButtonModule = bottomList[item.name]
            console.log(state.currentLeftSe)
        },
        changeQYInfo(state, payload){
            state.QYInfo = payload
            state.echartsDatas = { ...state.echartsDatas, zjstat }
        },
        changeZJList(state, payload){
            state.ZJList = payload
        },
        changeHYList(state, payload){
            state.HYList = payload
        },
        changeHYinfo(state, payload){
            state.HYinfo = payload
            const { cavg, hystats:hy_hystats, listmap, list7avg } = payload
            state.echartsDatas = { ...state.echartsDatas, cavg, hy_hystats, listmap, list7avg }
        },
        changeZJinfo(state, payload){
            state.ZJInfo = payload
            const { cavg, hystats:zj_hystats, listmap, list7avg } = payload
            state.echartsDatas.zjstat = { ...state.echartsDatas, cavg, zj_hystats, listmap, list7avg }
        },
        changeQYZJInfo(state, payload){
            console.log(payload)
            state.qy_zh_info = payload
            console.log(state.qy_zh_info)
        }
    },

    actions: {
        //获取主体责任的表格数据
        async getQYInfo({ commit }, df = 1){
            // commit('changeQYInfo',other_info)
            const QYInfo = await getQYInfo(df)
            console.log('QYInfo', QYInfo)
            QYInfo.success && commit('changeQYInfo',QYInfo.t)
        },
        
        //获取镇街行业等
        async getZJList({ commit }){
            const ZJList = await getZJList()
            ZJList.success && commit('changeZJList',ZJList.t)
            
            const HYList = await getHYList()
            HYList.success && commit('changeHYList',HYList.t)
        },
        //获取行业图表数据等  ?zj=%E4%B8%B4%E7%A9%BA%E7%BB%8F%E6%B5%8E%E6%A0%B8%E5%BF%83%E5%8C%BA&df=1
        async getHyInfo({ commit }, params){
            // commit('changeHYinfo',testData2)
            let def = {hy: '%E5%85%B6%E4%BB%96', df: 1, batchId: 2}
            const HYInfo = await getHYInfo({...def, ...params})
            // console.log('HYInfo', JSON.parse(JSON.stringify(HYInfo.t)))
            HYInfo.success && commit('changeHYinfo',HYInfo.t)
            
        },
        //获取镇街图表数据等
        async getZJInfo({ commit }, params){
            let def = {zj: '%E4%B8%B4%E7%A9%BA%E7%BB%8F%E6%B5%8E%E6%A0%B8%E5%BF%83%E5%8C%BA', df: 1, batchId: 2}
            const ZJInfo = await getZJInfo({...def, ...params})
            // console.log('ZJInfo', JSON.parse(JSON.stringify(ZJInfo.t)))
            ZJInfo.success && commit('changeZJinfo',ZJInfo.t)
        },
    },
    getters: {

    }

}