<template>
    <div class="floatBotTable"  v-auto-scroll = '1'>
        <div v-for = '(item,index) in tableData'
            :key = "item"
             class = 'floatBotTableItem'>
            <div class = 'showblockItemLeft'>{{ index + 1 }}</div>
            <div class = 'showblockItemRight'>
                <div style="width: 40%;">{{item.name}}</div>
                <div style="width: 30%;">分数: {{item.value.toFixed(1)}}</div>
                <div style="width: 30%;" v-if = 'item.addr'>{{item.addr}}</div>
                <div style="width: 30%;" v-else>{{item.cont}} <span>家企业</span></div>
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
  setup(props){
        const store = useStore();
        const tableData = computed(() =>  store.state.float.QYInfo[props.dataKey]);
        // const tableData = computed(() => QYInfo.value)
        

        return {
            tableData
        }
  }
}
</script>

<style scoped>
.floatBotTable{
    width: 100%;
    position: absolute;
}
.floatBotTableItem{
    height: 30px;
    color: #45A0C4;
    background: #123A58;
    border: 1px solid #45A0C4;
    box-shadow: inset 0 0 10px 0 #32c5ff;
    border-radius: 4px;
    display: flex;
    text-align: left;
    margin: 7px 0;
    cursor: pointer;
}
.showblockItemLeft{
    width: 10%;
    height: 100%;
    background: #00A2C8;
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.showblockItemRight{
    width: 90%;
    display: flex;
    align-items: center;
    color: #73DFFC;
    padding: 0 6px;
    box-sizing: border-box;
}

.showblockItemRight>div{
    margin: 0 4px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}

</style>
