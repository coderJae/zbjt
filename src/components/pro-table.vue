<template>
    <div class="pro-table">
        <div class="table">
            <div class="thead">
                <div class="tr">
                    <div class="th" v-for="item in columns" :key="item.dataIndex" :style="{width:item.width}">
                        {{item.title}}
                    </div>
                </div>
            </div>
            <div class="tbody">
                <div class="tr" v-for="(item,index) in data" :key="index">
                    <div class="td" v-if="columns[0].dataIndex == 'index'" :width="columns[0].width">
                        <slot name="index" v-bind:record="{index:++index}"></slot>
                    </div>
                    <div class="td" v-for="(value, key, index) in item" :key="`${index}-${key}`" :width="columns[index].width">
                        <template v-if="['speed','status','level'].includes(key)">
                           <slot :name="key" v-bind:record="item"></slot>
                        </template>
                        <span v-else>
                            {{value}}
                        </span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.table{
    width:100%;
    color:#fff;
    text-align:center;
    .thead{
        font-weight:bold;
        margin-bottom:15px;
        letter-spacing:2px;
        .tr{
            height:50px;
            line-height:50px;
        }
    }
    .tbody{
       height:236px;
       overflow-y:scroll;
       padding-right:8px;
       font-size:16px;
       .tr:nth-child(odd){
         background:rgba(0,0,0,.5);
       }
       .tr:nth-child(even){
         height:55px;
         line-height:55px;
       }
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
    }
    .tr{
        color:#fff;
        height:42px;
        line-height:42px;
        display:flex;
        border-radius:5px;
        .th,.td{
            flex:1;
        }

    }
    .td{
        text-align:center;
    }
}
</style>
<script>
export default {
    name:'ProTable',
    props:{
        columns: {
            type: Array,
            dafault:()=>{
                return []
            }
        },
        data:{
            type: Array,
            dafault:()=>{
                return []
            }
        }
    }
}
</script>