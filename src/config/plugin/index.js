import { firstCharUpper } from "../../utils"
import directive from "./directive"
// import router from "@/router"
// import http from "./globalMethod/http"


// console.log(http)

//获取vue公共组件
const requireComponent = require.context('./', true, /\.vue$/);

const install = Vue => {
    if(install.installed) return;
    install.installed;
    
    //当前路由name
    // Vue.prototype.$currentRoute = router.history
    // //路由跳转
    // Vue.prototype.$handleGo = (name, params = {}) => router.push({name, params})
    // Vue.prototype.$handleRe = (name, params = {}) => router.replace({name, params})
    // Vue.prototype.$fromTo = (from, to) => {
    //     // console.log(router)
    //     console.log(from)
    //     console.log(to)
    //     // console.log(location)
    //     // console.log(history)
    //     router.beforeEach((to,from,next) => {
    //         next()
    //     })
    // }
    

    //公共组件放到vue
    requireComponent.keys().map(fileName => {
        const config = requireComponent(fileName)
        const componentName = firstCharUpper(config.default.name);
        Vue.component(componentName, config.default || config)
    });

    //公共指令放到vue
    Object.keys(directive).map( name => Vue.directive(name, directive[name]))
    Object.keys(directive).map( name => console.log(directive[name]))

}

if( typeof window !== "undefined" && window.Vue ) {
    install(window.Vue)
}

export default { install }
