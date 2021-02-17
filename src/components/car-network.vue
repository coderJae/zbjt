<template>
    <div class="car-network">
        <div class="section s1">
           <div class="topic"></div>
           <div class="flex-box">
               <div class="l">
                   <div class="n">6772</div>
                   <div class="t">
                       <div class="zw">总服务次数</div>
                       <div class="yw">TOTAL</div>
                   </div>
               </div>
               <div class="pic"></div>
           </div>
           <div class="bar-box">
                <div class="item" v-for="(item,index) in services" :key="index">
                    <div class="l">{{item.name}}</div>
                    <div class="r">
                        <div class="r-t">
                            <div class="inner" :style="{width: (item.total / 6772) * 100 + '%'}"></div>
                        </div>
                        <div class="r-b">
                            <div class="r-b-l">{{item.content}}</div>
                            <div class="r-b-r">{{item.total}}</div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
        <div class="section s2">
            <div class="topic"></div>
            <div class="base-wrap">
                <div class="item" v-for="(item,index) in baseServices" :key="index">
                     <div class="t">
                         <span>{{item.total}}</span>车次
                     </div>
                     <div class="b">{{item.topic}}</div>
                </div>
            </div>
            <div class="page">
                <div class="prev l">上一页</div>
                <div class="num">1/1</div>
                <div class="next r">下一页</div>
            </div>
        </div>
        <div class="section s3">
            <div class="topic"></div>
            <pro-table :columns="columns" :data="data">
                <template slot="index" slot-scope="{record}">
                    <div :class="[record.index <= 3?'y':'b' ]" class="label">{{record.index}}</div>
                </template>
                <template slot="speed" slot-scope="{record}">
                    <span style="color:#04d672">{{record.speed}}</span>
                </template>
            </pro-table>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.car-network{
    width:850px;
    position: absolute;
    top:210px;
    left:156px;
    pointer-events: auto;
    .section{
      background:rgba(0,0,0,0.8);
      border-radius:6px;
      padding:22px;
      margin-bottom:12px;
      box-shadow: 0 0 10px 1px rgba(0,0,0,0.8);
    }
    .s1{
        .topic{
            height:74px;
            background:url(~@/assets/img/clwfw.png) no-repeat center center;
            background-size:806px 74px;
        }
        .flex-box{
            display:flex;
            margin:32px 0;
            .l{
                height:56px;
                margin:50px 30px;
                flex:1;
                display:flex;
                .n{
                    font-size:56px;
                    line-height:56px;
                    color:#f8ba00;
                    font-weight:bold;
                }
                .t{
                    margin-left:35px;
                    color:#fff;
                    .zw{
                        font-size:20px;
                        font-weight:bold;
                        margin-top:11px;
                        line-height:100%;
                    }
                    .yw{
                        color:#b8bbbd;
                    }
                }
            }
            .pic{
                width:285px;
                height:157px;
                margin:0 15px;
                background:url(~@/assets/img/car_fw.png) no-repeat center center;
                background-size:100% 100%;
            }
        }
        .bar-box{
            .item{
               display:flex;
               margin-bottom:32px;
               &:last-child{
                   margin-bottom:0;
               }
               .l{
                    width:72px;
                    height:72px;
                    border:2px solid #fff;
                    border-radius:50%;
                    text-align:center;
                    line-height:72px;
                    color:#fff;
                    font-size:30px;
                }
                .r{
                    flex:1;
                    margin-top:10px;
                    margin-left:10px;
                    .r-t{
                        height:10px;
                        background:#292d38;
                        border-radius:5px;
                        .inner{
                            height:10px;
                            border-radius:5px;
                            background:linear-gradient(to right, #60e4ff ,#32c5ff);
                        }
                    }
                    .r-b{
                        display: flex;
                        font-size:18px;
                        font-weight:bold;
                        color:#fff;
                        justify-content:space-between;
                        margin-top:20px;
                        .r-b-l{
                            letter-spacing:2px;
                        }
                        .r-b-r{
                            color:#f8ba00
                        }
                    }
                }
            }
        }
        .theme{
            height:26px;
            background:url(~@/assets/img/theme_bg.png) no-repeat center bottom;

        }
        .title{
          color:#f1f1f1;
          letter-spacing:2px;
          margin-left:26px;
          margin-bottom:16px;
        }
    }
    .s2{
       .topic{
         height:74px;
         margin-bottom:10px;
         background:url(~@/assets/img/wlcfw.png) no-repeat center center;
         background-size:806px 44px;
       }
       .base-wrap{
           color:#fff;
           display:flex;
           flex-wrap:wrap;
           .item{
               width:32%;
               height:203px;
               font-size:22px;
               position: relative;
               &:nth-child(1)::before,&:nth-child(2)::before{
                  content:'';
                  width:20px;
                  height:2px;
                  background:#fff;
                  position: absolute;
                  right:2px;
                  bottom:0;
               }
               &:nth-child(3n - 1){
                  width:36%;
                  .t{
                      margin-left:30px;
                  }
                  .b{
                      margin-left:30px;
                   }
               }
               background:url(~@/assets/img/line_bg.png) no-repeat top right;
               background-size:6px 203px;
               &:nth-child(n + 4){
                  background:url(~@/assets/img/line_bg_b.png) no-repeat top right;
                  background-size:6px 203px;
                   .t{
                        margin-top:25px;
                    }
               }
               &:nth-child(3n){
                  background:none;
               }
               .t{
                   margin-top:70px;
                   margin-left:15px;
                   span{
                       color:#f7b500;
                       font-size:50px;
                       font-weight:bold;
                       margin-right:50px;
                   }
               }
               .b{
                   margin-left:15px;
                   letter-spacing:3px;
                   color:#b8b9bb;
               }
           }
       }
       .page{
           display:flex;
           justify-content:space-between;
           color:#fff;
           line-height:60px;
           margin-top:8px;
           .prev,.next{
               width:180px;
               height:60px;
               font-size:18px;
               border:1px solid #2f3032;
               text-align:center;
           }
           .num{
               font-size:26px;
           }
           .prev{
               border-top-right-radius: 30px;
               border-bottom-right-radius: 30px;
           }
           .next{
               border-top-left-radius: 30px;
               border-bottom-left-radius: 30px;
           }
       }
    }
    .s3{
       height:447px;
       .topic{
         height:74px;
         background:url(~@/assets/img/ptclxxfw.png) no-repeat center center;
         background-size:806px 44px;
       }
       .label{
            display:inline-block;
            width:42px;
            height:27px;
            color:#31324b;
            border-radius:3px;
            line-height:27px;
            font-weight:bold;
        }
        .y{
            background:#e38e33;
        }
        .b{
            background:#6096de;
        }
    }
}
</style>
<script>
import ProTable from './pro-table'

export default {
    name:'CarNetwork',
    components:{
        ProTable
    },
    data(){
        return {
          services:[
              {
                  name:'危',
                  content:'危险驾驶及违章行为预警',
                  total:1299
              },
              {
                  name:'误',
                  content:'错误行驶预警',
                  total:1832
              },
              {
                  name:'慢',
                  content:'车辆慢行预警',
                  total:739
              },
              {
                  name:'超',
                  content:'车辆超速预警',
                  total:2101
              },
              {
                  name:'逆',
                  content:'错误逆行预警',
                  total:801
              }
          ],
          columns:[
            {
                title:'排名',
                dataIndex:'index',
                width:'15%',
                slot:'index'
            },
            {
                title:'类型',
                dataIndex:'type',
                width:'25%'
            },
            {
                title:'发布点位',
                dataIndex:'point',
                width:'25%'
            }
          ],
          data:[
              {
                  type:'浓雾预警',
                  point:103
              },
              {
                  type:'道路障碍物预警',
                  point:120
              },
              {
                  type:'连续弯路提醒',
                  point:112
              },
              {
                  type:'危险地段预警',
                  point:102
              },
              {
                  type:'前方桥隧预警',
                  point:106
              },
          ],
          baseServices:[
              {
                  topic:'禁止停车预警',
                  total:1299
              },
              {
                  topic:'大货车识别预警',
                  total:1500
              },
              {
                  topic:'行人装马路警告',
                  total:1382
              },
              {
                  topic:'静止车辆预警',
                  total:1420
              },
              {
                  topic:'道路限速预警',
                  total:1483
              }
          ]
        }
    },
    methods:{
       pickThis(e){
           this.tabOnInd = e
       }
    },
    mounted(){
        setInterval(() => {
            if(this.congestion>=180){
                this.congestion = 180
            }else{
                this.congestion = this.congestion + 3
            }
        }, 100);
    
    }
}
</script>
