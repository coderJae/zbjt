<template>
    <div class="traffic-working">
        <div class="section s1">
           <div class="topic"></div>
           <div class="flex-box">
                <div class="pie-wrap">
                   <div id="pie">
                   </div>
                   <div class="icon-bg"></div>
                   <div class="car"></div>
                </div>
                <div class="legend">
                     <div class="item">
                         <span class="level">严重</span>
                         <div class="dot"></div>
                         <span>20%</span>
                     </div>
                     <div class="item">
                         <span class="level">一般</span>
                         <div class="dot"></div>
                         <span>30%</span>
                     </div>
                     <div class="item">
                         <span class="level">轻微</span>
                         <div class="dot"></div>
                         <span>50%</span>
                     </div>
                </div>
           </div>
           <pro-table :columns="columns1" :data="data1">
                <template slot="index" slot-scope="{record}">
                    <div :class="[record.index <= 3?'y':'b' ]" class="label"><span>严重</span></div>
                </template>
                <template slot="level" slot-scope="{record}">
                    <span v-if = "record.level === 0" style="background:#f7b500;padding:7px 15px;border-radius:3px">
                        一般
                    </span>
                    <span v-else  style="background:#fa6400;padding:7px 15px;border-radius:3px">
                        严重
                    </span>
                </template>
                <template slot="status" slot-scope="{record}">
                    <span v-if="record.status === 0" style="color:#fa6400">▶ 未处理</span>
                    <span v-else style="color:#03e479">▶ 已处理</span>
                </template>
            </pro-table>
        </div>
        <div class="section s2">
            <div class="topic"></div>
            <div class="charts">
                <div v-show="tabOnInd == 0" id="qjlx">
                
                </div>
                <div id="cflx">

                </div>
            </div>
            <div class="tab-sw">
                <div v-for="(item,index) in [0,1]" :key="item" class="item" :class="[tabOnInd == index?'on':'']" @click="pickThis(index)"> </div>
            </div>
            <div class="qjll">
                <div class="topic"><span>高</span><span>发</span><span>区</span><span>间</span></div>
                <div class="table">
                    <pro-table :columns="columns" :data="gfqjData">
                        <template slot="index" slot-scope="{record}">
                            <div :class="[record.index <= 3?'y':'b' ]" class="label">{{record.index}}</div>
                        </template>
                        <template slot="speed" slot-scope="{record}">
                            <span style="color:#3abefa">{{record.speed}}</span>
                        </template>
                    </pro-table>
                </div>
            </div>
            <div class="qjll">
                <div class="topic"><span>常</span><span>发</span><span>类</span><span>型</span></div>
                <div class="table">
                    <pro-table :columns="cflxColumns" :data="cflxData">
                        <template slot="index" slot-scope="{record}">
                            <div :class="[record.index <= 3?'y':'b' ]" class="label">{{record.index}}</div>
                        </template>
                        <template slot="speed" slot-scope="{record}">
                            <span style="color:#04d672">{{record.speed}}</span>
                        </template>
                    </pro-table>
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
.traffic-working{
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
            background:url(~@/assets/img/sjgz.png) no-repeat center center;
            background-size:806px 74px;
        }
        .flex-box{
            display:flex;
            margin-top:32px;
            .pie-wrap{
                position: relative;
                width:216px;
                height:216px;
                margin:40px 66px;
                #pie{
                    height:100%;
                }
                .icon-bg{
                    width:180px;
                    height:180px;
                    background:url(~@/assets/img/icon_bg.png) no-repeat center center;
                    background-size:100% 100%;
                    position:absolute;
                    top:18px;
                    left:18px;
                    z-index:999;
                    animation: rotate 3s linear infinite ;
                }
                .car{
                    width:180px;
                    height:180px;
                    background:url(~@/assets/img/car.png) no-repeat center center;
                    background-size:100% 100%;
                    position:absolute;
                    top:18px;
                    left:18px;
                    z-index:999;
                }
            }
        }
        .legend{
           flex:1;
           height:190px;
           border-left:2px dashed #355a8b;
           padding-left:200px;
           margin-top:50px;
           display:flex;
           flex-direction:column;
           justify-content:space-between;
           letter-spacing:2px;
           .item{
               display:flex;
               justify-content:space-around;
               font-size:26px;
               .level{
                   letter-spacing:5px;
               }
               .dot{
                   width:10px;
                   height:10px;
                   border-radius:50%;
                   background:yellow;
                   position: relative;
                   top:50%;
                   margin-top:-5px;
                   margin-left:50px;
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
         background:url(~@/assets/img/sjgz.png) no-repeat center center;
         background-size:806px 74px;
       }
      .charts{
          overflow: hidden;
          height:307px;
          margin-top:30px;
          #qjlx{
            width:100%;
            height:307px;
            background:url(~@/assets/img/bar_bg.png) repeat-x  top left;
            background-size:90px 282px;
         }
         #cflx{
            height:307px;
        }
      }
      .tab-sw{
          display:flex;
          margin-top:10px;
          justify-content:center;
          .item{
              width:54px;
              height:6px;
              margin:0 5px;
              cursor: pointer;
              background:#272930;
              &.on{
                  background:#46484d;
              }
          }
      }
      .qjll{
            display:flex;
            padding-bottom:20px;
            border-bottom:1px dashed #226c8b;
            margin-top:12px;
            .topic{
                width:98px;
                height:233px;
                border:2px solid #fff;
                border-radius:4px;
                font-size:30px;
                color:#fff;
                display:flex;
                flex-direction:column;
                text-align:center;
                justify-content:space-around;
                background:#46474b;
                position: relative;
                top:55px;
                margin-right:36px;
            }
            .table{
                flex:1;
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
import { echarts } from './echarts'

export default {
    name:'TrafficEvents',
    components:{
        ProTable,
        CircleProgress
    },
    data(){
        return {
          columns1:[
            {
                title:'等级',
                dataIndex:'level',
                width:'25%',
                slot:'level'
            },
            {
                title:'发生位置',
                dataIndex:'end',
                width:'25%'
            },
            {
                title:'场景类型',
                dataIndex:'type',
                width:'35%'
            },
            {
                title:'处理状态',
                dataIndex:'status',
                width:'35%',
                slot:'status'
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
                title:'起点',
                dataIndex:'start',
                width:'25%'
            },
            {
                title:'终点',
                dataIndex:'end',
                width:'25%'
            },
            {
                title:'数量',
                dataIndex:'number',
                width:'35%',
                slot:'number'
            }
          ],
          cflxColumns:[
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
                title:'数量（起）',
                dataIndex:'number',
                width:'25%'
            }
          ],
          data1:[
              {
                  level:1,
                  end:'KS45+102',
                  type:'违章停车',
                  status:0
              },
              {
                  level:1,
                  end:'KX69+408',
                  type:'交通事故',
                  status:0
              },
              {
                  level:1,
                  end:'KS49+310',
                  type:'占用紧急车道',
                  status:1
              },
              {
                  level:0,
                  end:'KS45+102',
                  type:'压线',
                  status:1
              },
              {
                  level:1,
                  end:'KS51+210',
                  type:'超速',
                  status:0
              }
          ],
          gfqjData:[
              {
                  start:'KX25',
                  end:'KX32',
                  number:14
              },
              {
                  start:'KX42',
                  end:'KX68',
                  number:10
              },
              {
                  start:'KX32',
                  end:'KX45',
                  number:7
              },
              {
                  start:'KX18',
                  end:'KX56',
                  number:5
              },
              {
                  start:'KX22',
                  end:'KX48',
                  number:3
              }
          ],
          cflxData:[
             {
               type:'停车事件',
               number:6
             },
             {
               type:'超速事件',
               number:15
             },
             {
               type:'占用车道事件',
               number:4
             },
             {
               type:'交通事故',
               number:2
             },
             {
               type:'压线',
               number:10
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
         // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie'));
        var colors = ['#d8d8d8', '#fa6600', '#ffb98a'];

        var option = {
                tooltip: {
                   show:false
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['85%', '95%'],
                        hoverAnimation:false,
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 335, name: '严重'},
                            {value: 310, name: '一般',},
                            {value: 234, name: '轻微'}
                        ],
                        itemStyle:{
                            normal:{
                                borderWidth:5,
                                borderColor:"#31324b",
                                color:function(params) {
                                //自定义颜色
                                var colorList = [          
                                        '#03e479', '#f7b500', '#fa6400'];
                                    return colorList[params.dataIndex]
                                    }
                            }
                        }
                    }
                ]
        };
    

        // 绘制图表
        myChart.setOption(option);

        
        var lineChart = echarts.init(document.getElementById('qjlx'));

        var lineOption = {
            grid:{
                left:-5,
                right:0,
                bottom:25,
                top:15
            },
            xAxis: {
                type: 'category',
                data: ['03:00:00', '03:00:00', '03:00:00', '03:00:00', '03:00:00', '03:00:00', '03:00:00','03:00:00','03:00:00'],
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:'#fcca00',
                        fontSize:'18',
                        fontWeight:'bold'
                    }
                },
                axisTick:{
                    show:false
                }
            },
            yAxis: {
                type: 'value',
                splitLine:{
                    show:false
                }
            },
            series: [{
                type: 'line',
                smooth:true,
                symbol: "path://M512,518.9119873046875m-192,0a192,192,0,1,0,384,0a192,192,0,1,0,-384,0Z M873.8560180664062,150.1439971923828C774.2080078125,50.560001373291016,652.416015625,0,512,0S249.79200744628906,50.560001373291016,150.1439971923828,150.1439971923828C50.560001373291016,249.79200744628906,0,371.5840148925781,0,512c0,140.47998046875,50.560001373291016,262.27197265625,150.1439971923828,361.85601806640625C249.79200744628906,973.5040283203125,371.5840148925781,1024,512,1024s262.2080078125,-50.4959716796875,361.85601806640625,-150.14398193359375C973.5040283203125,774.27197265625,1024,652.47998046875,1024,512c0,-140.41598510742188,-50.4959716796875,-262.20799255371094,-150.14398193359375,-361.8560028076172Zm-45.248046875,678.4639739990234C740.1599731445312,917.0560302734375,636.5440063476562,960,512,960c-124.60800170898438,0,-228.16000366210938,-42.9439697265625,-316.6080017089844,-131.39202880859375C106.94400024414062,740.2239990234375,64,636.6079711914062,64,512s42.944000244140625,-228.16000366210938,131.39199829101562,-316.6080017089844C283.8399963378906,106.94400024414062,387.3919982910156,64,512,64c124.54400634765625,0,228.15997314453125,42.944000244140625,316.60797119140625,131.39199829101562C917.0560302734375,283.8399963378906,960,387.3919982910156,960,512s-42.9439697265625,228.2239990234375,-131.39202880859375,316.60797119140625Z",
                symbolSize:16,
                itemStyle: {
                    normal: {
                        color: "#fff",
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    emphasis:{
                        color: "#32c5ff"
                    }
                },
                data: [120, 200, 150, 80, 70, 110, 130,120,110]
            }]
        };

        lineChart.setOption(lineOption)


        // 饼图
        var pieChart = echarts.init(document.getElementById('cflx'));

        var pieOption = {
                title: {
                    text: "2020.10.27",
                    subtext: "16:38:00",
                    left: "center",
                    top: "center",
                    textStyle: {
                      color:'#fff',
                      fontSize: 24
                    },
                    subtextStyle: {
                      color:'#f7b500',
                      fontSize: 20
                    }
                },
                tooltip: {
                   show:false
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '85%'],
                        hoverAnimation:false,
                        avoidLabelOverlap: false,
                        label:{
                            fontSize:14,
                            formatter: [
                                '{a|{b}}',
                                '{b|{d}%}'
                            ].join('\n'),
                            rich: {
                                a: {
                                    color: '#fff',
                                    fontSize:16
                                },
                                b: {
                                    color:'#f8b600',
                                    height: 20,
                                    align:'center'
                                }
                            }
                        },
                        labelLine: {
                            length2:50,
                            lineStyle:{
                                color:'#21a7db'
                            }
                        },
                        data: [
                            {value: 335, name: '停车事件'},
                            {value: 310, name: '占用车道',},
                            {value: 234, name: '交通事件'},
                            {value: 234, name: '违章压线'},
                            {value: 234, name: '超速事件'}
                        ],
                        itemStyle:{
                            normal:{
                                borderWidth:5,
                                borderColor:"#31324b",
                                color:function(params) {
                                //自定义颜色
                                var colorList = [          
                                        '#22c4ff', '#ff3630', '#fc6300','#f9b600','#00e675'];
                                    return colorList[params.dataIndex]
                                    }
                            }
                        }
                    }
                ]
        };
        
        pieChart.setOption(pieOption)

    }
}
</script>
