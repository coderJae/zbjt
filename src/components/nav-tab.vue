<template>
    <div class="tab" :class="[on?'on':'']" @click="pick">
       <div class="topic">
            <img :src="require(`../assets/img/${tabData.bg}`)"/>
       </div>
       <div class="content">
          <div class="l-t">
              {{tabData.topic}}
          </div>
          <div class="c">
             <div class="item c-t">
                <div class="circle">
                     <div class="bg"></div>
                     <img :src="require(`../assets/img/${tabData.i1}`)"/>
                </div>
                <div class="line2"></div>
                <div class="num">
                    <div class="t"><span>{{tabData.n1}}</span> {{tabData.u1}}</div>
                    <div class="m">
                       <div class="dot"></div> 
                    </div>
                    <div class="b">{{tabData.t1}}</div>
                </div>
             </div>
             <div class="line"></div>
             <div class="item c-b">
                <div class="circle">
                     <div class="bg"></div>
                     <img :src="require(`../assets/img/${tabData.i2}`)"/>
                </div>
                <div class="line2"></div>
                <div class="num">
                    <div class="t"><span>{{tabData.n2}}</span> {{tabData.u2}}</div>
                    <div class="m">
                       <div class="dot"></div>
                    </div>
                    <div class="b">{{tabData.t2}}</div>
                </div>
             </div>
          </div>
       </div>
    </div>
</template>
<style lang="scss">
@keyframes rotate{
      from{transform: rotate(360deg)}
      to{transform: rotate(0deg)}
}
.tab{
  width:428px;
  height:450px;
  margin:10px;
  float:right;
  margin-bottom:10px;
  background:rgba(0,0,0,0.8);
  border-radius:6px;
  padding:20px;
  display:flex;
  flex-direction:column;
  pointer-events: auto;
  transition:all .3s;
  .topic{
    height:51px;
    margin-bottom:20px;
    img{
        margin-left:-18px;
    }
  }
  .content{
      flex:1;
      display:flex;
      padding:12px;
      background:url(~@/assets/img/nav_tab_h.png) no-repeat center center;
      background-size:100% 100%;
      .l-t{
          width:50px;
          margin:0 30px;
          text-align: center;
          font-size:40px;
          font-weight:bold;
          color:#f7b500;
          display:flex;
          flex-direction: column;
          justify-content: center;
          display:none;
      }
      .c{ 
          display:flex;
          height:100%;
          flex:1;
          flex-direction:column;
          justify-content:center;
          .line{
           height:1px;
           width:80%;
           margin:10px auto;
           border-bottom:1px dashed #858688;
          }
          .item{
              display:flex;
              flex:1;
              position: relative;
              .circle{
                width:121px;
                height:121px;
                text-align:center;
                line-height:121px;
                position:relative;
                top:50%;
                background:url(~@/assets/img/paopao.png) no-repeat center center;
                background-size:78px 78px;
                transform:translateY(-50%);
                .bg{
                    position:absolute;
                    width:100%;
                    height:100%;
                    background:url(~@/assets/img/circle.png) no-repeat center center;
                    background-size:100% 100%;
                    top:0;
                    left:0;
                    border-radius:50%;
                }
              }
              .line2{
                width:4px;
                height:108px;
                position:relative;
                top:50%;
                margin-left:30px;
                transform:translateY(-50%);
                background:#32c5ff;
              }
              .num{
                  flex:1;
                  margin-left:40px;
                  display:flex;
                  flex-direction:column;
                  justify-content:center;
                  color:#fff;
                  span{
                      color:#f7b500;
                      font-size:38px;
                      font-weight:bold;
                  }
                  .m{
                      height:2px;
                      width:80%;
                      background:#3a3f4b;
                      margin:8px 0;
                      position: relative;
                      .dot{
                          width:6px;
                          height:6px;
                          background:#f7b500;
                          position:absolute;
                          right:0;
                          top:-2px;
                      }
                  }
                  .b{
                      font-size:24px;
                      letter-spacing:1px;
                  }
              }
          }
          .c-b{
              .line2{
                  background:#f7b500;
              }
          }
      }
  }
  &.on{
     width:585px;
     box-shadow:0 0 6px 2px #32c5ff,0 0 15px 0 #32c5ff inset;
     .topic{
         display:none;
     }
    .content{
        background:url(~@/assets/img/tab_bg_b.png) no-repeat center center;
        background-size:100% 100%;
        .l-t{
            display:flex;
        }
        .c{
            .item{
                .bg{
                    animation: rotate 3s linear infinite ;
                }
                .line2{
                    display:none;
                }
            }
        }
    }
  }
}
</style>
<script>
export default {
    name:'NavTab',
    props:{
       on:{
           type: Boolean,
           default:false
       },
       tabData:{
           type: Object,
           required: true,
           dafault: () => {
                return {}
            }
       }
    },
    data(){
        return {
           
        }
    },
    methods:{
        pick(){
            this.$emit('pick')
        }
    }
}
</script>