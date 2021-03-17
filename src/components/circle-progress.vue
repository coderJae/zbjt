<template>
    <div class="circle-box">
        <svg viewBox="0 0 100 100">
            <path
                d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
                fill="none"
                stroke="#56585d"
                stroke-width="4">
            ></path>
            <path
                d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
                fill="none"
                stroke="#f7b500"
                class="my-svg-path"
                :style="{ 'stroke-dashoffset':pn}"
                transform="rotate(90,50,50)"
                stroke-width="10">
            </path>
        </svg>
        <div>{{indict}}</div>
    </div>
</template>
<style lang="scss" scoped>
.circle-box{
    width: 60px;
    height: 60px;
    position: relative;
    top:-4px;
    margin-left:12px;
    div{
        z-index:9;
        position: absolute;
        top:0;
        left:0;
        text-align: center;
        bottom:0;
        right:0;
        line-height:60px;
        color:#ffffff;
    }
}
.my-svg-path{
    stroke-dasharray: 251.2px, 251.2px;
    transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;
    transform: rotate3d(20,20,0,180deg);
    transform-origin: 50% 50%;

}
</style>
<script>
export default {
    name:'CircleProgress',
    props:['indict','pn']
}
</script>