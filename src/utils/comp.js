import Vue from 'vue'
import { mecInfoWindow } from './tpl'

/* 独立组件 突出一个动态*/

//MEC
function MecComponent(vue,list){
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
                   this.currentData = {}
                   this.dataList.forEach(d => {
                      if(d.id == n){
                        this.currentData = d
                      }
                   })
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
    MecComponent
 }