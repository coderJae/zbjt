<template>
    <div class="traffic-working">
        <div class="section s1">
           <div class="topic"></div>
           <div class="flex-box">
                <div class="meter">
                    <div class="title">当日交通指数</div>
                    <div class="dial">
                        <div class="process" :style="{transform:`rotate(${congestion}deg)`}"></div>
                        <div class="point">
                            <div class="sz">36</div>
                            <div class="hz">较畅通</div>
                        </div>
                    </div>
                    <div class="legend">
                        <div class="item num">
                            <span>0</span>
                            <span>20</span>
                            <span>40</span>
                            <span>60</span>
                            <span>80</span>
                            <span>100</span>
                        </div>
                        <div class="item color">
                            <div style="background:#3b831d"></div>
                            <div style="background:#708d0d"></div>
                            <div style="background:#a27a0d"></div>
                            <div style="background:#a4470d"></div>
                            <div style="background:#941d21"></div>
                        </div>
                        <div class="item hz">
                            <div>畅通</div>
                            <div>较畅通</div>
                            <div>缓慢</div>
                            <div>较拥挤</div>
                            <div>堵塞</div>
                        </div>
                    </div>
                </div>
                <div class="road">
                    <div class="title">当日路况路段比例</div>
                    <div class="bar">
                            <div v-for="(item,index) in road" :key="index" class="item">
                                <div class="top">
                                    <div class="dot" :style="{backgroundColor:item.cs}"></div>
                                    <span class="tt">{{item.title}}</span>
                                    <span>【{{`${item.p}%`}}】</span>
                                </div>
                                <div class="outer">
                                    <div class="inner" :style="{width:`${item.p}%`,backgroundImage:`linear-gradient( to right,${item.cs},${item.ce})`}"></div>
                                </div>
                            </div>
                    </div>
                </div>
           </div>
           <div class="road-rank">
             <div class="thead">
                <div>排行</div>
                <div>起点</div>
                <div>终点</div>
                <div>指数</div>
             </div>
             <div class="tbody">
                 <div v-for="(item,index) in data" :key="index" class="tr">
                    <div class="index" :class="[index<3?'color':'']">{{ index < 9 ? `0${index+1}`:'' }}</div>
                    <div class="start">{{item.start}}</div>
                    <div class="hl"> — </div>
                    <div class="end">{{item.end}}</div>
                    <div class="vl"></div>
                    <div class="blocks">
                        <div class="t">
                            <template v-for="(item,index) in [0,1,2,3,4,5,6,7]">
                                <div :key="index" class="item" :class="[color>index?`color-${Math.floor(index/2)}`:'']"></div>
                            </template>
                        </div>
                        <div class="t">
                            <template v-for="(item,index) in [0,1,2,3,4,5,6,7]">
                                <div :key="index" class="item" :class="[color>index?`color-${Math.floor(index/2)}`:'']"></div>
                            </template>
                        </div>
                    </div>
                    <div class="circle">
                        <circle-progress :indict="item.speed" :pn="item.pn"/>
                    </div>
                    <div class="hblocks">
                        <div class="b1"></div>
                        <div class="b2"></div>
                        <div class="b3"></div>
                    </div>
                 </div>
             </div>
           </div>
        </div>
        <div class="section s2">
            <div id="lljs">
               
            </div>
            <div class="qjll border">
                <div class="topic"><span>区</span><span>间</span><span>流</span><span>量</span></div>
                <div class="table">
                    <pro-table :columns="columns" :data="qjllData">
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
                <div class="topic"><span>平</span><span>均</span><span>速</span><span>度</span></div>
                <div class="table">
                    <pro-table :columns="columns" :data="pjsdData">
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

<script>
import ProTable from './pro-table'
import CircleProgress from './circle-progress'
import { echarts } from '../utils/echarts'

export default {
    name:'TrafficWorking',
    components:{
        ProTable,
        CircleProgress
    },
    data(){
        return {
          road:[
              {
                  title:'畅通',
                  cs:'#07feb8',
                  ce:'#00ff8a',
                  p:25
              },
              {
                  title:'较畅通',
                  cs:'#6dd400',
                  ce:'#529e01',
                  p:40
              },
              {
                  title:'缓慢',
                  cs:'#fcdb00',
                  ce:'#f7b600',
                  p:20
              },
              {
                  title:'较拥堵',
                  cs:'#fd9b00',
                  ce:'#f06203',
                  p:10
              },
              {
                  title:'堵塞',
                  cs:'#de1e1e',
                  ce:'#bc0607',
                  p:5
              }
          ],
          columns:[
            {
                title:'排名',
                dataIndex:'index',
                width:'20%',
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
                title:'流量（辆/h）',
                dataIndex:'speed',
                width:'35%',
                slot:'speed'
            }
          ],
          data:[
              {
                  start:'KS25+300',
                  end:'KS32+102',
                  speed:86,
                  pn:203
              },
              {
                  start:'KS40+210',
                  end:'KS55+140',
                  speed:78,
                  pn:40
              },
              {
                  start:'KS58+200',
                  end:'KS68+320',
                  speed:83,
                  pn:126
              },
              {
                  start:'KX17+220',
                  end:'KX37+180',
                  speed:80,
                  pn:90
              },
              {
                  start:'KX42+210',
                  end:'KX70+190',
                  speed:79,
                  pn:228
              }
          ],
          qjllData:[
              {
                  start:'KS25+300',
                  end:'KS32+102',
                  speed:2580
              },
               {
                  start:'KS40+210',
                  end:'KS55+140',
                  speed:3120
              },
               {
                  start:'KS58+200',
                  end:'KS68+320',
                  speed:2983
              },
               {
                  start:'KX17+220',
                  end:'KX37+180',
                  speed:3521
              },
               {
                  start:'KX42+210',
                  end:'KX70+190',
                  speed:3013
              }
          ],
          pjsdData:[
              {
                  start:'KS25+300',
                  end:'KS32+102',
                  speed:63.5
              },
               {
                  start:'KS40+210',
                  end:'KS55+140',
                  speed:70.2
              },
               {
                  start:'KS58+200',
                  end:'KS68+320',
                  speed:68.4
              },
               {
                  start:'KX17+220',
                  end:'KX37+180',
                  speed:69.5
              },
               {
                  start:'KX42+210',
                  end:'KX70+190',
                  speed:72.1
              },
            
          ],
          congestion:0,
          color:6
        }
    },
    methods:{
     
    },
    mounted(){
        setInterval(() => {
            if(this.congestion>=180){
                this.congestion = 180
            }else{
                this.congestion = this.congestion + 3
                if(this.congestion >= 36){
                    this.congestion = 36
                }
            }
        }, 100);
         // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('lljs'));
        var colors = ['#d8d8d8', '#fa6600', '#ffb98a'];

        var option = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                right:40,
                left:40,
                bottom:20
            },
            legend: {
                textStyle:{
                    color:'#fff'
                },
                data: ['正向流量', '反向流量', '均速']
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '正向流量',
                    min: 0,
                    max: 250,
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                {
                    type: 'value',
                    name: '均速 (km/h)',
                    min: 0,
                    max: 25,
                    position: 'right',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '正向流量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    barWidth: 10,
                },
                {
                    name: '反向流量',
                    type: 'bar',
                    barWidth: 10,
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: '均速',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };

        // 绘制图表
        myChart.setOption(option);
    }
}
</script>
<style lang="scss" scoped>
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
        .topic{
            height:74px;
            background:url(~@/assets/img/ydzs.png) no-repeat center center;
            background-size:848px 74px;
        }
        .flex-box{
            display:flex;
            margin-top:32px;
                .meter{
                  flex:1;
                  .dial{
                      width:442px;
                      height:222px;
                      position: relative;
                      background:url(~@/assets/img/kd_bg.png) no-repeat top center;
                      background-size:442px 442px;
                      overflow: hidden;
                      margin-top:-10px;
                      .process{
                        width:442px;
                        height:442px;
                        background:url(~@/assets/img/jdt.png) no-repeat top center;
                        background-size:442px 442px;
                        transition:all .3s;
                      }
                      .point{
                          position:absolute;
                          font-size:30px;
                          z-index:999;
                          color:#03e479;
                          text-align:center;
                          bottom:0;
                          width:100%;
                          line-height:100%;
                          .sz{
                              font-size:60px;
                              font-weight:bold;
                              margin-bottom:20px;
                          }
                          .wz{
                              letter-spacing:2px;
                          }
                      }
                  }
                  .legend{
                      margin:28px auto;
                      width:367px;
                      .item{
                          display:flex;
                          &.num{
                             justify-content:space-between; 
                             color:#5f5f60;
                          }
                          &.color{
                            height:6px;
                            margin:5px 0;
                            border-radius:3px;
                            overflow: hidden;
                          }
                          div{
                            flex:1;
                            text-align: center;
                            color:#fff;
                          }
                      }
                  }
                }
                .road{
                    width:345px;
                    .bar{
                        border-left:1px dashed #335886;
                        padding-left:24px;
                        font-size:18px;
                        // font-weight:bold;
                    }
                    .top{
                        color:#fff;
                        display:flex;
                        height:22px;
                        line-height:22px;
                        .dot{
                            width:6px;
                            height:6px;
                            margin-right:6px;
                            border-radius:50%;
                            position: relative;
                            top:8px;
                        }
                        .tt{
                            flex:1;
                            letter-spacing:2px;
                        }
                    }
                    .outer{
                        height:7px;
                        border-radius:4px;
                        margin:14px 0;
                        background:#29374b;
                        .inner{
                            height:100%;
                            border-radius:4px;
                        }
                    }
                }
        }
        .road-rank{
            .thead{
                color:#fff;
                display:flex;
                text-align:center;
                font-weight:bold;
                font-size:16px;
                letter-spacing:2px;
                margin-bottom:12px;
                div:nth-child(1){
                  width:52px;
                  text-align:center;
                }
                div:nth-child(2){
                  width:165px;
                  margin-left:12px;
                  text-align:center;
                  margin-right:40px;
                }
                div:nth-child(3){
                  width:165px;
                  margin-left:12px;
                  text-align:center;
                  margin-right:120px;
                }

            }
            .tbody{
                .tr{
                    display:flex;
                    margin:8px 0;
                    .index{
                        width:52px;
                        height:52px;
                        font-size:18px;
                        text-align:center;
                        line-height:52px;
                        background:#3c3f47;
                        color:#42ceff;
                        &.color{
                            color:#f7b500;
                        }
                    }
                    .start,.end{
                        width:164px;
                        height:52px;
                        background:#3c3f47;
                        margin-left:12px;
                        color:#fff;
                        line-height:52px;
                        text-align: center;
                        font-size:16px;
                    }
                    .hl{
                        color:#dadadc;
                        line-height:52px;
                        font-weight:bold;
                        margin-left:12px;
                    }
                    .vl{
                        width:6px;
                        height:52px;
                        background:#3c3f47;
                        margin-left:5px;
                    }
                    .blocks{
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        .t{
                            width:76px;
                            display:flex;
                            justify-content:space-between;
                            margin:5px 0 5px 12px;
                            .item{
                                width:6px;
                                height:12px;
                                background:#fff;
                                &.color-0{
                                    background:#03e479;
                                }
                                &.color-1{
                                    background:#6dd400;
                                }
                                &.color-2{
                                    background:#f7b500;
                                }
                                &.color-3{
                                    background:#fa6400;
                                }
                            }
                        }
                    }
                    .circle{
                        position: relative;
                        height:52px;
                    }
                    .hblocks{
                        flex:1;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        margin-left:12px;
                        div{
                            height:14px;
                            margin:2px 0;
                        }
                        .b1,.b3{
                            background:#75787c;
                        }
                        .b1{
                            width:134px;
                            animation: run 1.2s .1s infinite alternate;
                            transform-origin:0 0;
                        }
                        .b2{
                            background:#5ae0ff;
                            width:176px;
                            animation: run 1.6s .1s infinite alternate;
                            transform-origin:0 0;
                        }
                        .b3{
                            width:50px;
                            animation: run .5s .2s infinite alternate;
                            transform-origin:0 0;
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
      #lljs{
          width:100%;
          height:300px;
      }
      .qjll{
            display:flex;
            padding-bottom:30px;
            margin-top:12px;
            &.border{
              border-bottom:1px dashed #226c8b;
            }
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