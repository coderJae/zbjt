import Vue from 'vue'
import { mecInfoWindow, trafficEventsWindow, roadDeviceWindow } from './tpl'

/* 独立组件 突出一个动态*/



/* 交通事件 */
function TrafficEventsComponent(vue){
  var Component = Vue.extend({
          template:trafficEventsWindow(),
          data(){
            return {
              index:1
            }
          },
          methods:{
            show:function(i){
              this.index = i
            },
            closeWindow(){
              vue.map.clearInfoWindow();
            },
            submit(){
              vue.map.clearInfoWindow();
              this.$message.success('提交成功')
            }
          }
      })

       return new Component().$mount()
  
}

/* 路测设备 */
function RoadDeviceComponent(vue,son){
  var Component = Vue.extend({
    template:roadDeviceWindow(),
    data(){
      return {
        index:1,
        showDetail:false,
        id:'',
        lnglat:null
      }
    },
    watch:{
      id(n,o){
         console.log(n,'RoadDeviceComponent')
      }
    },
    methods:{
        showFault(){
            son.id = this.id
            // 创建一个自定义内容的 infowindow 实例
            var infoWindow = new AMap.InfoWindow({
                isCustom:true,
                offset: new AMap.Pixel(0, -75),
                content: son.$el
            })
  
            infoWindow.open(vue.map, this.lnglat);
  
        },
        closeWindow(){
          vue.map.clearInfoWindow();
        }
    }
  })
  return new Component().$mount()
}

//设备异常
function HitchComponent(vue,list){
  var Component = Vue.extend({
         template:mecInfoWindow(),
         data(){
             return {
               index:0,
               page:0,
               dataList:list,
               currentData:{},
               id:''
             }
         },
         watch:{
             id(n,o){
                console.log(n,'HitchComponent')
                this.currentData = this.dataList[0]
             }
         },
         methods:{
             closeWindow(){
               vue.map.clearInfoWindow();
             },
             check:function(index){
               this.index = index
             },
             changePage(index){
               this.page = index
               this.currentData = this.dataList[index]
             },
             submit(){
               vue.map.clearInfoWindow();
               this.$message.success('提交成功')
             },
             showMarker(type){
               vue.map.remove(vue.deviceList)
               vue.map.remove(vue.layers)
               this[type].forEach((item)=>{
                   vue.addDevice(item.lnglat)
               })
             }
         },
         mounted(){
             console.log(vue.$data)
         }
     })

   return new Component().$mount()
}



 export {
    TrafficEventsComponent,
    RoadDeviceComponent,
    HitchComponent
 }