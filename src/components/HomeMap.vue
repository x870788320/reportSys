
<template>
  <div id="homeMap"></div>
</template>

<script>
import { defineComponent, onMounted, computed} from "vue";
import { useStore } from 'vuex';
import { MP } from '../utils/map.js'
import { myAk } from '../utils/constants.js'
// import { getAddress, markAddress } from '../resource/markCity.js'
import { getPoi } from '../resource/markCity.js'
import { mapContentData } from '../resource/mapData.js'
import { formatDate } from '../utils'
export default defineComponent({
    name: 'HomeMap',
    setup() {

        const store = useStore();
        const mapStore = computed(() => store.state.map);
        const { companyInfo } = mapStore.value

        let BMap = null
        let map = null

        const getContent = info => (`
            <div class = 'sContent'>
                <div class = 'sContentTitle'>${info.name}</div>
                <div class = 'sContentMain'>
                    ${mapContentData.reduce((pre, item) => {
                        let str = `<div>
                            <span>${item.name}: </span>
                            <span>${item.key == 'createTime'? formatDate(info[item.key]):info[item.key]}</span>
                        </div>`
                        return pre + str
                    }, '')}
                </div>
            </div>`)


        // let _this = searchByStationName.prototype
        
        // async function searchByStationName (address) {
        //     if(!address) return
        //     localSearch.setSearchCompleteCallback(function (searchResult) {
        //         let poi = searchResult.getPoi(0);
        //         _this.obj[searchResult.keyword] = poi.point
        //     });
        //     localSearch.search(address);
        // }

        // const getPosition = async () => {
        //     markAddress.map(item => {
        //         searchByStationName(item)
        //     })
        //     console.log(_this.obj)
        // }

        const mapInit = async () => {
            BMap = await MP(myAk).then( BMap => BMap)
            map = new BMap.Map("homeMap"); // 创建地图实例 
            map.centerAndZoom("顺义", 12); // 根据城市名定位地图中心点
            map.enableScrollWheelZoom(); // 开启鼠标滑动缩放地图
            
            // localSearch = new BMap.LocalSearch(map);
            companyInfo.map( item => {
                let poi = getPoi(item.name)
                if(poi){
                    let sContentDom = getContent(item)
                    let myIcon = new BMap.Icon(require("../assets/mark.svg"), new BMap.Size(25, 25));
                    let point = new BMap.Point(poi.lng, poi.lat)
                    let marker = new BMap.Marker(point,{icon: myIcon});  // 创建标注，为要查询的地址对应的经纬度
                    marker.aa = 1
                    map.addOverlay(marker);
                    
                    marker.addEventListener("click",function(){
                        console.log(item)
                        let infoWindow = new BMap.InfoWindow(sContentDom);
                        map.openInfoWindow(infoWindow,point);
                        store.dispatch("map/getQYInfoFrom60", {qy: item, df: 1 })
                    });
                }
            })
        }

     
 
 
        store.dispatch("map/getCompanyInfo")
        onMounted(() => mapInit());

        return {
            
        }
    }
  
})
</script>

<style>
#homeMap{
    width: 100%;
    height: 100%;
    position: absolute;
}


.sContent{
    width: 464px;
    height: 218px;
    background: url('../assets/info-box.png') no-repeat;
    background-size: 100% 100%;
    text-align: left;
    padding: 4px 14px;
    color: #fff;
}
.sContentTitle{
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #08FFFF;
    letter-spacing: 0.19px;
    font-weight: 600;
}
.sContentMain{
    padding: 10px;
    font-size: 14px;
    line-height: 26px;
}
.BMap_pop>div{
    display: none;
}
.BMap_pop>div:nth-child(9){
    display: block;
    top: 50px !important;
}
.BMap_pop>img:nth-child(10){
    top: 50px !important;
}
/* .BMap_bubble_content{
    position: relative;
    top:30px;
} */
</style>

