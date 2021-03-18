import Vue from 'vue'
import { mecInfoWindow, trafficEventsWindow, roadDeviceWindow, pubSceneWindow } from './tpl'

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


//场景下发
function pubSceneComponent(vue,list){
  var Component = Vue.extend({
      template:pubSceneWindow('基本信息'),
      data(){
        return {
          step:1,
          mecList:list,
          checkList:[],
          w:[
            {
              name:'暴雨',
              checked:false
            },
            {
              name:'浓雾',
              checked:false
            },
            {
              name:'起火',
              checked:false
            },
            {
              name:'冰雹',
              checked:false
            },
            {
              name:'塌陷',
              checked:false
            },
            {
              name:'施工',
              checked:false
            }
          ]
        }
      },
      watch: {
        mecList:{
          handler(){
              let list = []
              this.mecList.forEach(m => {
                if( m.checked ){
                    list.push(m.name)
                }
              })
              this.checkList = list
          },
          deep:true,
          immediate: true
        }
      },
      methods:{
        check:function(item){
          item.checked = !item.checked
        },
        closeWindow(type){
          vue.map.clearInfoWindow();
          if(type){
            this.$message.success('下发成功')
          }
        },
        submit(){
          vue.map.clearInfoWindow();
          this.$message.success('下发成功')
        }
      }
  })
  return new Component().$mount()
}



 export {
    TrafficEventsComponent,
    RoadDeviceComponent,
    HitchComponent,
    pubSceneComponent
 }