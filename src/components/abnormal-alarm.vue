<template>
    <div class="abnormal-alarm">
        <div class="section s1">
           <div class="topic"></div>
           <div class="flex-box">
                <div class="pie-wrap" :class="level">
                   <div class="circle"></div>
                   <div class="pie"></div>
                </div>
                <div class="legend">
                     <div class="item">
                         <div class="label">雷士检测器</div>
                         <div class="num"><span>1</span>个</div>
                     </div>
                     <div class="item">
                         <div class="label">MEC</div>
                         <div class="num"><span>3</span>个</div>
                     </div>
                     <div class="item">
                         <div class="label">RSU</div>
                         <div class="num"><span>0</span>个</div>
                     </div>
                     <div class="item">
                         <div class="label">可变信息版</div>
                         <div class="num"><span>0</span>个</div>
                     </div>
                </div>
           </div>
           <pro-table :columns="columns1" :data="data">
                <template slot="status" slot-scope="{record}">
                    <span v-if="record.status === 0" style="color:#fa6400">▶ 未处理</span>
                    <span v-else style="color:#03e479">▶ 已处理</span>
                </template>
            </pro-table>
        </div>
        <div class="section s2">
            <div class="topic"></div>
            <div id="sltj"></div>
        </div>
        <div class="section s3">
            <div class="topic"></div>
            <div class="card-box">
                <div class="item">
                    <div class="t">MEC</div>
                    <div class="n"><span>20</span>个</div>
                </div>
                 <div class="item">
                    <div class="t">雷视检测器</div>
                    <div class="n"><span>108</span>个</div>
                </div>
                 <div class="item">
                    <div class="t">ASU</div>
                    <div class="n"><span>61</span>个</div>
                </div>
                 <div class="item">
                    <div class="t">可变信息版</div>
                    <div class="n"><span>24</span>个</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@keyframes rotate{
      from{transform: rotate(0deg)}
      to{transform: rotate(360deg)}
}
.abnormal-alarm{
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
        .table .tbody .tr:nth-child(odd){
            background:rgab(0,0,0,0)!important;
        }
        .table .tbody .tr:nth-child(even){
            background:rgab(0,0,0,0)!important;
        }
        .thead .tr{
           border:1px solid #979797;
           background:#484b53;
           margin-bottom:10px;
           font-size:18px;
        }
        .label{
            span{
              background:#fa6400;
              padding:5px 10px;
              letter-spacing:2px;
            }
        }
        .topic{
            height:74px;
            background:url(~@/assets/img/ycbj_topic.png) no-repeat center center;
            background-size:806px 74px;
        }
        .flex-box{
            display:flex;
            margin:32px 0 50px 0;
            .pie-wrap{
                position: relative;
                width:262px;
                height:262px;
                margin:0 35px;
                div{
                    height:262px;
                }
                .circle,.pie{
                    width:262px;
                    height:262px;
                    position:absolute;
                    top:0;
                    left:0;
                }
                .circle{
                    z-index:999;
                    animation: rotate 3s linear infinite ;
                }
                &.gao{
                    .circle{
                        background:url(~@/assets/img/g_outer.png) no-repeat center center;
                        background-size:100% 100%;
                    }
                    .pie{
                        background:url(~@/assets/img/g_inner.png) no-repeat center center;
                        background-size:100% 100%;
                    }
                }
                &.zhong{
                    .circle{
                        background:url(~@/assets/img/z_outer.png) no-repeat center center;
                        background-size:100% 100%;
                    }
                    .pie{
                        background:url(~@/assets/img/z_inner.png) no-repeat center center;
                        background-size:100% 100%;
                    }
                }
                &.di{
                    .circle{
                        background:url(~@/assets/img/d_outer.png) no-repeat center center;
                        background-size:100% 100%;
                    }
                    .pie{
                        background:url(~@/assets/img/d_inner.png) no-repeat center center;
                        background-size:100% 100%;
                    }
                }
              
            }
        }
        .legend{
           flex:1;
           height:180px;
           display:flex;
           flex-wrap:wrap;
           letter-spacing:2px;
           margin:50px 0 0 34px; 
           .item{
               width:220px;
               height:90px;
               justify-content:space-around;
               font-size:24px;
               .label{
                   border-left:4px solid #32c5ff;
                   height:22px;
                   line-height:22px;
                   padding-left:10px;
               }
               .num span{
                   color:#f7b500;
                   font-weight: bold;
                   font-size:36px;
                   line-height:68px;
               }
           }
           color:#fff;
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
         background:url(~@/assets/img/sbzt.png) no-repeat center center;
         background-size:806px 44px;
       }
       #sltj{
           height:420px;
       }
    }
    .s3{
       .topic{
         height:74px;
         margin-bottom:10px;
         background:url(~@/assets/img/sltj.png) no-repeat center center;
         background-size:806px 44px;
       }
       .card-box{
           width:828px;
           margin-left:-10px;
           display:flex;
           flex-wrap:wrap;
           .item{
               width:414px;
               height:170px;
               background:url(~@/assets/img/sltj_bg.png) no-repeat center center;
               background-size:100% 100%;
               position: relative;
               margin-bottom:26px;
               .t{
                   font-size:20px;
                   letter-spacing:2px;
                   font-weight:bold;
                   color:#fff;
                   position: absolute;
                   top:40px;
                   left:40px;
               }
               .n{
                   font-size:22px;
                   letter-spacing:2px;
                   font-weight:bold;
                   color:#fff;
                   position: absolute;
                   bottom:30px;
                   right:20px;
                   span{
                       color:'#f8ba00'
                   }
               }
           }
       }
    }
}
@keyframes run {
    from{
       transform:scaleX(.5);
    }
    to{
       transform:scaleX(1);
    }
}
</style>
<script>
import ProTable from './pro-table'
import CircleProgress from './circle-progress'
import { echarts } from '../utils/echarts'

export default {
    name:'AbnormalAlarm',
    components:{
        ProTable,
        CircleProgress
    },
    data(){
        return {
          level:'di',
          columns1:[
            {
                title:'设备编号',
                dataIndex:'start',
                width:'25%'
            },
            {
                title:'设备类型',
                dataIndex:'end',
                width:'25%'
            },
            {
                title:'异常问题',
                dataIndex:'question',
                width:'35%'
            },
            {
                title:'处理状态',
                dataIndex:'status',
                width:'35%',
                slot:'status'
            }
          ],
          data:[
              {
                  start:'SP1002',
                  end:'雷视检测器',
                  question:'天线无采集数据',
                  status:0
              },
              {
                  start:'2',
                  end:'MEC',
                  question:'离线',
                  status:0
              },
              {
                  start:'3',
                  end:'RSU',
                  question:'离线',
                  status:1
              },
              {
                  start:'4',
                  end:'可变信息版',
                  question:'天线无采集数据',
                  status:0
              }              
          ],
          congestion:0,
          color:6,
          tabOnInd:0
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
        
        var lineChart = echarts.init(document.getElementById('sltj'));

        var lineOption = {
            title:{
                text:'当日设备状况比例',
                textStyle:{
                    fontWeight:'normal',
                    color:'#cacccd'
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['MEC', 'RSU', '雷视检测器', '可变信息版'],
                axisLabel:{
                    color:'#fff',
                    margin:30,
                    fontSize:16,
                    fontWeight:'bold'
                },
                axisTick:{
                    lineStyle:{
                       width:2
                    }
                },
                axisLine:{
                    lineStyle:{
                        width:2,
                        color:'#fff'
                    }
                }
            },
            yAxis: {
                type: 'value',
                offset:18,
                interval:10,
                axisTick:{
                    lineStyle:{
                       width:2
                    }
                },
                axisLabel:{
                    color:'#fff',
                    margin:10,
                    fontSize:16,
                    fontWeight:'bold',
                    formatter: '{value}%'
                },
                axisLine:{
                    symbol:'none',
                    lineStyle:{
                        width:2,
                        color:'#fff'
                    }
                },
                splitLine:{
                    show:false
                }
            },
            series: [{
                data: [98.32, 99.10,97.23,92.12],
                type: 'line',
                itemStyle:{
                    color:'#61E4FF'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(50, 170, 255,0.5)'
                    }, {
                        offset: 1,
                        color: 'rgb(50, 170, 255,0)'
                    }])
                }
            }]
        };

        lineChart.setOption(lineOption)

    }
}
</script>
