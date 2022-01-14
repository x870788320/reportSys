import { getCompanyInfo, getQYInfoFrom60 } from '@/serve'
import { company_info, qyDataFrom60 } from "@/resource/homeMockData.js";

export default {
    name:'map',
    namespaced: true,//使用命名空间，这样只在局部使用

    state: {
        companyInfo: company_info,
        QYInfoFrom60: qyDataFrom60,
        currentQY: {id: 52}
    },

    mutations: {
        changeCompanyInfo( state, payload ){
            state.companyInfo = payload
            console.log(state.companyInfo)
        },
        changeQYInfoFrom60( state, payload ){
            console.log(payload.t)
            console.log(payload.qy)
            state.QYInfoFrom60 = payload.t
            state.currentQY = payload.qy
        },
    },

    actions: {
        //获取公司信息
        async getCompanyInfo({ commit }){
            const CompanyInfo = await getCompanyInfo()
            console.log('QYInfo', CompanyInfo)
            CompanyInfo.success && commit('changeCompanyInfo', CompanyInfo.t)
        },
        
        //获取企业信息
        async getQYInfoFrom60({ state, commit }, pyload = {}){
            let { qy = state.currentQY, df = 1 } = pyload
            const QYInfoFrom60 = await getQYInfoFrom60({ id: qy.id, df })
            console.log('QYInfoFrom60', QYInfoFrom60)
            QYInfoFrom60.success && commit('changeQYInfoFrom60', {t:QYInfoFrom60.t, qy })
        },
        
    },
    getters: {

    }

}