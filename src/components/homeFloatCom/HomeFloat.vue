<template>
  <div class="homeFloat" @click= 'homeFloatShow()'>
    <!-- 上 -->
    <div class="homeFloatHeader">
      <img src="@/assets/header-bg.png" alt="">
      <img src="@/assets/title.png" alt="">
      <button onclick="history.go(-1)">后台管理系统</button>
    </div>

    <!-- 右 -->
    <div class="homeFloatRight">
      <img src="@/assets/data-tab.png" alt="">
      <div  class="homeFloatRightText">
        <div>数据来源</div>
        <div @click="changeSourceFrom(1)" :class="{homeFloatItemSe: (homeFloatItemSe == 1) }">第三方初次评估</div>
        <div @click="changeSourceFrom(4)" :class="{homeFloatItemSe: (homeFloatItemSe == 4) }">第三方再次评估</div>
        <div @click="changeSourceFrom(2)" :class="{homeFloatItemSe: (homeFloatItemSe == 2) }">企业自评</div>
        <!-- <div @click="changeSourceFrom(5)" :class="{homeFloatItemSe: (homeFloatItemSe == 5) }">第二次企业自评</div> -->
        <div @click="changeSourceFrom(3)" :class="{homeFloatItemSe: (homeFloatItemSe == 3) }">执法数据</div>
      </div>
    </div>
    <!-- 左 -->
    <div class="homeFloatLeftCon">
      <HomeFloatLeft/>
    </div>
    <!-- 下 -->
    <div class="homeFloatBottomCon">
      <HomeFloatBottom />
    </div>

  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import HomeFloatLeft from './HomeFloatLeft'
import HomeFloatBottom from './HomeFloatBottom'
export default {
  name: 'HomeFloat',
  props: {
    
  },
  components:{ HomeFloatLeft, HomeFloatBottom },
  setup(){
    const homeFloatItemSe = ref(1);
    const store = useStore();
    const homeFloatShow = () => {
      console.log('homeFloatShow')
    }
    const changeSourceFrom = df => {
      //点击事件，会在点击时获取，不需要实时更新数据
      const { currentLeftSe } = store.state.float
      const params = { df }
      //接口数据来源
      homeFloatItemSe.value = df
      if(df == 5){
        params.batchId = 1
        params.df = 2
      }
      
      if(currentLeftSe.id == 1){
        store.dispatch("float/getQYInfo", df)
      } else {
        store.dispatch("float/getHyInfo", params)
        store.dispatch("float/getZJInfo", params)
      }
    }

    return {
      homeFloatShow,
      changeSourceFrom,
      homeFloatItemSe
    }
  }
}
</script>

<style scoped>
.homeFloat{
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
}
.homeFloatHeader{
    width: 100%;
    height: 80px;
    position: absolute;
    left: 0;
    top: 20px;
    pointer-events: auto;
}
.homeFloatHeader>button{
    width: auto;
    height: 36px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 3%;
    margin: auto;
    cursor: pointer;
    padding: 0 7px;      
}

.homeFloatHeader>img:nth-child(1){
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.homeFloatHeader>img:nth-child(2){
    width: 30%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.homeFloatRight{
    width: 150px;
    height: 186px;
    position: absolute;
    right: 40px;
    top: 124px;
    pointer-events: auto;
}
.homeFloatRight>img{
  width: 100%;
  height: 100%;
}

.homeFloatRightText{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 14px 15px;
    color: #fff;
    font-size: 14px;
    line-height: 26px;
}
.homeFloatRightText>div:hover{
    color: #32C5FF;
    cursor: pointer;
}
.homeFloatRightText>div:nth-child(1):hover{
  color: #FA6400;
}
.homeFloatRightText>.homeFloatItemSe{
  color: #32C5FF;
}
.homeFloatRightText>div:nth-child(1){
  font-size: 16px;
  color: #FA6400;
  text-align: left;
  margin-bottom: 4px;
}

.homeFloatLeftCon{
    width: 110px;
    position: absolute;
    left: 40px;
    top: 136px;
    pointer-events: auto;
}
.homeFloatBottomCon{
    width: 100%;
    position: absolute;
    bottom: 0px;
    padding: 10px 16px;
    box-sizing: border-box;
    /* display: flex;
    justify-content: space-around; */
    pointer-events: auto;
}

</style>
