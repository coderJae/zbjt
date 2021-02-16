/* map 地图实例 */ 

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
                image: require('../assets/logo.png'),
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
    addMarker
}