/* template 模板生成 */ 

//MEC
function mecInfoWindow() {

    var style = `
       width:623px;
       height:378px;
       padding:30px 20px;
       color:#fff;
       font-size:16px;
       background:url(${require('../assets/img/mec.png')}) no-repeat center center;
       background-size:100% 100%;
       position:relative;
    `
    var close = `
       width:30px;
       height:30px;
       position:absolute;
       right:-15px;
       top:-15px;
       background:url(${require('../assets/img/close.png')}) no-repeat center center;
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

/* 交通事件 */
function trafficEventsWindow() {

    var style = `
       width:800px;
       height:379px;
       padding:30px 20px;
       color:#fff;
       font-size:16px;
       background:url(${require('../assets/img/sgcl.png')}) no-repeat center center;
       background-size:100% 100%;
       position:relative;
    `

    var iStyle = `
       font-weight:bold;
       line-height:40px;
    `

    var video = `
        width:230px;
        height:140px;
        background:url(${require('../assets/img/place-img.png')}) no-repeat center center;
        background-size:100% 100%;
    ` 

    var form = `
        flex:1;
        margin-left:12px;
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
    var btn = `
       display:flex;
       padding-left:500px;
       margin-top:15px;
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
    var close = `
        width:30px;
        height:30px;
        position:absolute;
        right:-15px;
        top:-15px;
        background:url(${require('../assets/img/close.png')}) no-repeat center center;
        background-size:100% 100%;
 `

    var html = `
        <div style="${style}">
             <div style='${close}' @click="closeWindow"></div>
            <div style='${iStyle}'>基本信息</div>
            <div style='display:flex;'>
            <div style='${video}'></div>
            <div style='${form}'>
                    <div style='${item}'>
                        <div>发生时间：</div>
                        <input style='${text}' type="text" value="2020年10月22日 13:53:32" />
                    </div>
                    <div style='${item}'>
                        <div>事故位置：</div>
                        <input style='${text}' type="text" value="KS69+408"/>
                    </div>
                    <div style='${item}'>
                        <div>事故等级：</div>
                        <input style='${text}' type="text" value="严重"/>
                    </div>
                    <div style='${item}'>
                        <div>事故类型：</div>
                        <input style='${text}' type="text" value="交通事故"/>
                    </div>
            </div>
            </div>
            <div style="height:40px;font-size:18px;">状态确认</div>
            <div style="display:flex;">
                <div style='${checkbox}' @click="show(0)">
                    <div style='${check}'>
                      <div v-if="index === 0"  style='${dot}'></div>
                    </div>
                    识别错误
                </div>
                <div style="${checkbox}" @click="show(1)">
                    <div style='${check}'>
                     <div v-if="index == 1"  style='${dot}'></div>
                    </div>
                    尚未处理
                </div>
                <div style="${checkbox}" @click="show(2)">
                    <div style='${check}'>
                     <div v-if="index == 2"  style='${dot}'></div>
                    </div>
                    正在处理
                </div>
                <div style="${checkbox}" @click="show(3)">
                    <div style='${check}'>
                     <div v-if="index == 3" style='${dot}'></div>
                    </div>
                    处理完成
                </div>
            </div>
            <div style="${btn}">
            <div style='${detail}'>详情</div>
            <div style='${submit}' @click="submit()">提交</div>
            </div>
        </div>
    `
    
    return html;
}


//路测设备 窗口
function roadDeviceWindow() {

    var style = `
       width:481px;
       height:386px;
       padding-left:71px;
       background:url(${require('../assets/img/dev_warning.png')}) no-repeat center center;
       background-size:100% 100%;
       font-size:16px;
       position:relative;
       user-select: none;
       text-align:left;
       font-weight:bold;
       letter-spacing:1px;
    `
    var topic = `
        padding:15px 0 10px 0;
        color:#fff;
        font-size:18px;
        font-weight:bold;
        letter-spacing:2px;
    `
    var detail = `
       display:flex;
       width:400px;
       justify-content: space-between;
       flex-wrap:wrap;
    `

    var d = `
        width:190px;
        min-width:190px;
        margin-bottom:15px;
        height:50px;
        line-height:50px;
        background:rgba(255,255,255,0.3);
        border-radius:5px;
        text-align:center;
        color:#fff;
        font-size:18px;
    `
    var warning = `
        width:258px;
        height:62px;
        line-height:62px;
        color:red;
        position:absolute;
        left:140px;
        bottom:138px;
        text-align:center;
        color:#f7b500;
        font-size:22px;
    `
   
    var close = `
       width:30px;
       height:30px;
       position:absolute;
       right:-15px;
       top:-15px;
       background:url(${require('../assets/img/close.png')}) no-repeat center center;
       background-size:100% 100%;
    `
    
    var html = `
        <div style="${style}">
            <div style='${close}' @click="closeWindow"></div>
            <div style='${topic}'>关联设备</div>
            <div style='${detail}'>
                <div style='${d}'>
                MEC 1
                </div>
                <div style='${d}'>
                雷视 4
                </div>
                <div style='${d}'>
                RSU 2
                </div>
                <div style='${d}'>
                VSM 1
                </div>
            </div>
            <div style='${warning}'  @click="showFault">异常:1</div>
        </div>
    `
    
    return html;
}

export {
    mecInfoWindow,
    trafficEventsWindow,
    roadDeviceWindow
}