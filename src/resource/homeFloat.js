


//左边列表数据
export const leftList = [
    {
        id:1,
        title:'全区',
        name:'area',
        icon:'el-icon-user'
    },
    {
        id:2,
        title:'行业',
        name:'industry',
        icon:'el-icon-lock'
    },
    {
        id:3,
        title:'镇街',
        name:'town',
        icon:'el-icon-lock'
    }
]


//主题责任全区
const area = [
    {
        id: 1,
        domId:'',
        title: '镇街排名',
        interface: 'zjstat',
        type: 'table',
        width: ''
    },
    {
        id: 2,
        domId:'',
        title: '行业排名',
        interface: 'hystat',
        type: 'table',
        width: ''
    },
    {
        id: 3,
        domId:'',
        title: '企业排名',
        interface: 'comstat',
        type: 'table',
        width: ''
    },
    {
        id: 4,
        domId:'main_all_map',
        title: '企业主体责任落实分级地图',
        interface: 'zjstat',
        type: 'echart',
        width: ''
    },
]

//主体责任行业
const industry = [
    {
        id: 1,
        domId:'',
        title: '道路货运运输',
        interface: '',
        type: 'other',
        width: '15%'
    },
    {
        id: 2,
        domId:'main_qyfraction',
        title: '各企业分数占比',
        interface: 'cavg',
        type: 'echart',
        width: '15%'
    },
    {
        id: 3,
        domId:'main_sefraction',
        title: '七体系分数',
        interface: 'list7avg',
        type: 'echart',
        width: '25%'
    },
    {
        id: 4,
        domId:'main_qynum',
        title: '企业排行',
        interface: 'listmap',
        type: 'echart',
        width: '25%'
    },
    {
        id: 5,
        domId:'main_hy_hyse',
        title: '各行业七体系对比',
        interface: 'hy_hystats',
        type: 'echart',
        width: '15%'
    },
]

//主题责任镇街
const town = [
    {
        id: 1,
        domId:'',
        title: '临空核心区',
        interface: '',
        type: 'other',
        width: '15%'
    },
    {
        id: 2,
        domId:'main_qyfraction',
        title: '各企业分数占比',
        interface: 'cavg',
        type: 'echart',
        width: '15%'
    },
    {
        id: 3,
        domId:'main_sefraction',
        title: '七体系分数',
        interface: 'list7avg',
        type: 'echart',
        width: '25%'
    },
    {
        id: 4,
        domId:'main_qynum',
        title: '企业排行',
        interface: 'listmap',
        type: 'echart',
        width: '25%'
    },
    
    {
        id: 5,
        domId:'main_hy_hyse',
        title: '各行业七体系对比',
        interface: 'hy_hystats',
        type: 'echart',
        width: '15%'
    },
    // {
    //     id: 5,
    //     domId:'main_zj_grade',
    //     title: '各镇街对比',
    //     interface: 'zj_hystats',
    //     type: 'echart',
    //     width: '15%'
    // },
]


//主题责任镇街
export const company = [
    {
        id: 1,
        domId:'',
        title: '得分情况',
        interface: '',
        type: 'other',
        width: ''
    },
    {
        id: 2,
        domId:'',
        title: '未落实部分',
        interface: '',
        type: '',
        width: '%'
    },
    {
        id: 3,
        domId:'',
        title: '分数呈现',
        interface: '',
        type: 'echart',
        width: '15%'
    },
    {
        id: 4,
        domId:'',
        title: '分数详情',
        interface: 'listmap',
        type: 'echart',
        width: '35%'
    }
]

export const bottomList = { area, industry, town }