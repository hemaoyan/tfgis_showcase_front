import Bus from "@/common/vehicle/common/js/Bus.js";

var cluster = null
var traffic = null
var heatmap = null
var arr_car = []
// 添加热力图
export function createHeatMapGD(map, source) {
    deleteHeatMapGD(map);
    var heatmapOpts = {
        //3d 相关的参数
        '3d': {
            //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
            heightBezier: [0.4, 0.2, 0.4, 0.8],
            //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
            gridSize: 2,
            heightScale: 1
        }
    };

    //初始化heatmap对象
    heatmap = new AMap.HeatMap(map, heatmapOpts);
    heatmap.setDataSet({
        data: source,
        max: 2000
    });
}

// 删除实时路网
export function deleteHeatMapGD(map) {
    if(heatmap) {
        heatmap.setMap(null);
    }
}

// 添加实时路网
export function createTrafficGD(map) {
    deleteTrafficGD(map);
    traffic = new AMap.TileLayer.Traffic({
    'autoRefresh': true,     //是否自动刷新，默认为false
    'interval': 180,         //刷新间隔，默认180s
    });

    map.add(traffic); //通过add方法添加图层
}

// 删除实时路网
export function deleteTrafficGD(map) {
    if(traffic) {
        traffic.setMap(null);
    }
}


// 添加聚合图层
export function createClusterGD(map, points) {
    deleteClusterGD(map);
    deleteVehicleGD(map);
    var gridSize = 60
    // 数据中需包含经纬度信息字段 lnglat
    // var points = [
        // { lnglat: ["108.939621", "34.343147"] },
        // { lnglat: ["112.985037", "23.15046"] },
        // ...
        // ...
    // ]
    var count = points.length;

    var _renderClusterMarker = function (context) {
        console.log(context.count,'context.count')
        var factor = Math.pow(context.count / count, 1 / 18);
        var div = document.createElement('div');
        console.log(factor,'factor')
        var Hue = factor * 180; // 180 - factor * 180
        // var bgColor =  'hsla(' + Hue + ',100%,40%,0.7)'; //'rgba('+Hue +',214,255)';//'hsla(' + Hue + ',100%,40%,0.7)';
        var bgColor = '';
        var borderColor = '';
        if (context.count<5) {
            bgColor = 'url(data/img/juhe_gray.png)'
        } else if(context.count<10){
            bgColor = 'url(data/img/juhe_blue.png)'
        }else{
            bgColor = 'url(data/img/juhe_red.png)'
        }
        var fontColor = '#323232';// 'hsla(' + Hue + ',100%,90%,1)';
        // var borderColor = '#43A3FF';//'hsla(' + Hue + ',100%,40%,1)';
        var shadowColor = 'hsla(' + Hue + ',100%,90%,1)';
        div.style.backgroundImage= bgColor;
        div.style.backgroundRepeat = "no-repeat";//设置背景不平铺
        div.style.backgroundPosition = "center 20%";//设置背景图的位置
        div.style.backgroundSize = "120%";//设置背景图像的尺寸
        // div.style.backgroundColor = bgColor;
        var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
        div.style.width = div.style.height = size + 'px';
        // div.style.border = 'solid 1px ' + borderColor;
        // div.style.borderRadius = size / 2 + 'px';
        div.style.boxShadow = '0 0 5px ' + shadowColor;
        div.innerHTML = context.count;
        div.style.lineHeight = size- 4 + 'px';
        div.style.color = fontColor;
        div.style.fontSize = '14px';
        div.style.fontWeight = 'bold';
        div.style.textAlign = 'center';
        context.marker.setOffset(new AMap.Pixel(-size / 2, - size / 2));
        context.marker.setContent(div)
    };
    var _renderMarker = function(context) {
        // var content = '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
        // var content = '<div style="background-image:url(data/img/juhe_gray.png);background-repeat:no-repeat; height: 18px; width: 18px;box-shadow:0 0 5px  #333;"></div>';
        var content = document.createElement('div');
        content.style.backgroundImage= 'url(data/img/juhe_gray.png)';
        content.style.backgroundRepeat = "no-repeat";//设置背景不平铺
        content.style.backgroundPosition = "center 20%";//设置背景图的位置
        content.style.backgroundSize = "140%";//设置背景图像的尺寸
        content.style.width = '24px';
        content.style.height = '24px';
        // content.style.boxShadow = '0 0 5px  #323232';
        content.style.lineHeight = '25px';
        content.style.color = '#323232';
        content.style.fontSize = '14px';
        content.style.fontWeight = 'bold';
        content.style.textAlign = 'center';
        var offset = new AMap.Pixel(-9, -9);
        context.marker.setContent(content)
        context.marker.setOffset(offset)
    }

    if (cluster) {
        cluster.setMap(null);
    }
    cluster = new AMap.MarkerCluster(map, points, {
        gridSize: gridSize, // 设置网格像素大小
        renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
        renderMarker: _renderMarker, // 自定义非聚合点样式
    });
}

// 删除聚合图层
export function deleteClusterGD(map) {
    if (cluster) {
        cluster.setMap(null);
    }
}

// 添加车辆
export function createVehicleGD(map, dataCar) {
    deleteVehicleGD(map);
    var car_position = dataCar.car_position
    var car_line = dataCar.car_line
    for (var i in car_position) {
        // 创建车辆marker
        var car = car_position[i]
        // 创建车辆线
        var lineArr = car_line.find(item => item.car_id == car.id)
        var carIcon
        if(car.car_type == '班线客车') {
            carIcon = "data/img/car_bxkc_blue.png";
        } else if (car.car_type == '旅游包车') {
            carIcon = "data/img/car_lybc_yellow.png";
        } else if (car.car_type == '危险品车') {
            carIcon = "data/img/car_wxpc_gray.png";
        } else {
            carIcon = "data/img/car_xjc_white.png";
        }
        var carIconStatus
        if(car.status == '在线') {
            carIconStatus = "data/img/point_blue.png";
        } else if (car.status == '离线') {
            carIconStatus = "data/img/point_gary.png";
            var text = new AMap.Text({
                text:'离线',
                anchor:'bottom-left', // 设置文本标记锚点
                offset: new AMap.Pixel(10, -10),
                draggable:true,
                cursor:'pointer',
                angle:0,
                style:{
                    'background': 'url("data/img/car_status_out.png") no-repeat center',
                    'background-size': '100% 100%',
                    'width': '30px',
                    'height': '14px',
                    'border-width': 0,
                    'text-align': 'center',
                    'font-size': '8px',
                    'line-height': '14px',
                    'font-weight': 'bold',
                    'color': 'white'
                },
                position: car.position,
                zooms: [14,20]
            });
        
            text.setMap(map);
            arr_car.push(text);
            // 创建车辆线
            if(typeof(lineArr) != "undefined") {
                text.moveAlong(lineArr.line, {
                    // 每一段的时长
                    duration: 200,
                    // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                    autoRotation: true,
                });
            }
        } else {
            carIconStatus = "data/img/point_red.png";
            var text_alerm = new AMap.Text({
                text:'异常',
                anchor:'bottom-left', // 设置文本标记锚点
                offset: new AMap.Pixel(10, -10),
                draggable:true,
                cursor:'pointer',
                angle:0,
                style:{
                    'background': 'url("data/img/car_status_alerm.png") no-repeat center',
                    'background-size': '100% 100%',
                    'width': '30px',
                    'height': '14px',
                    'border-width': 0,
                    'text-align': 'center',
                    'font-size': '8px',
                    'line-height': '14px',
                    'font-weight': 'bold',
                    'color': 'white'
                },
                position: car.position,
                zooms: [14,20]
            });
        
            text_alerm.setMap(map);
            arr_car.push(text_alerm);
            // 创建车辆线
            if(typeof(lineArr) != "undefined") {
                text_alerm.moveAlong(lineArr.line, {
                    // 每一段的时长
                    duration: 200,
                    // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                    autoRotation: true,
                });
            }
        }
        var marker = new AMap.Marker({
            map: map,
            position: car.position,
            icon: carIcon,
            offset: new AMap.Pixel(-5, -10),
            angle: car.angle,
            title: car.number + "",
            zooms: [14,20]
        });
        // map.setFitView();
        if(typeof(lineArr) != "undefined") {
            console.log(lineArr.line, 'lineArr.line')
            marker.moveAlong(lineArr.line, {
                // 每一段的时长
                duration: 200,
                // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                autoRotation: true,
            });
        }
        arr_car.push(marker)
        //鼠标点击marker弹出自定义的信息窗体
        marker.on('click', function (e) {
            map.setCenter([e.lnglat.lng, e.lnglat.lat])
            Bus.$emit("clickMarker", e);
        });
        // 圆标记
        var markerCircle = new AMap.Marker({
            map: map,
            position: car.position,
            icon: carIconStatus,
            offset: new AMap.Pixel(-8, -8),
            title: car.number + "",
            zooms: [0,13.99]
        });
        // 创建车辆线
        if(typeof(lineArr) != "undefined") {
            markerCircle.moveAlong(lineArr.line, {
                // 每一段的时长
                duration: 200,
                // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                autoRotation: true,
            });
        }
        arr_car.push(markerCircle)
        //鼠标点击marker弹出自定义的信息窗体
        markerCircle.on('click', function (e) {
            console.log([e.lnglat.lng, e.lnglat.lat],'坐标')
            map.setCenter([e.lnglat.lng, e.lnglat.lat])
            Bus.$emit("clickMarker", e);
        });
    }
}

// 删除车辆
export function deleteVehicleGD(map) {
    for (var i in arr_car) {
        var marker = arr_car[i]
        marker.setMap(null);
    }
    arr_car = []
}

// 绘制多边形
export function drawPolygon (mouseTool) {
    console.log(mouseTool, 'mouseTool')
    // mouseTool.polygon({
    //   strokeColor: "#2154F4", 
    //   strokeOpacity: 1,
    //   strokeWeight: 2,
    //   fillColor: '#2154F4',
    //   fillOpacity: 0.1,
    //   // 线样式还支持 'dashed'
    //   strokeStyle: "dashed",
    //   // strokeStyle是dashed时有效
    //   strokeDasharray: [12,7],
    // })
    // mouseTool.rule({
    //     startMarkerOptions : {//可缺省
    //         icon: new AMap.Icon({
    //             size: new AMap.Size(19, 31),//图标大小
    //             imageSize:new AMap.Size(19, 31),
    //             image: "https://webapi.amap.com/theme/v1.3/markers/b/start.png"
    //         })
    //     },
    //     endMarkerOptions : {//可缺省
    //         icon: new AMap.Icon({
    //             size: new AMap.Size(19, 31),//图标大小
    //             imageSize:new AMap.Size(19, 31),
    //             image: "https://webapi.amap.com/theme/v1.3/markers/b/end.png"
    //         }),
    //         offset: new AMap.Pixel(-9, -31)
    //     },
    //     midMarkerOptions : {//可缺省
    //         icon: new AMap.Icon({
    //             size: new AMap.Size(19, 31),//图标大小
    //             imageSize:new AMap.Size(19, 31),
    //             image: "https://webapi.amap.com/theme/v1.3/markers/b/mid.png"
    //         }),
    //         offset: new AMap.Pixel(-9, -31)
    //     },
    //     lineOptions : {//可缺省
    //         strokeStyle: "solid",
    //         strokeColor: "#FF33FF",
    //         strokeOpacity: 1,
    //         strokeWeight: 2
    //     }
    //     //同 RangingTool 的 自定义 设置，缺省为默认样式
    // });
    mouseTool.measureArea({
        strokeColor: "#2154F4", 
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#2154F4',
        fillOpacity: 0.1,
        // 线样式还支持 'dashed'
        strokeStyle: "dashed",
        // strokeStyle是dashed时有效
        strokeDasharray: [12,7],
    });
  }