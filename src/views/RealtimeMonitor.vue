<template>
    <div class="realtime-monitor">
        <header-bar/>
        <div class="section s1">
            <div class="left">
                 <div class="top">
                     <div class="topic"></div>
                     <div class="nav">
                         <div v-for="(item,index) in cardList" :key="index" :class="[onIndex == index ? 'on':'']" @click="pickThis(index)">{{item}}</div>
                     </div>
                 </div>
                 <div class="bottom">
                    <div class="topic"></div>
                    <div class="item1">基本信息</div>
                    <div class="item">
                        <div class="label">发生时间：</div>
                        <input type="text" value="2020年10月23日 17:32:12" />
                    </div>
                    <div class="item">
                        <div class="label">设备类型：</div>
                        <input type="text" value="雷视检测器"/>
                    </div>
                    <div class="item">
                        <div class="label">设备编号：</div>
                        <input type="text" value="SP1002"/>
                    </div>
                    <div class="item">
                        <div class="label">设备位置：</div>
                        <input type="text" value="116.215413, 36.127325"/>
                    </div>
                    <div class="item">
                        <div class="label">异常问题：</div>
                        <input type="text" value="天线无采集数据"/>
                    </div>
                    <div class="item1">现场状态确认</div>
                    <div class="check-box">
                        <div class="checkbox on">
                            <div class="check"></div>
                            未处理
                        </div>
                        <div class="checkbox">
                            <div class="check"></div>
                            已处理
                        </div>
                    </div>
                    <div class="btn">提交</div>
                 </div>
            </div>
            <div class="middle">
                <video width="100%" height="100%" src="http://map.hugetower.cn/video/a.mp4" loop autoplay muted="muted"></video>
            </div>
            <div class="right">
                 <div class="top">
                    <div class="topic"></div>
                    <div class="videobox">
                        <video width="100%" height="100%" src="http://map.hugetower.cn/video/b.mp4" loop autoplay muted="muted"></video>
                    </div>
                    <!-- <div class="video-box">
                        <div class="video"></div>
                        <div class="video"></div>
                        <div class="video"></div>
                        <div class="video"></div>
                    </div> -->
                 </div>
                 <div class="bottom">
                    <div class="topic"></div>
                    <div id="cgfw"></div>
                    <div class="labels">
                        <div class="label l1">
                            <div class="content">
                                <div>错误行驶预警</div>
                                <div>230车次 <span style="color:#3fdff6">37%</span></div>
                            </div>
                            <div class="circle"></div>
                            <div class="line"></div>
                        </div>
                        <div class="label l2">
                            <div class="line"></div>
                            <div class="circle"></div>
                            <div class="content">
                                <div>车辆超速预警</div>
                                <div>160车次 <span style="color:#42ffeb">26%</span></div>
                            </div>
                        </div>
                        <div class="label l3">
                            <div class="line"></div>
                            <div class="circle"></div>
                            <div class="content">
                                <div>车辆逆行预警</div>
                                <div>30车次 <span style="color:#f7b500">5%</span></div>
                            </div>
                        </div>
                        <div class="label l4">
                            <div class="content">
                                <div>危险驾驶及违章行为预警</div>
                                <div>130车次 <span style="color:#60e55e">21%</span></div>
                            </div>
                            <div class="circle"></div>
                            <div class="line"></div>
                        </div>
                        <div class="label l5">
                            <div class="content">
                                <div>车辆慢行</div>
                                <div>60车次 <span style="color:#fa6400">9.8%</span></div>
                            </div>
                            <div class="circle"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
        <div class="section s2">
            <div class="left">
                <div class="topic"></div>
                <div class="content">
                    <div class="l">
                        <div class="total">
                             <div class="t">今日事件总数量</div>
                             <div class="c"><span>52</span>件</div>
                        </div>
                        <div id="te">
                            
                        </div>
                    </div>
                    <div class="r">
                         <div class="title">
                            事件信息（1/3）
                         </div>
                         <div class="form">
                            <div class="lt">
                                <div class="video"></div>
                                <div class="title">现场状态确认</div>
                                <div class="check-box">
                                    <div class="checkbox on">
                                        <div class="check"></div>
                                        识别错误
                                    </div>
                                    <div class="checkbox">
                                        <div class="check"></div>
                                        正在处理
                                    </div>
                                    <div class="checkbox">
                                        <div class="check"></div>
                                        尚未处理
                                    </div>
                                    <div class="checkbox">
                                        <div class="check"></div>
                                        处理完成
                                    </div>
                                </div>
                            </div>
                            <div class="rt">
                                <div class="item">
                                    <div class="label">发生时间：</div>
                                    <input type="text" value="2020年10月22日 13:53:32"/>
                                </div>
                                <div class="item">
                                    <div class="label">事件位置：</div>
                                    <input type="text" value="KS69+408"/>
                                </div>
                                <div class="item">
                                    <div class="label">事件等级：</div>
                                    <input type="text" value="严重"/>
                                </div>
                                <div class="item">
                                    <div class="label">事件类型：</div>
                                    <input type="text" value="交通事故"/>
                                </div>
                                <div class="btn">提交</div>
                                <div class="btns">
                                    <div class="prev">上一条</div>
                                    <div class="next">下一条</div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="topic"></div>
                <div class="content">
                   <div class="cards">
                       <div class="card on">
                           <div class="l">拥堵指数</div>
                           <div class="r">
                               89.2
                           </div>
                       </div>
                       <div class="card">
                           <div class="l">路段流量</div>
                           <div class="r">
                               ﹥2391 <span>辆/h</span>
                           </div>
                       </div>
                       <div class="card">
                           <div class="l">平均车速</div>
                           <div class="r">
                               100.7 <span>km/h</span>
                           </div>
                       </div>
                   </div>
                   <div id="zbqs">

                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.realtime-monitor{
     width:3840px;
     height:100%;
     background:url(~@/assets/img/realtime_bg.png) no-repeat top left;
     background-size:3840px 2160px;
     position: relative;
     .check-box{
        display:flex;
        flex-wrap:wrap;
        .checkbox{
            width:50%;
            line-height:36px;
            display:flex;
            color:#fff;
            font-size:18px;
            letter-spacing:2px;
            .check{
                width:36px;
                height:36px;
                border:2px solid #fff;
                box-sizing:border-box;
                background:#46474b;
                border-radius:50%;
                margin-right:27px;
                position: relative;
            }
            &.on{
                ::after{
                    content:'';
                    width:22px;
                    height:22px;
                    background:#fff;
                    position: absolute;
                    border-radius:50%;
                    left:5px;
                    top:5px;
                }
            }
        }
     }
     .s1{
        width:3580px;
        margin:0 auto;
        display:flex;
        padding-top:220px;
        .left{
            width:850px;
            height:1225px;
            border-radius:6px;
            .top{
                height:382px;
                padding:0 24px;
                background:rgba(0,0,0,0.7);
                box-shadow: 0 0 10px 1px rgba(0,0,0,0.8);
                .topic{
                    height:89px;
                    margin-bottom:15px;
                    background:url(~@/assets/img/gnmk.png) no-repeat center left;
                    background-size:100% 51px;
                }
                .nav{
                    display:flex;
                    flex-wrap:wrap;
                    justify-content: space-between;
                    color:#fff;
                    text-indent:180px;
                    font-size:28px;
                    font-weight:bold;
                    div{
                        width:390px;
                        height:90px;
                        margin-bottom:53px;
                        line-height:90px;
                        border:2px solid #2c5f76;
                        background:rgba(44,94,118,0.3) url(~@/assets/img/white.png) no-repeat 110px center;
                        background-size:59px 57px;
                        &.on{
                          background:rgba(44,94,118,0.3) url(~@/assets/img/white_on.png) no-repeat 110px center;
                          background-size:59px 57px;
                          color:#32c5ff;
                          border-color:#32c5ff;
                          box-shadow:0 0 6px 2px #32c5ff,0 0 15px 0 #32c5ff inset;
                        }
                    }
                }
            }
            .bottom{
                margin-top:10px;
                padding:0 24px;
                height:833px;
                background:rgba(0,0,0,0.7);
                box-shadow: 0 0 10px 1px rgba(0,0,0,0.8);
                color: #fff;
                font-size:18px;
                font-weight:bold;
                letter-spacing:2px;
                .topic{
                    height:89px;
                    margin-bottom:15px;
                    background:url(~@/assets/img/sbycbj.png) no-repeat center left;
                    background-size:100% 51px;
                }
                .item1{
                    height:50px;
                }
                .item{
                    display:flex;
                    height:50px;
                    line-height:50px;
                    margin-bottom:38px;
                    input{
                        height:50px;
                        flex:1;
                        background:rgba(71,74,78,0.7);
                        outline:none;
                        border:none;
                        border-radius:6px;
                        padding:0 1em;
                        color:#fff;
                    }
                }
                .btn{
                    width:650px;
                    height:58px;
                    border:2px solid #fff;
                    box-sizing:border-box;
                    border-radius: 29px;
                    text-align:center;
                    background:#32c5ff;
                    line-height:58px;
                    margin:38px auto;
                }
            }
        }
        .middle{
            flex:1;
            height:1225px;
            margin:0 10px;
            background:rgba(0,0,0,1);
        }
        .right{
            width:850px;
            height:1225px;
            .top{
                height:625px;
                padding:0 24px;
                background:rgba(0,0,0,0.7);
                box-shadow: 0 0 10px 1px rgba(0,0,0,0.8);
                .topic{
                    height:80px;
                    background:url(~@/assets/img/ssjkmk.png) no-repeat center left;
                    background-size:100% 51px;
                }
                .videobox{
                    width:100%;
                    margin-top:30px;
                }
                .video-box{
                    display:flex;
                    flex-wrap: wrap;
                    justify-content:space-between;
                    .video{
                        width:397px;
                        height:257px;
                        margin-bottom:8px;
                        background:yellow;
                    }
                }
            }
            .bottom{
                margin-top:10px;
                height:590px;
                padding:0 24px;
                background:rgba(0,0,0,0.7);
                box-shadow: 0 0 10px 1px rgba(0,0,0,0.8);
                position: relative;
                .topic{
                    height:89px;
                    margin-bottom:15px;
                    background:url(~@/assets/img/cjtj.png) no-repeat center left;
                    background-size:100% 51px;
                }
                #cgfw{
                    height:450px;
                    margin:0 auto;
                }
                .labels{
                    position: absolute;
                    left:24px;
                    right:24px;
                    top:104px;
                    height:450px;
                    .label{
                        position: absolute;
                        width:370px;
                        display:flex;
                        .line{
                            width:180px;
                            height:1px;
                            border-top:1px dashed #fff;
                        }
                        .circle{
                            width:10px;
                            height:10px;
                            border:1px solid #f1f1f1;
                            border-radius: 50%;
                            margin-top:-4.5px;
                        }
                        .content{
                            color:#fff;
                            margin-top:-20px;
                            margin: -10px 10px 10px 20px;
                         }
                    }
                    .l1{
                            top:90px;
                            left:160px;
                            .line{
                                width:116px;
                            }
                        }
                    .l2{
                            top:119px;
                            left:402px;
                            .line{
                                width:160px;
                            }
                        }
                    .l3{
                            top:173px;
                            left:402px;
                        }
                    .l4{
                            top:144px;
                            left:29px;
                            .line{
                                width:180px;
                            }
                        }
                    .l5{
                            top:202px;
                            left:133px;
                            .line{
                                width:170px;
                            }
                        }
                }
            }
        }
     }
     .s2{
        display:flex;
        width:3585px;
        margin:10px auto 0 auto;
        .left{
           flex:1;
           padding:0 24px;
           height:588px;
           margin-right:10px;
           background:rgba(0,0,0,0.7);
           box-shadow: 0 0 10px 1px rgba(0,0,0,0.8);
           .topic{
             height:89px;
             margin-bottom:15px;
             background:url(~@/assets/img/sjmk.png) no-repeat center left;
             background-size:100% 51px;
            }
            .content{
                display:flex;
                font-weight:bold;
                .l{
                    width:625px;
                    .total{
                        height:122px;
                        background:url(~@/assets/img/total_bg.png) no-repeat center left;
                        background-size:100% 100%;
                        line-height:116px;
                        color:#fff;
                        font-size:24px;
                        display:flex;
                        justify-content:space-between;
                        .t{
                            letter-spacing:5px;
                            margin-left:33px;
                        }
                        .c{

                            margin-right:15px;
                        }
                        span{
                            margin:0 10px 0 77px;
                            color:#f8ba00;
                            font-size: 30px;
                        }
                    }
                    #te{
                        height:340px;
                        margin-top:20px;
                    }
                }
                .r{ 
                    flex:1;
                    margin-left:20px;
                    .title{
                        color:#fff;
                        font-size:18px;
                    }
                    .form{
                        display:flex;
                        .lt{
                            width:460px;
                            .video{
                               height:280px;
                               background:url(~@/assets/img/place-img.png) no-repeat center left;
                               background-size:100% 100%;
                               margin-top:10px;
                            }
                            .title{
                                color:#fff;
                                margin:16px 0;
                            }
                            .checkbox{
                                margin-bottom:16px;
                            }
                        }
                        .rt{
                            flex:1;
                            margin-left:20px;
                            color:#fff;
                            font-size:18px;
                            letter-spacing:2px;
                            .item{
                                display:flex;
                                height:50px;
                                line-height:50px;
                                margin-bottom:24px;
                                input{
                                    height:50px;
                                    flex:1;
                                    background:rgba(71,74,78,0.7);
                                    outline:none;
                                    border:none;
                                    border-radius:6px;
                                    padding:0 1em;
                                    color:#fff;
                                }
                            }
                            .btn{
                                width:650px;
                                height:58px;
                                border:2px solid #f7b500;
                                box-sizing:border-box;
                                border-radius: 6px;
                                text-align:center;
                                background:rgba(183,134,2,0.6);
                                line-height:58px;
                                margin-bottom:10px;
                            }
                            .btns{
                                display:flex;
                                .prev{
                                    margin-right:15px;
                                }
                                div{
                                    flex:1;
                                    height:58px;
                                    border:2px solid #fff;
                                    box-sizing:border-box;
                                    border-radius: 6px;
                                    text-align:center;
                                    background:#454649;
                                    line-height:58px;
                                }
                            }
                        }
                        
                    }
                }
            }
          
         
        }
        .right{
           flex:1;
           height:588px;
           padding:0 24px;
           background:rgba(0,0,0,0.7);
           box-shadow: 0 0 10px 1px rgba(0,0,0,0.8);
           .topic{
             height:89px;
             background:url(~@/assets/img/ydmk.png) no-repeat center left;
             background-size:100% 51px;
           }
           .content{
               display:flex;
               .cards{
                   .card{
                       width:743px;
                       height:134px;
                       display:flex;
                       margin-top:4px;
                       margin-bottom:35px;
                       color:#fff;
                       text-align: center;
                       line-height:134px;
                       &.on{
                           border:2px solid #f7b500;
                           .l{
                              border-left:12px solid #f7b500;
                           }
                       }
                       .l{
                           flex:1;
                           border-left:12px solid #a5a5a5;
                           background:rgba(151,151,151,0.5);
                           font-size:40px;
                           letter-spacing:2px;
                       }
                       .r{
                           flex:1;
                           background:rgba(151,151,151,0.3);
                           color:#fff;
                           font-size:50px;
                           span{
                               font-size:24px;
                               letter-spacing:5px;
                           }
                       }
                   }
               }
               #zbqs{
                   flex:1;
                   height:472px;
                   margin-left:40px;
               }
           }
        }
     }
}
</style>
<script>
import HeaderBar from '../components/header'
import { echarts } from '../utils/echarts'


export default {
    components:{
        HeaderBar
    },
    name:'RealtimeMonitor',
    data(){
        return {
            onIndex:0,
            cardList:[
                'MEC','VSM','视频','雷达'
            ]
        }
    },
    methods:{
       pickThis(index){
           this.onIndex = index
       }
    },
    mounted(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zbqs'));
        var option = {
            color: ["#45d2ff","#fff"],
            legend:{
               textStyle:{
                  color:'#fff'
               },
               itemWidth :60,
               itemHeight:12,
               icon:'rect',
               formatter: '{name} (2020.08.21)',
               left:100,
               top:10
            },
            xAxis: {
                type: 'category',
                data: ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:'#fff',
                    fontSize:18,
                    margin:10
                }
            },
            yAxis: {
                type: 'value',
                splitLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:'#fff',
                    fontSize:18,
                    margin:10
                },
                splitArea:{
                    show:true,
                    areaStyle:{
                        color:['rgba(59,131,29,0.8)','rgba(112,141,13,0.8)','rgba(162,122,13,0.8)','rgba(164,71,13,0.8)','rgba(148,29,33,0.8)']
                    }
                }
            },
            series: [{
                name:'今日',
                data: [40, 80, 60, 40, 30, 70, 100,40, 30, 70, 40, 80],
                type: 'line',
                showSymbol:false
            },{ 
                name:'上周同比',
                data: [100,40, 30, 70, 40, 80,60, 40, 30],
                type: 'line',
                showSymbol:false
            }]
        };
        myChart.setOption(option);
        

        // 饼图
        var pieChart = echarts.init(document.getElementById('te'));

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
                        radius: ['50%', '85%'],
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
                            {value: 6, name: '停车事件'},
                            {value: 11, name: '占用车道',},
                            {value: 5, name: '交通事件'},
                            {value: 20, name: '压线'},
                            {value: 10, name: '超速事件'}
                        ],
                        itemStyle:{
                            normal:{
                                borderWidth:5,
                                borderColor:"#121418",
                                color:function(params) {
                                //自定义颜色
                                var colorList = [          
                                        '#00f3ff', '#fffd00', '#ff00cc','#00ffa1','#ff8e00'];
                                    return colorList[params.dataIndex]
                                    }
                            }
                        }
                    }
                ]
        };
        
        pieChart.setOption(pieOption)


        //常规服务
        var pieChart = echarts.init(document.getElementById('cgfw'));
        var data = [
              
                {
                    name: "错误行驶预警",
                    value: 0.213
                },
                {
                    name: "车辆超速预警",
                    value: 0.262
                },
                {
                    name: "危险驾驶及违章行为预警",
                    value:0.377
                },
                {
                    name: "车辆逆行预警",
                    value: 0.05
                },
                {
                    name: "车辆慢行预警",
                    value: 0.098
                }

            ];
            var dataStyle = { 
                normal: {
                    label: {show:false},
                    labelLine: {show:false},
                    shadowBlur: 40,
                    shadowColor: 'rgba(40, 40, 40, 0.5)',
                }
            };
            var placeHolderStyle = {
                normal : {
                    color: 'rgba(0,0,0,0)',
                    label: {show:false},
                    labelLine: {show:false}
                },
                emphasis : {
                    color: 'rgba(0,0,0,0)'
                }
            };
            var legendData=[];
            function getData(data) {
                // var sortData=data.sort((a,b)=>{
                //     return b.value-a.value
                // });
                var res = [];
                for (let i = 0; i < data.length; i++) {
                    // console.log(sortData[i].name)
                    legendData.push(data[i].name);
                    res.push({
                        type: 'pie',
                        clockWise: true, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [127 - i * 28 , 143 - i * 28],　　　　　　　//radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
                        itemStyle: dataStyle,
                        label: {
                            show: true
                        },
                        labelLine:{
                            normal: {
                                length: 20,
                                length2: 70,
                                lineStyle: {
                                    color: 'yellow'
                                }
                            }

                        },
                        data: [{
                            value: data[i].value,
                            name: data[i].name
                        }, {
                            value: 1 - data[i].value,
                            name:'invisible',
                            itemStyle: placeHolderStyle,
                        }]
                    });
                }
                return res;
            }
            var pieOption = {
                    color: ['#3fdff6', '#42ffeb','#60e55e', '#f7b500','#fa6400'],
                    tooltip : {
                        show: true,
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        itemGap:12,
                        top: '87%',
                        textStyle:{
                            color:'#fff'
                        },
                        data:legendData
                    },
                    series : getData(data)
                }
            pieChart.setOption(pieOption);

    }
}
</script>
