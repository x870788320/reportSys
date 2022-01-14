<template>
  <div class="homeFloatLeft">
      <div>
        <div v-for = 'item in leftList'
            :key="item.id"
            :class="{floatLeftItem:true, floatLeftItemSelect: item.id == selectItem.id}"
            @click="floatLeftClick(item)">
            {{item.title}}
        </div>
      </div>
      <div class = 'homeFloatList' v-show="selectListShow" @mouseleave = '() => {selectListShow = false}'>
          <div v-for="item in selectList" :key="item" class = 'homeFloatListItem'  @click="floatLeftChildNav(item)">{{item.name}}</div>
      </div>
    </div>
</template>

<script>
import { reactive, computed, toRefs} from "vue";
import { useStore } from 'vuex';
import { leftList } from '@/resource/homeFloat.js'
export default {
  name: 'HomeFloatLeft',
  props: {
      
  },
  setup(){
        const store = useStore();
        const ZJList = computed(() => store.state.float.ZJList);
        const HYList = computed(() => store.state.float.HYList);
    
        const state = reactive({
            leftList,
            selectItem: leftList[0],
            selectListShow: false,
            selectList:[]
        })
        let currentButton = 0
        
        const floatLeftClick = item => {
            // console.log(item)
            state.selectItem = item
            store.commit("float/changeCurrentLeftSe", item);
            if(item.id == 1) return
            state.selectList = item.id == 2? HYList.value: ZJList.value
            state.selectListShow = !state.selectListShow
            if(currentButton != item.id){
                store.commit("float/changeQYZJInfo", state.selectList[0]);
                currentButton = item.id
                state.selectListShow = true
            }
        }

        const floatLeftChildNav = info => {
            // console.log(info)
            
            store.dispatch("float/getHyInfo", {hy: info.name})
            store.dispatch("float/getZJInfo", {zj: info.name})
            store.commit("float/changeQYZJInfo", info);
            state.selectListShow = false
        }

        store.commit("float/changeCurrentLeftSe", state.leftList[0])
        store.dispatch("float/getZJList")

        return {
            ...toRefs(state),
            floatLeftClick,
            floatLeftChildNav
        }
  }
}
</script>

<style scoped>
.homeFloatLeft{

}
.floatLeftItem{
    width: 110px;
    height: 34px;
    line-height: 34px;
    margin-bottom: 12px;
    color: #32C5FF;
    cursor: pointer;
    background: url('../../assets/tab.png') no-repeat;
}
.floatLeftItemSelect{
    color: #F7B500;
    background: url('../../assets/tab-hover.png') no-repeat;
}
.floatLeftItem:hover{
    color: #F7B500;
    background: url('../../assets/tab-hover.png') no-repeat;
}
.homeFloatList{
    width: 130px;
    max-height: 500px;
    padding: 8px;
    position: absolute;
    top: 0;
    left: 120px;
    background: rgba(16,42,62,0.80);
    border: 1px solid #1C4360;
    border-radius: 4px;
    overflow: auto;
}

.homeFloatList::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    }

.homeFloatList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 4px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #EDEDED;
    }

.homeFloatList::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 4px;
}

.homeFloatListItem{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #60C4ED;
    line-height: 24px;
    font-weight: 400;
    cursor: pointer;
}
.homeFloatListItem:hover{
    background: rgba(40,85,120,0.80);
    box-shadow: inset 0 0 11px 0 #32C5FF;
    color: #fff;
}
</style>
