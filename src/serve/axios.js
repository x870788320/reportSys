import axios from "axios"
import { baseURL } from './httpConfig.js'

const errorHandle = (status = 0, msg) => {
    switch(status){
        case 200:
            // toLogin();
            break;
        default:
            window.console.log('msg',msg);
    }
}

const invalidHandle = res => {
    switch(res.data.code){
        case '4002':
            // toLogin();
            // elTools.Message({
            //     message: '登录已失效，请重新登录！',
            //     type: 'warning'
            //   })
            break;
        default:
            window.console.log('code',res.data.code);
    }
}

const hideLoading = () => console.log('loading')
const showLoading = () => console.log('show')

let Axios = axios.create({
    baseURL,
    timeout: 1000*30,
    // responseType: "json",
    // withCredentials: true, //是否允许带cookie
})
Axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";

Axios.interceptors.request.use(
    config => {
        // if (config.method == 'post'){
        //     config.headers['X-CSRFToken'] = store.state.CSRFToken;
        // }
        console.log(config)
        return config
    },
    error =>  hideLoading() && Promise.error(error)
)

Axios.interceptors.response.use(
    res => {
        invalidHandle(res)
        hideLoading() 
        return (res && (res.status === 200) ? Promise.resolve(res) : Promise.reject(res))},
    error => {
        hideLoading()
        const { response } = error;
        errorHandle(response.status, response.data.message);
        return Promise.reject(response);
    }
)


//方便使用封装get方法
export const get = (url, params, loading = false) => {
    loading && showLoading()
    return new Promise((resolve, reject) => {
        // Axios.get(`${prosyUrl}${url}`, { params }).then( res => resolve(res.data)).catch(error => reject(error))
        Axios.get(url, { params }).then( res => resolve(res.data)).catch(error => reject(error))
    })
}

//方便使用封装post方法
export const post = (url, params, loading = false) => {
    loading && showLoading()
    return new Promise((resolve, reject) => {
        // Axios.post(`${prosyUrl}${url}`,  params ).then( res => resolve(res.data)).catch(error => reject(error))
        Axios.post(url,  params ).then( res => resolve(res.data)).catch(error => reject(error))
    })
}

export default Axios;

