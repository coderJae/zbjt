<template>
  <div class="map-box">
      <div id="map"></div>
      <div class="mask">
          <!-- 头部 -->
          <header-bar/>
          <!-- 拥堵指示 -->
          <div class="legend">
                <div class="color g"></div>
                <span>良好路段</span>
                <div class="color y"></div>
                <span>缓慢路段</span>
                <div class="color r"></div>
                <span>拥堵路段</span>
          </div>
          <!-- 搜索框 -->
          <div class="search">
              <input type="text" placeholder="请输入你要搜索的内容"/>
              <div class="btn"></div>
          </div>
          <!-- 工具栏目 -->
          <div class="tools">
              <div class="select" :class="[canDraw?'can-draw':'']" @click="initMouseTool()"></div>
          </div>
          <!--  -->
          <div class="card">
              <div v-for="(item,index) in card[onIndex]" :class="[cardIndex==index?'act':'']" :key="index" @click="showThis(index)">
                <div :class="[item.class,'icon']"></div>
                <div>{{item.name}}</div>
              </div>
          </div>
          <!-- notice -->
          <div  v-if="eventShow" class="notice">
            <div class="content">
                <div><span>►</span>事件时间：</div>
                <div><span>►</span>事件类型：</div>
                <div><span>►</span>事件内容：</div>
            </div>
            <div class="btns">
                <div class="detail">详情</div>
                <div class="cancel">忽略</div>
            </div>
          </div>
          <!-- right -->
          <component :is="siderBar"></component>
          <!--  -->
          <div class="events">
                <div class="theme">
                    <div class="w">物体碰撞</div>
                    <div class="c">车辆碰撞</div>
                    <div class="r">人员碰撞</div>
                    <div class="y">人员伤亡</div>
                </div>
                <div class="num">
                    <div>1</div>
                    <div>2</div>
                    <div>2</div>
                    <div>1</div>
                </div>
                <div class="icon">
                  <div class="w"></div>
                  <div class="n"></div>
                </div>
          </div>
          <div class="nav-tab">
              <template  v-for="(item,index) in tabData">
                  <NavTab :key="index" :on="index == onIndex" :tab-data="item" @pick="pickThis(index)" />
              </template>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import { renderMask, addMarker, drawWave, searchRoad, drawRoad }  from '@/utils/util'
import {  TrafficEventsComponent, RoadDeviceComponent, HitchComponent, pubSceneComponent } from '@/utils/comp'

var customLayer = null
var mecLayer = null
var sceneLayer = null
var waveLayers = []

export default {
  name: 'Map',
  components:{
    HeaderBar: () => import('../components/header'),
    TrafficWorking: () => import('../components/traffic-working'),
    TrafficEvents: () => import('../components/traffic-events'),
    AbnormalAlarm: () => import('../components/abnormal-alarm'),
    CarNetwork: () => import('../components/car-network'),
    NavTab: () => import('../components/nav-tab') 
  },
  data(){
      return {
          map:null,
          siderBar:'TrafficWorking',
          overlayGroups:null,
          canDraw:false, 
          onIndex:0,
          cardIndex:0,
          eventShow:false,
          components:['TrafficWorking','TrafficEvents','AbnormalAlarm','CarNetwork'],
          card:[
            [
                {
                  name:'拥堵',
                  class:'yd'
                }
            ],
            [
                {
                  name:'今日',
                  class:'rl'
                },
                {
                  name:'近一周',
                  class:'rl'
                },
                {
                  name:'近一月',
                  class:'rl'
                }
            ],
            [
                {
                  name:'MEC',
                  class:'mec'
                },
                {
                  name:'雷视',
                  class:'lssp'
                },
                {
                  name:'VSM',
                  class:'vsm'
                },
                {
                  name:'RSU',
                  class:'rsu'
                }
            ],
              [
                {
                  name:'事件',
                  class:'sj'
                }
            ]
          ],
          tabData:[{
            topic:'交通运行',
            bg:'jtyx_tab.png',
            t1:'当前流量',
            n1:1.35,
            u1:'万辆',
            i1:'ll.png',
            t2:'拥堵比例',
            n2:14.2,
            u2:'%',
            i2:'bl.png'
          },{
            topic:'交通事件',
            bg:'jtsj_tab.png',
            t1:'未处理事件',
            n1:3,
            u1:'起',
            i1:'zs.png',
            t2:'今日事件总量',
            n2:16,
            u2:'起',
            i2:'sj.png'
          },{
            topic:'路测设备',
            bg:'lcsb_tab.png',
            t1:'异常设备',
            n1:2,
            u1:'个',
            i1:'lz.png',
            t2:'路测设备总量',
            n2:670,
            u2:'个',
            i2:'lc.png'
          },{
            topic:'车路协同',
            bg:'clxt_tab.png',
            t1:'今日服务常规车辆',
            n1:6.24,
            u1:'万车次',
            i1:'cg.png',
            t2:'今日服务网联车辆',
            n2:0.872,
            u2:'万车次',
            i2:'wl.png'
          }],
          lines:[
            {  
              id:'KS-001',
              start:[117.180299,36.62761],
              end:[117.204428,36.803643],
              status:0,
              index:1
            },
            { 
              id:'KS-002',
              start:[117.210685,36.711597],
              end:[117.211638,36.722092],
              status:1,
              index:999
            },
            { 
              id:'KS-003',
              start:[117.211638,36.690577],
              end:[117.210093,36.702001],
              status:2,
              index:999
            },
            { 
              id:'KS-004',
              start:[117.212128,36.673128],
              end:[117.212668,36.683143],
              status:1,
              index:999
            }
          ],
          mecData:[
            {
                time:'2020年10月23日 17:32:12',
                type:'雷视检测器1',
                code:'SP1002',
                lnglat:'117.212067,36.673145',
                question:'天线无采集数据',
                id:0
            },{
                time:'2020年10月24日 17:32:12',
                type:'雷视检测器2',
                code:'SP1003',
                lnglat:'117.212068,36.673145',
                question:'离线',
                id:1
          }],
          mecList:[
            {
              name:'mec001',
              checked:true
            },
            {
              name:'mec002',
              checked:false
            },
            {
              name:'mec003',
              checked:true
            },
          {
              name:'mec004',
              checked:false
            },
            {
              name:'mec005',
              checked:false
            },
            {
              name:'mec006',
              checked:false
            },
            {
              name:'mec007',
              checked:false
            },
            {
              name:'mec008',
              checked:false
            },
            {
              name:'mec009',
              checked:false
            },
          {
              name:'mec010',
              checked:false
            },
            {
              name:'mec011',
              checked:false
            },
            {
              name:'mec012',
              checked:false
            }, {
              name:'mec013',
              checked:false
            },
            {
              name:'mec014',
              checked:false
            },
            {
              name:'mec015',
              checked:false
            },
          {
              name:'mec016',
              checked:false
            },
            {
              name:'mec017',
              checked:false
            },
            {
              name:'mec018',
              checked:false
            }
          ],
          trafficEventsData:[
            { 
              name:'001',
              lnglat:[117.203398,36.791134],
              status:0,
              img:'sbgz',
              component:null
            },{ 
              name:'001',
              lnglat:[117.209406,36.733925],
              status:0,
              img:'jtsg',
              component:null
            },{ 
              name:'001',
              lnglat:[117.210093,36.702001],
              status:0,
              img:'jtsg',
              component:null
            },{ 
              name:'001',
              lnglat:[117.210093,36.666226],
              status:0,
              img:'jtsg',
              component:null
            },{ 
              name:'001',
              lnglat:[117.194815,36.639509],
              status:0,
              img:'jtsg',
              component:null
            }
          ],
          abnormalAlarmData:[{
                status:'normal',
                id:'001',
                lnglat:[117.204428,36.803643]
            },{
                status:'normal',
                id:'002',
                lnglat:[117.203398,36.791134]
            },{
                status:'normal',
                id:'003',
                lnglat:[117.204428,36.780823]
            },{
                status:'normal',
                id:'004',
                lnglat:[117.199965,36.768998]
            },{
                status:'fault',
                id:'005',
                lnglat:[117.202368,36.756621]
            },{
                status:'normal',
                id:'006',
                lnglat:[117.207003,36.74493]
            },{
                status:'normal',
                id:'007',
                lnglat:[117.209406,36.733925]
            },{
                status:'normal',
                id:'008',
                lnglat:[117.211638,36.722092]
            },{
                status:'normal',
                id:'009',
                lnglat:[117.210265,36.71163]
            },{
                status:'normal',
                id:'010',
                lnglat:[117.211638,36.690577]
            },{
                status:'normal',
                id:'011',
                lnglat:[117.212668,36.683143]
            },{
                status:'fault',
                id:'012',
                lnglat:[117.212067,36.673145]
            },{
                status:'normal',
                id:'013',
                lnglat:[117.210093,36.666226]
            },{
                status:'normal',
                id:'014',
                lnglat:[117.207003,36.658446]
            },{
                status:'normal',
                id:'015',
                lnglat:[117.204342,36.651767]
            },{
                status:'normal',
                id:'016',
                lnglat:[117.19945,36.644674]
            },{
                status:'normal',
                id:'017',
                lnglat:[117.194815,36.639509]
            },{
                status:'normal',
                id:'018',
                lnglat:[117.188378,36.633448]
            },{
                status:'normal',
                id:'019',
                lnglat:[117.180299,36.62761]
          }],
          serviceSceneData:[{
                status:'normal',
                id:'001',
                lnglat:[117.204428,36.803643]
            },{
                status:'normal',
                id:'002',
                lnglat:[117.203398,36.791134]
            },{
                status:'normal',
                id:'003',
                lnglat:[117.204428,36.780823]
            },{
                status:'normal',
                id:'004',
                lnglat:[117.199965,36.768998]
            },{
                status:'normal',
                id:'005',
                lnglat:[117.202368,36.756621]
            },{
                status:'normal',
                id:'006',
                lnglat:[117.207003,36.74493]
            },{
                status:'normal',
                id:'007',
                lnglat:[117.209406,36.733925]
            },{
                status:'normal',
                id:'008',
                lnglat:[117.211638,36.722092]
            },{
                status:'normal',
                id:'009',
                lnglat:[117.210265,36.71163]
            },{
                status:'normal',
                id:'010',
                lnglat:[117.211638,36.690577]
            },{
                status:'normal',
                id:'011',
                lnglat:[117.212668,36.683143]
            },{
                status:'normal',
                id:'012',
                lnglat:[117.212067,36.673145]
            },{
                status:'normal',
                id:'013',
                lnglat:[117.210093,36.666226]
            },{
                status:'normal',
                id:'014',
                lnglat:[117.207003,36.658446]
            },{
                status:'normal',
                id:'015',
                lnglat:[117.204342,36.651767]
            },{
                status:'normal',
                id:'016',
                lnglat:[117.19945,36.644674]
            },{
                status:'normal',
                id:'017',
                lnglat:[117.194815,36.639509]
            },{
                status:'normal',
                id:'018',
                lnglat:[117.188378,36.633448]
            },{
                status:'normal',
                id:'019',
                lnglat:[117.180299,36.62761]
          }]
      }
  },
  methods:{
    pickThis(index){
        this.onIndex = index
        this.siderBar = this.components[index]
        this.map.clearMap()
        this.map.remove(waveLayers)


        switch(index) {
           case 0:
             this.trafficWorking()
             break;
           case 1:
             this.trafficEvents()
             break;
           case  2:
             this.abnormalAlarm()
             break;
           case 3:
             this.serviceScene()
             break;
           default:
             break;
        }

    },
    /*交通运行*/
    trafficWorking(){
        this.lines.forEach(r => {
            searchRoad(r).then(res=>{
                  drawRoad(this.map,res)
            }).catch(err=>{
                  console.log(err)
            })
        })
    },
    /*交通事件*/
    trafficEvents(){
        this.trafficEventsData.forEach( d => {
           drawWave(d.lnglat,this.map,waveLayers)
        })
        customLayer = new AMap.OverlayGroup(addMarker(this.map,this.trafficEventsData,-95));
        this.map.add(customLayer)
    },
    /*路测设备*/
    abnormalAlarm(){
        mecLayer = new AMap.OverlayGroup(addMarker(this.map,this.abnormalAlarmData,-35,'bottom-left'));
        this.map.add(mecLayer)
    },
    /*服务场景*/
    serviceScene(){
        sceneLayer = new AMap.OverlayGroup(addMarker(this.map,this.serviceSceneData,-95));
        this.map.add(sceneLayer)
    },
    initMouseTool(){
        this.canDraw = !this.canDraw
        if(!this.canDraw){
           this.mouseTool.close(true)
           return
        }
        this.mouseTool = new AMap.MouseTool(this.map); 
        //监听draw事件可获取画好的覆盖物
        var overlays = [];
        this.mouseTool.on('draw',(e) => {
            let paths = []

            e.obj.getPath().forEach(p => {
                 paths.push([p.lng,p.lat])
            })
            
           console.log(AMap.GeometryUtil.isPointInRing([116.39573,39.907622],paths))

            overlays.push(e.obj);
            setTimeout(()=>{
                this.map.remove(overlays)
                overlays = [];
            },1000)
        }) 
        let _this = this
        function draw(type){
            switch(type){
              case 'polygon':{
                  _this.mouseTool.polygon({
                    fillColor:'rgba(0,0,0,0)',
                    strokeColor:'#80d8ff'
                    //同Polygon的Option设置
                  });
                  break;
              }
              case 'rectangle':{
                  _this.mouseTool.rectangle({
                    fillColor:'rgba(0,0,0,0)',
                    strokeColor:'red',
                    strokeWeight:6
                    //同Polygon的Option设置
                  });
                  break;
              }
            }
       }
       draw('rectangle')
    }
  },
  created(){
     //交通事件
     let tec = TrafficEventsComponent(this)
      
     this.trafficEventsData.forEach( d => {
        d.component = tec
     })

    //路测设备
     let hitch = HitchComponent(this,this.mecData)
     let mec   = RoadDeviceComponent(this,hitch)
     
     this.abnormalAlarmData.forEach( (d,i) => {
        d.component = mec
        d.img = d.status == 'normal' ? 'mec_normal' : 'mec_error'
     })

    //服务场景
     let scene = pubSceneComponent(this,this.mecList)
     
     this.serviceSceneData.forEach( (d,i) => {
        d.component = scene
        d.img = d.status == 'normal' ? 'mec_normal' : 'mec_error'
     })
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

        
        
        // customLayer = new AMap.CustomLayer(renderMask('map'), {
        //       zooms: [3, 18],
        //       zIndex: 0
        // })

        // customLayer.setMap(this.map)
         
        // window.onresize = () => {
        //     customLayer.setMap(null)
        //     customLayer.setMap(this.map)
        // }
        this.trafficWorking()
      })
  }
}
</script>
<style lang="scss" scoped>
@keyframes rotate{
      from{transform: rotate(360deg)}
      to{transform: rotate(0deg)}
}
.map-box{
  height:100%;
  position: relative;
  .mask{
    position: absolute;
    /* background: linear-gradient(rgba(58,105,224,0.8) 10%,rgba(58,105,224,0.2) 90%); */
    background:url(~@/assets/img/bg_line.png) no-repeat;
    background-size:100% 100%;
    pointer-events: none;
    z-index:999;
    top:0;
    bottom:0;
    left:0;
    right:0;
    .tools{
      width:60px;
      position:absolute;
      z-index:999;
      pointer-events: auto;
      left:1105px;
      bottom:1080px;
      .select{
        height:60px;
        background:url(~@/assets/img/select.png) no-repeat;
        background-size:100% 100%;
        &.can-draw{
          background:url(~@/assets/img/select_on.png) no-repeat;
          background-size:100% 100%;
        }
      }
    }
    .legend{
      display: flex;
      position: absolute;
      left:1060px;
      top:267px;
      height:20px;
      line-height:20px;
      .color{
        width:82px;
        height:20px;
        margin-right:9px;
        position: relative;
        &.g{
          background:#03e479;
        }
        &.y{
          background:#0091ff;
        }
        &.r{
          background:#fa4300;
        }
      }
      span{
        margin-right:20px;
        color:#fff;
        letter-spacing:.5px;
      }
    }
    .search{
      width:900px;
      height:110px;
      border:1px solid #30b7f2;
      border-radius:55px;
      position: absolute;
      left:2233px;
      top:252px;
      display:flex;
      background:rgba(0,0,0,0.8);
      input{
        outline: none;
        height:100%;
        width:750px;
        margin-left:40px;
        background:none;
        border:none;
        pointer-events: auto;
        caret-color:#fff;
        color:#fff;
        font-size:18px;
        letter-spacing:1px;
        &::-webkit-input-placeholder{
            color:#fff;
            font-size:18px;
            letter-spacing:1px;
        }
      }
      .btn{
        flex:1;
        background:url(~@/assets/img/search.png) no-repeat center center;
        background-size:65% 65%;
        pointer-events: auto;
      }
    }
    .card{
      width:224px;
      padding:16px 0; 
      position: absolute;
      left:1015px;
      bottom:50px;
      background:rgba(0,0,0,0.8);
      color:#fff;
      text-align: center;
      background:linear-gradient(-135deg,transparent 24px, rgba(0,0,0,0.6) 0) bottom right,;
      background-repeat: no-repeat;
      display:flex;
      flex-direction: column;
      justify-content:center;
      &>div{
        width:184px;
        height:166px;
        max-height:166px;
        background:url(~@/assets/img/card_bg.png) no-repeat center center;
        background-size:100% 100%;
        cursor: pointer;
        pointer-events:auto;
        font-size:24px;
        letter-spacing:2px;
        margin:11px auto;
        &.act{
          background:url(~@/assets/img/card_bg_act.png) no-repeat center center;
          background-size:100% 100%;
        }
        .icon{
          width:98px;
          height:98px;
          margin:0 auto;
          margin:10px auto 5px auto;
        }
        .yd{
          background:url(~@/assets/img/yd.png) no-repeat center center;
          background-size:100% 100%;
        }
        .rl{
          background:url(~@/assets/img/rl.png) no-repeat center center;
          background-size:100% 100%;
        }
        .mec{
          background:url(~@/assets/img/mec_icon.png) no-repeat center center;
          background-size:100% 100%;
        }
        .lssp{
          background:url(~@/assets/img/lssp.png) no-repeat center center;
          background-size:100% 100%;
        }
        .vsm{
          background:url(~@/assets/img/vsm.png) no-repeat center center;
          background-size:100% 100%;
        }
        .rsu{
          background:url(~@/assets/img/r.png) no-repeat center center;
          background-size:100% 100%;
        }
        .sj{
          background:url(~@/assets/img/sj_icon.png) no-repeat center center;
          background-size:100% 100%;
        }
      }
    }
    .notice{
      width:1408px;
      height:763px;
      border:1px solid #32c5ff;
      border-radius:20px;
      box-sizing:border-box;
      background:rgba(0,0,0,0.8) url(~@/assets/img/gj.png) no-repeat center -2px ;
      margin-top:500px;
      margin-left:1300px;
      color:#fff;
      font-size:30px;
      .content{
        margin:170px 0 0 96px;
        div{
          margin-bottom:90px;
          span{
            color:#fa6400;
            margin-right:32px;
          }
        }
      }
      .btns{
        width:1156px;
        margin:0 auto;
        display:flex;
        div{
          height:120px;
          line-height:120px;
          text-align: center;
          font-size:32px;
          font-weight:bold;
          letter-spacing:2px;
          border-radius:12px;
        }
        .detail{
            flex:1;
            background:#fa6400;
            border:2px solid #fb9857;
            margin-right:190px;
        }
        .cancel{
            flex:1;
            background:rgba(90,92,97,0.8);
            border:2px solid #fa6400;
            color: #fa6400;
        }
      }
    
    }
    .events{
        width:572px;
        padding-left:32px;
        height:194px;
        background:url(~@/assets/img/events_bg.png) no-repeat center center; 
        background-size:621 240px;
        position: absolute;
        right:720px;
        bottom:108px;
        pointer-events: none;
        .theme{
          display: flex;
          justify-content:space-around;
          color:#fff;
          font-size:18px;
          div{ 
              height:94px;
              padding-top:28px;
              &.w{
                background:url(~@/assets/img/wtpz.png) no-repeat center 58px; 
                background-size:26px 26px;
              }
              &.c{
                background:url(~@/assets/img/clpz.png) no-repeat center 58px; 
                background-size:26px 26px;
              }
              &.r{
                background:url(~@/assets/img/rypz.png) no-repeat center 58px; 
                background-size:26px 26px;
              }
              &.y{
                background:url(~@/assets/img/rysw.png) no-repeat center 58px; 
                background-size:26px 26px;
              }
          }
        }
        .num{
          display:flex;
          justify-content: space-around;
          color:#f7b500;
          height:40px;
          font-size:30px;
          font-weight:bold;
          margin-top:30px;
          text-align: center;
          div{
            width:130px;
            border-right:1px dashed #f7b500;
            &:last-child{
              border:none;
            }
          }
        }
        .icon{
          width:147px;
          height:147px;
          position:absolute;
          left:-113px;
          top:23px;
          border-radius:50%;
          .w{
            background:url(~@/assets/img/gjsj_w.png) no-repeat center center; 
            background-size:100% 100%;
            position:absolute;
            width:147px;
            height:147px;
            top:0;
            animation: rotate 3s linear infinite ;
          }
          .n{
            background:url(~@/assets/img/gjsj.png) no-repeat center center; 
            background-size:100% 100%;
            position:absolute;
            width:122px;
            height:122px;
            top:12px;
            left:12px;
          }
        }
    }
    .nav-tab{
      width:605px;
      height:1870px;
      overflow-y:scroll;
      pointer-events: auto;
      position:absolute;
      right:90px;
      top:220px;
      &::-webkit-scrollbar {/*滚动条整体样式*/
         width:6px;     /*高宽分别对应横竖滚动条的尺寸*/
         height:72px;
         background:rgba(0,0,0,0.2);
         border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
         border-radius: 3px;
         box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
         background: #32c5ff;
      }
      .tab:last-child{
        margin-bottom:0;
      }
    }
  }
}
#map{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
</style>
