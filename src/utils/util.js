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
const imgs = {
    mec_normal:{
       w:100,
       h:100
    },
    mec_error:{
        w:100,
        h:100
    },
    sbgz:{
        w:74,
        h:74
    },
    jtsg:{
        w:74,
        h:74
    }
}
function addMarker(map,list,offset,wAnchor){

    //用于返回 用于覆盖图层组
    let markers = []  
    let icons = {}

    list.forEach( m => {

        // 如果不存在相应的icon，即生成
        if(!icons[m.img]){
            icons[m.img] = new AMap.Icon({          
                image: require(`../assets/img/${m.img}.png`),
                size: new AMap.Size(imgs[m.img].w, imgs[m.img].h),
                imageSize: new AMap.Size(imgs[m.img].w, imgs[m.img].h)
            })
        }
        //'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
        // const anchor = ['bottom-center','middle-left']
        let marker = new AMap.Marker({
            position: new AMap.LngLat(m.lnglat[0], m.lnglat[1]),
            icon:icons[m.img],
            // anchor:anchor[m.status],
            offset: new AMap.Pixel(-(imgs[m.img].w/2), - imgs[m.img].h),
            extData: {
                id:m.id
            }
        })
        
        if(m.component){
            AMap.event.addListener(marker, 'click', function (e) {
                var infoWindow = new AMap.InfoWindow({
                    isCustom:true,
                    offset: new AMap.Pixel(0, offset),
                    anchor: wAnchor ? wAnchor : 'bottom-center',
                    content: m.component.$el
                })
                m.component.id = e.target.getExtData().id
                m.component.lnglat = marker.getPosition()
                // vue.id = e.target.getExtData().id
                infoWindow.open(map, marker.getPosition());
            });
        }
        
        markers.push(marker)
       
    })

    return markers
}

/**
 * 添加波纹
 * map  地图实例
 * p Object坐标点
 */
function drawWave(p,map,layers) {
    var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 100;

    var context = canvas.getContext('2d')
    
    var grid;
    var waves = []
    var index = 0

    function draw(item){

        grid = context.createRadialGradient(item.x, item.y, item.r - 8, item.x, item.y, item.r); //渐变填充器
        grid.addColorStop(0, 'rgba(255,255,0,0)'); //渐变节点
        grid.addColorStop(1, `rgba(255,255,0,${item.a})`); //渐变节点

        context.fillStyle = grid; //填充样式 放入 渐变填充器
        

        context.beginPath();
        context.arc(50, 50, item.r, 0, 2 * Math.PI);
        context.fill();

        //2D视图时可以省略
        CanvasLayer.reFresh();

    };
    

    function initAll(){
        ++index

        context.clearRect(0, 0, 100, 100)
        
        if(index%35 === 0){
            waves.push({
                x:50,
                y:50,
                r:10,
                a:1
            })   
        }

        waves.forEach( w => {
            w.r += .35
            w.a -= 0.008
        })

        waves.forEach( w =>{
            draw(w)
        })

        

        waves.forEach( (w,i) =>{
            if(w.r >= 50){
                waves.splice(i,1)
            }
        })
        
        AMap.Util.requestAnimFrame(initAll);
        
    }



    var CanvasLayer = new AMap.CanvasLayer({
        canvas: canvas,
        bounds: new AMap.Bounds(
            [p[0] - 0.005,p[1] - 0.005], 
            [p[0] + 0.005,p[1] + 0.005]
        ),
        zooms: [3, 18],
    });

    CanvasLayer.setMap(map);

    layers.push(CanvasLayer)

    initAll()
    
}


//路线查询
function searchRoad(road){
    const drivingOption = {
          policy: AMap.DrivingPolicy.LEAST_DISTANCE,
          ferry: 1, // 是否可以使用轮渡
          province: '沪', // 车牌省份的汉字缩写  
          hideMarkers:true,
      }
      
    var driving = new AMap.Driving(drivingOption) // 构造路线导航类

    return new Promise((resolve,reject)=>{
        driving.search(road.start,road.end, function(status, result) {
              if (status === 'complete') {
                  if (result.routes && result.routes.length) {
                      road.path = parseRouteToPath(result.routes[0])
                      resolve(road)
                  }
              } else {
                      reject('fail')
              }
        })
    })
 }

// 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
function parseRouteToPath(route) {
    var path = []

    for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i]

        for (var j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j])
        }
    }
    return path
}

//绘制路线
function drawRoad(map,road){
    var routeLine = new AMap.Polyline({
        path: road.path,
        borderWeight: 0,
        strokeWeight: 15,
        strokeColor: ['#03e479','#0091ff','#fa4300'][road.status],
        lineJoin: 'round',
        zIndex:road.index,
        extData:road.id,
        cursor:'pointer'
    })

    routeLine.setMap(map)

    routeLine.on('click',(e)=>{
      // this.showRoadList([e.lnglat.lng,e.lnglat.lat],road)
      console.log(e.target.getExtData())
    })

    // 调整视野达到最佳显示区域
    map.setFitView()
 }


export {
    renderMask,
    addMarker,
    drawWave,
    searchRoad,
    drawRoad
}