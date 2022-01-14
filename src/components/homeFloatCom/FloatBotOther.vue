<template>
    <div class="floatBotOther">
        <div class = 'floatBotOtherLeft'>
            <div class = 'digitalBoldFont'>{{echartsDatas}}</div>
            <div>企业平均分</div>
        </div>
        <div class = 'floatBotOtherRight'>
            <div class = 'floatBotOtherCount'>
                <div>企业个数:</div>
                <div class = 'digitalBoldFont' style="display:flex">
                    <div class = 'floatBotOtherNum' v-for="(item,index) in getEveryArr(qy_zh_info.cnum)" :key="index">{{item}}</div>
                </div>
            </div>
            <div  class = 'floatBotOtherCount300'>
                <div>300人以上企业个数：</div>
                <div class = 'digitalBoldFont' style="display:flex">
                    <!-- {{getEveryArr(30)}} -->
                    <div class = 'floatBotOtherNum' v-for="(item,index) in getEveryArr(qy_zh_info.pnum)" :key="index">{{item}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';
export default {
  name: 'FloatBotTable',
  props: {
    dataKey: {
      type: String,
      default: ''
    },
  },
  setup(){
        const store = useStore();
        const qy_zh_info = computed(() => store.state.float.qy_zh_info);
        const storeEchartsDatas = computed(() => store.state.float.echartsDatas);

        const echartsDatas = computed(() => {
            const {hy_hystats, zj_hystats} = storeEchartsDatas.value
            const {name} = qy_zh_info.value
            const hystatsItem = hy_hystats[name] || zj_hystats[name]
            let average = hystatsItem && hystatsItem.length? hystatsItem.reduce((pre, item) => (pre+ item), 0) / hystatsItem.length: 0
            return average.toFixed(2)
        })

        
        // const float = computed(() => store.state.float);
        // const qy_zh_info = computed(() => float.value.qy_zh_info);
        // const echartsDatas = computed(() => {
        //     let hy_hystats = float.value.echartsDatas.hy_hystats;
        //     let zj_hystats = float.value.echartsDatas.zj_hystats;
        //     console.log(hy_hystats)
        //     console.log(qy_zh_info.value)
        //     const hystatsItem = hy_hystats[qy_zh_info.value.name] || zj_hystats[qy_zh_info.value.name]
        //     console.log(hystatsItem)
        //     let average = hystatsItem && hystatsItem.length? hystatsItem.reduce((pre, item) => (pre+ item), 0) / hystatsItem.length: 0
        //     return average.toFixed(2)
        // })
        
        const getEveryArr = computed(() => num => num.toString().split(''));

        return {
            getEveryArr,
            qy_zh_info,
            echartsDatas

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.floatBotOther{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
}
.floatBotOtherLeft{
    height: 100%;
    width: 40%;
    /* display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; */
    text-align: center;
    color: #fff;
}
.floatBotOtherLeft>div:nth-child(1){
    font-size: 35px;
    color: #FF8636;
    font-weight: 700;
    margin-top: 30px;
}
.floatBotOtherRight{
    width: 60%;
    padding-top: 20px;
    margin-left: 20px;
    font-size: 14px;
    color: #4DA3E5;
    text-align: left;
    font-weight: 400;
}
.floatBotOtherCount{
    margin-bottom: 12px;
}
.floatBotOtherNum{
    width: 30px;
    height: 40px;
    background: url('../../assets/bg-num3.png');
    text-align: center;
    margin: 0 1px;
}
</style>
