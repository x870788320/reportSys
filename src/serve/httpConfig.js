

//本地文件加载时的路由
export const IFRAME_SERVE_ADDRESS = 'http://192.168.1.49:8088'

// http://127.0.0.1:7778/sft/org/resporder/liststat/qy?df=1

export const SERVE_ADDRESS = location.origin

// export const baseURL = process.env.NODE_ENV ===  'production'? SERVE_ADDRESS: "/api/"
export const baseURL = process.env.NODE_ENV ===  'production'? SERVE_ADDRESS: "/api/"
export const IFRAME_baseURL = process.env.NODE_ENV ===  'production'? SERVE_ADDRESS: IFRAME_SERVE_ADDRESS

export const canSeePage = ["login", "home", 'oareport','oareportlocol']
