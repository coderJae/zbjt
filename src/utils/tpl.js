/* template 模板生成 */ 

//MEC
function mecInfoWindow(title) {

    var style = `
       width:623px;
       height:378px;
       padding:30px 20px;
       color:#fff;
       font-size:16px;
       background:url(${require('../assets/mec.png')}) no-repeat center center;
       background-size:100% 100%;
       position:relative;
    `
    var close = `
       width:30px;
       height:30px;
       position:absolute;
       right:-15px;
       top:-15px;
       background:url(${require('../assets/close.png')}) no-repeat center center;
       background-size:100% 100%;
    `

    var form = `
        flex:1;
        margin-top:15px;
    `

    var item = `
        display:flex;
        height:30px;
        line-height:30px;
        margin-bottom:10px;
    `
    
    var text = `
        height:30px;
        flex:1;
        background:rgba(71,74,78,0.7);
        outline:none;
        border:none;
        border-radius:6px;
        padding:0 1em;
        color:#fff;
    `

    var btn = `
       display:flex;
       padding-left:300px;
    `
    var detail = `
       width:100px;
       height:32px;
       line-height:32px;
       border:1px solid  #fff;
       border-radius:16px;
       background:#4c5966;
       text-align:center;
    `
    var submit = `
       width:100px;
       height:32px;
       line-height:32px;
       border:1px solid  #fff;
       border-radius:16px;
       background:#32c5ff;
       text-align:center;
       margin-left:20px;
    `

    var checkbox = `
        line-height:20px;
        display:flex;
        color:#fff;
        font-size:16px;
        margin-right:30px;
        letter-spacing:2px;
    `
    var check = `
        width:20px;
        height:20px;
        border:2px solid #fff;
        box-sizing:border-box;
        background:#46474b;
        border-radius:50%;
        margin-right:8px;
        position: relative;
    `

    var dot = `
        width:10px;
        height:10px;
        background:#fff;
        border-radius:50%;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
    `
    var page = `
        display:flex;
        margin-top:10px;
    `
    var p = `
        margin:0 10px;
        cursor:pointer;
        width:30px;
        height:30px;
        text-align:center;
        line-height:30px;
        border:1px solid #f1f1f1;
        border-radius:50%;
    `
    
    var html = `
        <div style="${style}">
            <div style='${close}' @click="closeWindow"></div>
            <div style='${form}' v-if="currentData">
                <div style='${item}'>
                    <div>时间：</div>
                    <input style='${text}' type="text" :value="currentData.time"/>
                </div>
                <div style='${item}'>
                    <div>设备类型：</div>
                    <input style='${text}' type="text" :value="currentData.type"/>
                </div>
                <div style='${item}'>
                    <div>设备编号：</div>
                    <input style='${text}' type="text" :value="currentData.code"/>
                </div>
                <div style='${item}'>
                    <div>设备位置：</div>
                    <input style='${text}' type="text" :value="currentData.lnglat"/>
                </div>
                <div style='${item}'>
                    <div>异常问题：</div>
                    <input style='${text}' type="text" :value="currentData.question"/>
                </div>
            </div>
            <div style="display:flex;">
                <div style='${checkbox}' @click="check(0)">
                    <div style='${check}'>
                      <div v-if="index === 0"  style='${dot}'></div>
                    </div>
                    未处理
                </div>
                <div style="${checkbox}" @click="check(1)">
                    <div style='${check}'>
                     <div v-if="index == 1"  style='${dot}'></div>
                    </div>
                    已处理
                </div>
            </div>
            <div style='${page}'>
               <div v-for="(item,ind) in dataList" style="${p}" :key="ind" @click="changePage(ind)">{{ind + 1}}</div>
            </div>
            <div style="${btn}">
                <div style='${detail}'>详情{{id}}</div>
                <div style='${submit}' @click="submit()">提交</div>
            </div>
        </div>
    `
    
    return html;
}


export {
    mecInfoWindow
}