<template>
    <div class="header">
        <div class="logo" @click="back"></div>
        <div class="menu">
            <div>实时监控</div>
            <div>路段详情</div>
            <div>系统分析</div>
            <div>系统设置</div>
        </div>
        <div class="info">
            <img :src="require(`../assets/img/${avatar}`)"/>
            <span>管理员您好，欢迎登录</span>
            <div class="message">待处理警告事件</div>
        </div>
        <div class="weather">
            <div class="d after">
                <div class="tt">{{time}}</div>
                <div class="dd">{{date}}</div>
            </div>
            <div class="w after">
                <div></div>
                <div></div>
                <div>4℃</div>
            </div>
            <div class="a">
                <div>PM 2.5</div>
                <div class="num">28</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'HeaderBar',
    data(){
        return {
          avatar:'avatar.png',
          time:'',
          date:''
        }
    },
    methods:{
        back(){
            this.$router.push({
                 name:'405'
            })
        }
    },
    mounted(){
       setInterval(()=>{
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            var data = now.getDate();
            var day = now.getDay();
            var hour = now.getHours();
            var minu = now.getMinutes();
            var sec = now.getSeconds();
            month = month + 1;
            var arr_week = new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日");
            var week = arr_week[day];

            if(minu < 10){
               minu = '0' +minu
            }

            if(sec < 10){
               sec = '0' +sec
            }

            this.time =  hour + ":" + minu + ":" + sec;
            this.date =  year + "年" + month + "月" + data + "日"
       }, 1000)
    }
}
</script>
<style lang="scss" scoped>
.header{
    width:100%;
    height:200px;
    position: absolute;
    z-index:999999;
    color:#fff;
    .logo{
        width:369px;
        height:90px;
        background:url(~@/assets/img/map_logo.png) no-repeat center center;
        background-size:100% 100%;
        position: absolute;
        left:200px;
        top:30px;
    }
    .menu{
        display:flex;
        position:absolute;
        left:600px;
        top:70px;
        font-size:30px;
        div{
            width:180px;
            height:1em;
            line-height:1em;
            text-align:center;
            border-right:1px solid #f4f4f4;
            &:last-child{
                border:none;
            }
        }
    }
    .info{
        display:flex;
        position:absolute;
        left:2200px;
        top:70px;
        font-size:30px;
        img{
            width:40px;
            height:40px;
            border-radius:50%;
            margin-right:10px;
        }
        .message{
            padding-left:40px;
            background:url(~@/assets/img/msg.png) no-repeat left center;
            background-size:35px 35px;
            margin-left:40px;
        }
    }
    .weather{
        display:flex;
        position: absolute;
        right:135px;
        top:80px;
        justify-content: space-around;
        &>div{
          position: relative;
          &.after::after{
              content:'';
              width:2px;
              height:52px;
              background:#beccf2;
              position:absolute;
              top:5px;
              right:0;
          }
        }
        .d{ 
            padding-right:45px;
            text-align:right;
            font-size:20px;
            letter-spacing:2px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            .tt{
               font-size:28px;
               letter-spacing:5px;
               line-height:100%;
            }
        }
        .w{
            width:286px;
            font-size:30px;
            text-align:center;
        }
        .a{ 
            width:123px;
            text-align:right;
            font-size:20px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            .num{
                font-size:24px;
                line-height:100%;
            }
        }
    }
} 

</style>