

import * as echarts from "echarts";


//全区
const main_all_map_option = (name, data) => ({
  visualMap: {
    min: 0,
    max: 100,
    show: true,
    type: "piecewise",
    splitNumber: 4,
    textStyle: {
        color: '#4DA3E5',
        fontWeight: 'normal',
        fontFamily: "Microsoft YaHei"
    },
    pieces: [
      { 
        min: 0, 
        max: 60, 
        label: "差",
        color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.6,
            [
              {offset: 0, color: 'rgba(29,126,172,1)'},
                {offset: 1, color: '#DE2525'},
            ]
        ),  
    },
      { 
        min: 60, 
        max: 70, 
        label: "中" ,
        color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.6,
          [
            {offset: 0, color: 'rgba(29,126,172,1)'},
              {offset: 1, color: '#FA6400'},
          ]
        ), 
      },
      { 
        min: 70, 
        max: 90, 
        label: "良",
        color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.6,
          [
            {offset: 0, color: 'rgba(29,126,172,1)'},
              {offset: 1, color: '#F7B500'},
          ]
        ), 
      },
      { 
        min: 90, 
        max: 100, 
        label: "优" ,
        color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.6, [          // 由中心向四周渐变
            { offset: 0, color: "rgba(29,126,172,1)" },
            { offset: 1, color: "#32C5FF" },
        ]),
      },
    ],
    left: "85%",
    top: "center",
    calculable: true,
  },
  tooltip: {
    trigger: "item",
    formatter: function (params) {
      if (params.data) {
        return params.name + "<br/>" + params.data.value;
      } else {
        return params.name;
      }
    },
  },
  geo: {
    map: name,
    zoom: 1,
    roam: false,
    itemStyle: {
      normal: {
        areaColor: "#4DA3E5",
      },
      emphasis: {
        areaColor: "#2AB8FF",
        borderWidth: 0,
        color: "green",
        label: {
          show: false,
        },
      },
    },
  },
  series: [
    {
      type: "map",
      mapType: name,
      label: {
        show: true,
        textStyle: {
          color: "rgba(255,255,255,1)",
        },
        normal: {
            show: true,
            textStyle: {
              fontSize: 10,
              color: 'rgba(255,255,255,.8)'
            }
        },
      },
      itemStyle: {
        normal: {
          borderColor: "#1D7EAC",
          borderWidth: 1,
          areaColor: "#166892",
        },
        emphasis: {
          areaColor: "#166892",
          color: "#4DA3E5",
        },
      },
    //   center: ['20%', '50%'],
      zoom: 1.28,
      roam: false,
      animation: false,
      data,
    },
  ],
})


//行业  

const main_qyfraction_option_colors = [
  {//颜色渐变
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
              {offset: 0, color: '#FFC278'},
              {offset: 0.5, color: '#FF8E43'},
              {offset: 1, color: '#FFC278'}
          ]
      )
  },
  {//颜色渐变
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
              {offset: 0, color: '#0095FF'},
              {offset: 0.5, color: '#0CB9FF'},
              {offset: 1, color: '#32C5FF'}
          ]
      )
  },
  {//颜色渐变
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
              {offset: 0, color: '#FCDB00'},
              {offset: 0.5, color: '#F7B500'},
              {offset: 1, color: '#FCDB00'}
          ]
      )
  },
  {//颜色渐变
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
              {offset: 0, color: '#FF637C'},
              {offset: 0.5, color: '#F84545'},
              {offset: 1, color: '#FF637C'}
          ]
      )
  },
]
const main_qyfraction_names = ['优','良','中','差']
const main_qyfraction_option = (name, data) => ({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 'right',
        top: 40,
        // data: data
        
        textStyle: {
          color: '#4DA3E5'          // 图例文字颜色
        }
      },
      series: [
          {
              name:'各行业分数占比',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ["35%", "50%"],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  color: '#353535',
                  position: 'center',
                  fontSize: '12',
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '12',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data:data.map((value, index) => ({
                name: main_qyfraction_names[index],
                value,
                itemStyle: {
                  normal: main_qyfraction_option_colors[index % 4]
                },
              }))
          }
      ]
  })

//七体系
const sevTitles = ['组织机构','规章制度','资金保障','教育培训','场所和设备设施安全管理','日常管理','风险防控和应急救援']
const main_sefraction_option = (name, data) => ({
  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
  },

  legend: {
    orient: 'vertical',
    left: 'right',
    top: 10,
    textStyle: {
      color: '#4DA3E5'          // 图例文字颜色
    }
  },
  series: [
      {
          name: '七体系分数',
          type: 'pie',
          radius: [0, 80],
          center: ["35%", "50%"],
          roseType: 'area',
          itemStyle: {
              normal: {
                color: params => ['#4A90E2','#B0FF5D','#32C5FF', '#DCE6F7', '#81D9FB','#44D7B6','#1658A5'].reverse()[params.dataIndex]
              }
          },

          label: {
            show: false,
            color: 'rgba(255, 255, 255, 0.3)'
          },
          data: data.map((value,index) => ({
            value: Math.ceil(value),
            name: sevTitles[index]
          })).sort(function(d1,d2){return d1.value-d2.value})
      }
  ]
}
)


//企业排行
const getKeys = (data, leng = 8) => data.slice(0, (leng - 1)).map(item => Object.keys(item)[0])
const getVals = (data, leng = 8) =>  data.slice(0, (leng - 1)).map(item => Object.values(item)[0].toFixed(2))
const main_qynum_option = (name, data) => ({

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    show: false
  },
  
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top:'3%',
    containLabel: true
  },
  yAxis: {
    data: getKeys(data).reverse(),
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#4DA3E5'
      }
    },
    // z: 10
  },
  xAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#4DA3E5'
    }
  },
  // dataZoom: [
  //   {
  //     type: 'inside'
  //   }
  // ],
  series: [
    {
      name: '企业得分',
      type: 'bar',
      // showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: getVals(data).reverse()
    }
  ]
})


//七系列对比
let bar_xdata = ['组织管理','规章制度','资金保障','教育培训','场所和设备设施安全管理','日常管理','风险防控和应急救援'];
const main_hy_hyse_data = data => {
  console.log(data)
  return Object.keys(data).map(key => ({
    value: data[key],
    name: key,
    lineStyle: { //网调线 
      color: "#6CFEFF",
      // color: "rgba(108, 254, 255, 0.4)",
      background: "radial-gradient(circle, rgba(108, 254, 255, 0) 0%, rgba(108, 254, 255, 0.4) 100%)"
    },
    symbolSize: 0, //圆圈大小
    itemStyle: { //调点的样式
        show: true,
        // color: "rgba(108, 254, 255, 1)",
        shadowColor: 'rgba(108, 254, 255, 1)',
        // shadowBlur: 10,
        fontSize: 14,
    },
    areaStyle: {
        // 内网颜色
        // normal: {
        //     color: {
        //         type: 'radial',
        //         colorStops: [{
        //             offset: 0,
        //             color: 'rgba(108, 254, 255, 0)'
        //         }, {
        //             offset: 1,
        //             color: 'rgba(108, 254, 255, 0.4)'
        //         }],
        //         globalCoord: false
        //     },
        //     opacity: 1,
        // }
    },
  }))
}
const main_hy_hyse_option = (name,data) => ({
  title: {
      top: '52%',
      bottom:'center',
      left: 'center',
      textStyle: {
          rich: {
              span: {
                  backgroundColor: 'rgba(108,254,255,1)',
                  width: 74,
                  height: 69,
                  borderRadius: 50,
                  fontSize: 14,
                  align: 'center',
                  verticalAlign: 'middle',
                  lineHeight: 74,
                  padding: [0, 0, 5, 0]
              }
          }
      }
  },

  tooltip: {
    trigger: 'item'
  },
  radar: {
      center: ['50%', '50%'],
      radius: "70%",
      splitNumber: 5,
      name: {
          textStyle: {
              color: "rgba(203, 221, 255, 1)",
              borderRadius: 3,
              fontSize: 14,
          },
      },
      nameGap: "5",
      indicator: bar_xdata.map(item => ({
        text: item, max: 100 
      })),
      // 圈圈网颜色
      splitLine: {
          show: true,
          lineStyle: {
              color: [
                  'rgba(108, 254, 255, 0)', 'rgba(108, 254, 255, 0.30196078431372547)', 'rgba(108, 254, 255, 0.30196078431372547)',
                  'rgba(108, 254, 255, 0.30196078431372547)', 'rgba(108, 254, 255, 0.30196078431372547)'
              ],
              width: '1'
          }
      },
      splitArea: {
          areaStyle: {
              color: 'rgba(119, 140, 162, 0.14)'
          },
      },
      axisLine: {
          show: true,
          lineStyle: {
              color: "rgba(0, 233, 234, 0.30196078431372547)",
          },
      },
  },
  series: [{
      name: name,
      type: "radar",
      symbol: "circle",
      symbolSize: "12",
      label: {
          show: false,
          // 让它的点没有显示格式
          formatter: "",
          color: "#fff",
          fontStyle: {
              fontSize: 14,
          },
      },
      data:main_hy_hyse_data(data)
  }, ],
})





//各镇街对比   todo
const getRandom = (n, m) => Math.round(Math.random() * (m - n) + n);

const getRandonData = (length) => {
    let seriesData = [];
    for (let i = 0; i < length; i++) {
        let cate = [];
        for (let j = 0; j < 20; j++) {
            cate.push(getRandom(1, 50));
        }
        seriesData.push(cate.sort((a, b) => a - b));
    }
    return seriesData;
};

const transformData = (xData, factor) => {
    const xAxisData = xData.map((v) => v.name);
    const seriesDatas = factor.map(() => getRandonData(xAxisData.length));
    return {
        xAxisData,
        seriesDatas,
    };
};

const selected = [
    { code: '320505001', name: '横塘街道' },
    { code: '320505002', name: '狮山街道' },
    { code: '320505003', name: '枫桥街道' },
    { code: '320505004', name: '镇湖街道' },
    { code: '320505005', name: '东渚街道' },
    { code: '320505100', name: '浒墅关镇' },
    { code: '320505101', name: '通安镇' },
    { code: '320505407', name: '苏州科技城' },
];

const legendData = ["PM2.5", "PM10", "NO2", "SO2", "CO", "O3"];
const { xAxisData, seriesDatas } = transformData(selected, legendData);





const main_zj_grade_option = () => (
  {
    legend: {
        bottom: 0,
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow',
        },
    },
    grid: {
        left: 50,
        top: 15,
        right: 15,
        bottom: 65,
    },
    xAxis: {
        type: 'category',
        nameGap: 30,
        splitArea: {
            show: false,
        },
        splitLine: {
            show: false,
        },
        axisLabel: {
            interval: 0,
        },
        data: xAxisData,
    },
    yAxis: {
        type: 'value',
        splitArea: {
            show: false,
        },
    },
    series: legendData.map((v, i) => ({
        name: v,
        type: 'boxplot',
        data: seriesDatas[i],
    })),
})

  export default { 
    //全区
    main_all_map_option, 
    //行业
    main_qyfraction_option, 
    main_sefraction_option, 
    main_qynum_option, 
    main_hy_hyse_option,
    //镇街
    main_zj_grade_option
    //其余的与行业公用
  }