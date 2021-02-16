<template>
    <div class="main">
        <a-row :gutter='12'>
            <a-col :span="18">
                <div id="map">
    
                </div>
                <div id="state" class="state" ref="state" @dragover.prevent @drop='drop($event)'>
                  <example/>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="box">
                     <div class="div" id="div" ref="div" draggable='true'  @dragstart="drag($event)">
                         DIV
                     </div>
                </div>
                <div class="editor">
                     <textarea v-model="style"></textarea>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
// @ is an alias to /src
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import Vue from 'vue'

Vue.component('example',{
    props: ['tags'],
    data(){
        return {
            name:'jaelee',
            treeNode:[{
                    class:'root',
                    type:'p',
                    style:{
                        width:'200px',
                        height:'200px',
                        background:'red'
                    },
                    children:[
                        {
                            class:'item',
                            type:'div',
                            children:[
                                {
                                    class:'span',
                                    type:'span'
                                },{
                                    class:'span',
                                    type:'span'
                                },{
                                    class:'span',
                                    type:'span'
                                }
                            ]
                        }, {
                            class:'item',
                            type:'div',
                            children:[
                                {
                                    class:'input',
                                    type:'input'
                                },{
                                    class:'input',
                                    type:'input'
                                },{
                                    class:'input',
                                    type:'input'
                                }
                            ]
                        }, {
                            class:'item',
                            type:'div'
                        }
                    ]
            }]
        }
    },
    methods:{
       CLICK(e){
           console.log(e)
       }
    },
    render (h,context) {
        console.log(context)
        let _self = this
        // 第二个参数是一个包含模板相关属性的数据对象，可选参数
        function recursion(node){
            return node.map((n,i)=>{
                if(n.children && n.children.length){
                    // console.log(context)
                    return h(n.type,{
                           attrs: {class: n.class},
                           style:n.style,
                           on: {
                              click: _self.CLICK
                           },
                        },recursion(n.children))
                }
                return h(n.type,{
                        attrs: {class: n.class},
                        domProps: {
                        value: n.type
                        }
                       })
            })
       
        }
        // 子虚拟节点（VNodes）参数可以传入字符串或者数字，
        // 通过createElement生成，可选参数
        return h('div', recursion(this.treeNode))
        // console.log(recursion(this.treeNode))
    }
})

export default {
  name: 'Build',
  data(){
      return {
          map:null,
          item:'width:100px;height:100px;background:red',
          html:'',
          treeNode:[{
              class:'root',
              type:'DIV',
              children:[
                  {
                       class:'item',
                       type:'DIV',
                       children:[
                           {
                               class:'span',
                               type:'SPAN'
                           },{
                               class:'span',
                               type:'SPAN'
                           },{
                               class:'span',
                               type:'SPAN'
                           }
                       ]
                  }, {
                       class:'item',
                       type:'DIV',
                       children:[
                           {
                               class:'input',
                               type:'INPUT'
                           },{
                               class:'input',
                               type:'INPUT'
                           },{
                               class:'input',
                               type:'INPUT'
                           }
                       ]
                  }, {
                       class:'item',
                       type:'DIV'
                  }
              ]
          }],
          style:''
      }
  },
  methods:{
     drag(ev){
         ev.dataTransfer.setData("Id",ev.target.id);
     },
     drop(ev){
        var ref=ev.dataTransfer.getData("Id");

        var div = document.createElement('DIV')
            div.style = this.style
        console.log(div)

        // let newElement = this.$refs[ref].cloneNode();
        //     newElement.setAttribute('draggable',false)
        let target = this.$refs.state;

        target.appendChild(div)
        // this.id = ++this.id
     }
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
      })
  }
}
</script>
<style lang="scss" scoped>
.main{
    height:100%;
    padding:12px;
    .ant-row,.ant-col{
        height:100%;
    }
    .ant-col{
        display:flex;
        flex-direction:column;
        justify-content: space-between;
    }
    .state{
        flex:1;
        border:1px solid #e8e8e8;
    }
    .box,.editor{
       flex:1;
       border:1px solid #e8e8e8;
    }
    .editor{
        margin-top:15px;
        textarea{
            display:block;
            width:100%;
            height:100%;
        }
    }
}
#map{
   flex:1;
   margin-bottom:15px;
   border:1px solid #e8e8e8;
}
.div{
    width:100px;
    height:30px;
    background: aquamarine;
}
</style>
