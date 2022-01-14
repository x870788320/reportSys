
import { createStore } from 'vuex'

const requireStores = require.context('./moduleStores', true, /\.store\.js/);
const modules = requireStores.keys().reduce((pre, store) => {
    const { name, ...rest } = requireStores(store).default;
    pre[name] = rest;
    return pre;
},{})

export default createStore({
    state: {
        test: '3333'
        
    },
    mutations: {
        
    },
    actions: {
        
    },
    getters: {
        
    },
    modules
})