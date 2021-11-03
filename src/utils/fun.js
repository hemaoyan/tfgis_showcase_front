// 使用免费开源版本
import 'tfgis/mars3d/lib/mars3d.css'
import * as mars3d from 'tfgis/mars3d/lib/mars3d'
var map = null;
var previousTime= null;
var graphic_div_project = null;
var graphic_wall = null;
// 添加DivLayer
function createDivLayer() {
    var divLayer = new mars3d.layer.DivLayer();
    return divLayer;
}
// 开始动画
function setMap(initMap) {
    map = initMap;
}
// 开始旋转
function startRotate() {
    stopRotate()
    previousTime = map.clock.currentTime.secondsOfDay
    map.on(mars3d.EventType.clockTick, map_onClockTick)
}
// 停止旋转
function stopRotate() {
    map.off(mars3d.EventType.clockTick, map_onClockTick)
}
// 旋转监听
function map_onClockTick(clock) {
    var spinRate = 1

    var currentTime = map.clock.currentTime.secondsOfDay
    var delta = (currentTime - previousTime) / 1000
    previousTime = currentTime
    map.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta)
}
// 开始动画
function startAnimation(main_camera) {
    map.setCameraView(main_camera);
}

// 添加省市数据
function addDistrict(graphicLayer, list_data) {
    for(var i in list_data) {
        var item = list_data[i];
        var graphic = new mars3d.graphic.DivGraphic({
            name: item.name,
            position: [item.lng, item.lat],
            graphicType: "div",
            sourceData: item,
            style: {
                html: `<div class="mars3d-divlabel">
                            <div class="mars3d-divlabel-text">` + item.name + `</div>
                        </div>`,
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000000, 10000000),
            },
        })
        graphicLayer.addGraphic(graphic)
        graphic.testPoint = false //打开测试点，与DIV点进行对比位置调整css
        addProject(graphicLayer, item.list_project)
    }
}

// 添加项目
function addProject(graphicLayer, list_project) {
    for(var i in list_project) {
        var project_tf = list_project[i]
        addProjectPoint(graphicLayer, project_tf)
    }
}

//加css动画的扩散点 DivLightPoint
function addProjectPoint(graphicLayer, project_tf) {
    var colorStr = '#f09e28';
    if(project_tf.url && project_tf.url != "") {
        colorStr = "#f33349";
      }
    var graphic = new mars3d.graphic.DivLightPoint({
        position: project_tf.position,
        graphicType: 'point',
        sourceData: project_tf,
        style: {
            color: colorStr,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1000000), //按视距距离显示
            // clampToGround: true,
        },    })
    graphicLayer.addGraphic(graphic)
    graphic.bindTooltip(project_tf.name)
}

// 添加项目弹框
function addProjectDIV(graphicLayer, project_tf) {
    // addProjectTemplateOne(graphicLayer, project_tf);
    addProjectTemplateTwo(graphicLayer, project_tf);
}

// 添加项目提示框-模版1
function addProjectTemplateOne(graphicLayer, project_tf) {
    graphic_div_project = new mars3d.graphic.DivBoderLabel({
        position: project_tf.position,
        graphicType: "div",
        sourceData: project_tf,
        style: {
            text: project_tf.name,
            font_size: 15,
            font_family: '微软雅黑',
            color: '#fff',
            boderColor: '#15d1f2',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000), //按视距距离显示
        },
    })
    graphic_div_project.testPoint = false //打开测试点，与DIV点进行对比位置调整css
    graphicLayer.addGraphic(graphic_div_project)
}

// 添加项目提示框-模版2
function addProjectTemplateTwo(graphicLayer, project_tf) {
    graphic_div_project = new mars3d.graphic.DivGraphic({
        name: project_tf.name,
        graphicType: "div",
        position: project_tf.position,
        sourceData: project_tf,
        style: {
            html: `<div class="divpoint divpoint-theme-29baf1" @click="clickDistrict">
                    <div class="divpoint-wrap">
                        <div class="area">
                            <div class="arrow-lt"></div>
                            <div class="b-t"></div>
                            <div class="b-r"></div>
                            <div class="b-b"></div>
                            <div class="b-l"></div>
                            <div class="arrow-rb"></div>
                            <div class="label-wrap">
                                <div class="title">` + project_tf.name + `</div>
                                <div class="label-content">
                                    <div class="data-li">
                                        <div class="data-value"><span class="label-wrap">` + project_tf.des+ `</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="b-t-l"></div>
                        <div class="b-b-r"></div>
                    </div>
                    <div class="arrow" ></div>
                </div>`,
            // anchor: [0, 0],
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1000000), //按视距距离显示
            // clampToGround: true,
        },
        //可以传入自定义测试点样式
        // testPoint: {
        //   color: '#ff0000',
        //   pixelSize: 8,
        // },
        pointerEvents: true, //false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
    })
    graphicLayer.addGraphic(graphic_div_project)

    graphic_div_project.testPoint = false //打开测试点，与DIV点进行对比位置调整css
}

function loadBuilding() {

    // var s3mLayer = new mars3d.layer.S3MLayer({
    //     name: '超图测试',
    //     center: { lat: 39.527874, lng: 117.28155, alt: 1346, heading: 38, pitch: -26 },
    //     url: 'http://172.31.69.165:8090/iserver/services/3D-XQBM_building0711/rest/realspace'
    // })
    // map.addLayer(s3mLayer)
    // return

    //自定义特效 Shader
    var fragmentShader = `
        // 注意shader中写浮点数是，一定要带小数点，否则会报错，比如0需要写成0.0，1要写成1.0
        float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
        float _heightRange = 60.0; // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange) 默认是 0-60米
        float _glowRange = 200.0; // 光环的移动范围(高度)

        // 建筑基础色
        float mars_height = v_stcVertex.z - _baseHeight;
        float mars_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
        float mars_a12 = mars_height / _heightRange + sin(mars_a11) * 0.1;
        gl_FragColor *= vec4(mars_a12, mars_a12, mars_a12, 1.0);

        // 动态光环
        float mars_a13 = fract(czm_frameNumber / 360.0);
        float mars_h = clamp(mars_height / _glowRange, 0.0, 1.0);
        mars_a13 = abs(mars_a13 - 0.5) * 2.0;
        float mars_diff = step(0.005, abs(mars_h - mars_a13));
        gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - mars_diff);
    `

    var tiles3dLayer = new mars3d.layer.TilesetLayer({
        name: '天津市建筑物',
        url: 'config_tfprojectshow/3dtiles/building_tj/tileset.json',
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        // marsJzwStyle: true, //打开建筑物特效（内置Shader代码）
        // marsJzwStyle: fragmentShader, //字符串值时，表示使用该字符串定义的自定义Shader
        showClickFeature: false,
        // center: { lat: 39.527874, lng: 117.28155,, alt: 1346, heading: 38, pitch: -26 },
    })
    tiles3dLayer.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [['true', 'rgba(255, 255, 255, 1)']],
        },
    })
    return tiles3dLayer;
}

// 创建动态圆
function addDynamicCircle(graphicLayer, data) {
    var center = Cesium.Cartesian3.fromDegrees(data.lng, data.lat, 1)
    var graphic = new mars3d.graphic.CircleEntity({
        name: 'data.name',
        position: center,
        style: {
          radius: 250000.0,
          material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.CircleWave, {
            color: '#ff0000',
            count: 1, //单个圆圈
            speed: 20,
          }),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000000, 10000000),
        },
      })
      graphicLayer.addGraphic(graphic)
}


// 创建动态飞线
function addDynamicFlyLine(graphicLayer, data) {
    var center = Cesium.Cartesian3.fromDegrees(data[0].lng, data[0].lat, 1)
    var lineMaterial = mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: 'lineClr.png',
        color: new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
        speed: 10,
    })
    for (var i = 0; i < data.length; i++) {
        var item = data[i]
        var thisPoint = Cesium.Cartesian3.fromDegrees(item.lng, item.lat, 1)
        var positions = mars3d.PolyUtil.getLinkedPointList(center, thisPoint, 40000, 100) //计算曲线点

        var primitive = new mars3d.graphic.PolylinePrimitive({
          positions: positions,
          style: {
            width: 2,
            material: lineMaterial, //动画线材质
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000000, 10000000),
          },
        })
        // primitive.bindPopup(`合肥 - ${item.name}`)
        graphicLayer.addGraphic(primitive)
    }
}

// 添加围墙
function addWall(graphicLayer, feature) {
    // 清除
    if(graphic_wall){
        graphicLayer.removeGraphic(graphic_wall)
    }
    // 添加
    var coordinates = feature.geometry.coordinates[0][0]
    graphic_wall = new mars3d.graphic.WallEntity({
        positions: coordinates,
        style: {
            diffHeight: 10000,
            color: "#00ffff",
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1000000), //按视距距离显示
        },
    })
    graphicLayer.addGraphic(graphic_wall)
    //primitive.addTo(graphicLayer)  //还可以另外一种写法,看个人习惯选用，内部都一样

    graphic_wall.bindTooltip(feature.properties.name)
}


export{
    createDivLayer,
    setMap,
    startAnimation,
    startRotate,
    stopRotate,
    addProject,
    addDistrict,
    addProjectDIV,
    graphic_div_project,
    loadBuilding,
    addDynamicCircle,
    addDynamicFlyLine,
    addWall
}