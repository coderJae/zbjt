<template>
    <div class="style">
        <div class="topic">关联设备</div>
        <div class="detail">
            <div class="d">MEC：1</div>
            <div class="d">雷视：1</div>
            <div class="d">RSU：1</div>
            <div class="d">VSM：1</div>
        </div>
        <div class="warning">异常:1</div>
    </div>  
</template>
<style scoped>
.style{
    width:481px;
    height:386px;
    padding-left:71px;
    background:url(../assets/img/dev_warning.png) no-repeat center center;
    background-size:100% 100%;
    font-size:16px;
    position:relative;
    user-select: none;
    text-align:left;
    font-weight:bold;
    letter-spacing:1px;
}
.detail{
    display:flex;
    width:398px;
    justify-content:space-between;
    flex-wrap:wrap;
}
.topic{
    padding:10px 0 5px 0;
    color:#fff;
    font-weight:bold;
}
.d{
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
}
.warning{
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
}
</style>