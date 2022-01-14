<template>
    <div class="homeFloatBot">
        <div v-for="(item) in currentModule"
            :key="item.id"
            class = 'homeFloatBotItem'
            :style="{width : (item.width || '24%')}">
            <div class = 'FloatBotItemTitle'>{{item.type == "other"? qy_zh_info.name: item.title}}</div>
            <div :class = '{floatBotItemMain:true, floatBotItemMainOverAu: item.type == "table"}' >
                <FloatBotTable v-if= 'item.type == "table"' :dataKey = 'item.interface'/>

                <FloatBotEchart v-if= '(item.type == "echart") && (item.domId == "main_all_map")' :echartInfo = 'item'/>
                <FloatBotEchart v-if= '(item.type == "echart") && (item.domId == "main_qyfraction")' :echartInfo = 'item'/>
                <FloatBotEchart v-if= '(item.type == "echart") && (item.domId == "main_sefraction")' :echartInfo = 'item'/>
                <FloatBotEchart v-if= '(item.type == "echart") && (item.domId == "main_qynum")' :echartInfo = 'item'/>
                <FloatBotEchart v-if= '(item.type == "echart") && (item.domId == "main_hy_hyse")' :echartInfo = 'item'/>
                <FloatBotEchart v-if= '(item.type == "echart") && (item.domId == "main_zj_grade")' :echartInfo = 'item'/>
                
                <FloatBotOther v-if= 'item.type == "other"'/>
                
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';
import FloatBotTable from './FloatBotTable'
import FloatBotEchart from './FloatBotEchart'
import FloatBotOther from './FloatBotOther'

export default {
  name: 'HomeFloatBottom',
  components:{ FloatBotTable, FloatBotEchart, FloatBotOther },
  setup(props, ctx){
        //可以拿到this
        //const {ctx:that} = getCurrentInstance()
        console.log(ctx)
        const store = useStore();
        const qy_zh_info = computed(() => store.state.float.qy_zh_info);
        const currentModule = computed(() => store.state.float.currentButtonModule);
        
        store.dispatch("float/getQYInfo")

        return {
            currentModule,
            qy_zh_info,
        }
    }
}
</script>

<style scoped>
.homeFloatBot{
    display: flex;
    justify-content: space-around;

}
.homeFloatBotItem{
    /* width: 25%; */
    height: 232px;
    padding: 14px;
    background: url('../../assets/info-box.png') no-repeat;
    background-size: cover;
}
.FloatBotItemTitle{
    line-height: 8px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #08FFFF;
    letter-spacing: 0.19px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 16px;
}
.floatBotItemMain{
    height: calc( 100% - 20px );
    /* overflow: auto; */
    position: relative;
}
.floatBotItemMainOverAu{
    overflow: auto;
}

.floatBotItemMain::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    }

.floatBotItemMain::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #EDEDED;
    }

.floatBotItemMain::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0px;
}
.floatBotItemChartCon{
    width: 100%;
    height: 100%;
}
</style>
