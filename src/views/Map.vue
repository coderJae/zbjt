<template>
  <div id="map">
     
  </div>
</template>

<script>
// @ is an alias to /src
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import { addMarker }  from '@/utils/util'
import { MecComponent } from '@/utils/comp'

export default {
  name: 'Map',
  data(){
      return {
          map:null,
          overlayGroups:null,    
          list:[],
          mecData:[
            {
                time:'2020年10月23日 17:32:12',
                type:'雷视检测器1',
                code:'SP1002',
                lnglat:'117.212067,36.673145',
                question:'天线无采集数据',
                id:'001'
            },{
                time:'2020年10月24日 17:32:12',
                type:'雷视检测器2',
                code:'SP1003',
                lnglat:'117.212068,36.673145',
                question:'离线',
                id:'002'
          }]
      }
  },
  created(){
     let mec = MecComponent(this,this.mecData)

     this.list = [
        {
          id:'001',
          lnglat:[116.398342,39.908465],
          status:0,
          img:'',
          component:mec
        },
        {
          id:'002',
          lnglat:[116.398342,39.908465],
          status:1,
          img:'',
          component:mec
        },
        {
          id:'003',
          lnglat:[116.443936,39.91565],
          status:1,
          img:'',
          component:mec
        }
     ]
     
  },
  mounted(){
      lazyAMapApiLoaderInstance.load().then(() => {
         this.map = new AMap.Map("map", {
            center: [116.398342,39.908465],
            zoom: 12,
            pitch: 50,
            viewMode:'3D',
            mapStyle: "amap://styles/cbd2e1aed1ade67712e722499e6fc503"
         })




         this.overlayGroups = new AMap.OverlayGroup(addMarker(this.map,this.list,this));
         this.map.add(this.overlayGroups);
        
      })
  }
}
</script>
<style lang="scss" scoped>
#map{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
</style>
