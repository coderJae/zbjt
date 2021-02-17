/* map 地图实例 */ 

//遮罩层
var canvas = document.createElement('canvas');

function renderMask(id) {

    canvas.style.borderRadius = '5px'
    var ctx = canvas.getContext("2d");

    var retina = AMap.Browser.retina;

    var oDiv = document.getElementById(id)
    var width = oDiv.offsetWidth;
    var height = oDiv.offsetHeight;

    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    if (retina) {//高清适配
        width *= 2;
        height *= 2;
    }
    canvas.width = width;
    canvas.height = height;//清除画布

    var linearGradient = ctx.createLinearGradient(0, 0, 0, height / 1.2);
    //添加颜色段
    linearGradient.addColorStop(0, 'rgba(58,105,224,0.9)');
    linearGradient.addColorStop(1, 'rgba(57,85,175,0.05)');
    //改变填充的样式并绘画填充矩形
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    return canvas
}

/**
 * 添加marker
 * map  地图实例
 * list marker数组
 */
function addMarker(map,list,vue){
    let markers = []
    let icons = {}

    list.forEach( m => {
        // 如果不存在相应的icon，即生成
        if(!icons[m.status]){
            icons[m.status] = new AMap.Icon({          
                image: require('../assets/img/logo.png'),
                size: new AMap.Size(60, 60),
                imageSize: new AMap.Size(200, 200),
                imageOffset: new AMap.Pixel(-60*m.status, 0)
            })
        }
        
        const anchor = ['bottom-center','middle-left']
        let marker = new AMap.Marker({
            position: new AMap.LngLat(m.lnglat[0], m.lnglat[1]),
            icon:icons[m.status],
            anchor:anchor[m.status],
            extData: {
                id:m.id
            }
        })
        
        if(m.component){
            AMap.event.addListener(marker, 'click', function (e) {
                console.log('run')
                var infoWindow = new AMap.InfoWindow({
                    isCustom:true,
                    offset: new AMap.Pixel(0, -95),
                    content: m.component.$el
                })
                m.component.id = e.target.getExtData().id
                // vue.id = e.target.getExtData().id
                infoWindow.open(map, marker.getPosition());
            });
        }
        
        markers.push(marker)
       
    })

    return markers
}



export {
    renderMask,
    addMarker
}