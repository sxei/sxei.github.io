function LabeledMarker(latlng,opt_opts){
    return new AMap.Marker({position:latlng,});
}

;(function() {
    /**
     * 获取高德地图的经纬度格式
     * @param {*} lng 经度
     * @param {*} lat 维度
     */
    function getAmapLngLat(lng, lat) {
        return new AMap.LngLat(lng, lat);
    }
    // geohash长度与缩放映射
    var ZOOMLEVELS = {
        3: 7,
        4: 10,
        5: 12,
        6: 15,
        7: 17,
        8: 18,
        9: 19
    };
    function GeoHashBox(geohash, map, marks, layer) {
        this.geohash = geohash;
        this.map = map;
        this.layer = layer;
        this.marks = marks;
        this.box = decodeGeoHash(geohash);
        this.corners = {}; // 记录4个角的位置
        this.corners.topleft = getAmapLngLat(this.box.longitude[0], this.box.latitude[0]);
        this.corners.topright = getAmapLngLat(this.box.longitude[0], this.box.latitude[1]);
        this.corners.bottomright = getAmapLngLat(this.box.longitude[1], this.box.latitude[1]);
        this.corners.bottomleft = getAmapLngLat(this.box.longitude[1], this.box.latitude[0]);
        this.corners.center = getAmapLngLat((this.box.longitude[0] + this.box.longitude[1]) / 2, (this.box.latitude[0] + this.box.latitude[1]) / 2);
        this.options = {
            labelText: geohash
        };
        var lastChr = this.geohash.charAt(this.geohash.length - 1);
        this.neighbors = {};
       
        this.plot();
    }

    // 画中间的矩形
    GeoHashBox.prototype.plot = function() {
        var polyarr = [];
        polyarr.push(this.corners.topleft);
        polyarr.push(this.corners.topright);
        polyarr.push(this.corners.bottomright);
        polyarr.push(this.corners.bottomleft);
        polygon = new AMap.Polygon({
            path: polyarr,
            strokeColor: '#F00',
            strokeOpacity: 0.7,
            strokeWeight: 3,
            fillColor: '#003366',
            fillOpacity: 0.2
        });
        this.marks.push(polygon);
        polygon.setMap(this.map);
        // 矩形区域的宽高度
        var width = this.corners.topleft.distance(this.corners.topright);
        var height = this.corners.topleft.distance(this.corners.bottomleft);

        var textMarker = new AMap.Marker({
            position: this.corners.center,
            content: `<div style="width: 100px;text-align:center;text-shadow: 1px 1px 0px white;color:red;font-size: 16px;">${this.geohash}</div>`,
            map: this.map,
            offset: new AMap.Pixel(-50, -10), // 左上角顶点偏移
        });
        var marker = new AMap.Marker({position:this.corners.center, map: this.map});
        
        //var marker = new LabeledMarker(getAmapLngLat(this.box.longitude[2], this.box.latitude[2]), this.options);
        this.marks.push(textMarker);
        this.marks.push(marker);


        
    }

    // 以当前geohash为中点刷新地图
    GeoHashBox.prototype.centerMap = function() {
        var latlng = new AMap.LngLat(this.corners.center.lng,this.corners.center.lat);
        this.map.setCenter(latlng);
        this.map.setZoom(ZOOMLEVELS[this.geohash.length]);
    }
    GeoHashBox.prototype.showNeighbors = function() {
        this.neighbors.top = new GeoHashBox(calculateAdjacent(this.geohash, 'top'), this.map, this.marks);
        this.neighbors.bottom = new GeoHashBox(calculateAdjacent(this.geohash, 'bottom'), this.map, this.marks);
        this.neighbors.right = new GeoHashBox(calculateAdjacent(this.geohash, 'right'), this.map, this.marks);
        this.neighbors.left = new GeoHashBox(calculateAdjacent(this.geohash, 'left'), this.map, this.marks);
        this.neighbors.topleft = new GeoHashBox(calculateAdjacent(this.neighbors.left.geohash, 'top'), this.map, this.marks);
        this.neighbors.topright = new GeoHashBox(calculateAdjacent(this.neighbors.right.geohash, 'top'), this.map, this.marks);
        this.neighbors.bottomright = new GeoHashBox(calculateAdjacent(this.neighbors.right.geohash, 'bottom'), this.map, this.marks);
        this.neighbors.bottomleft = new GeoHashBox(calculateAdjacent(this.neighbors.left.geohash, 'bottom'), this.map, this.marks);
    }
    GeoHashBox.prototype.showPlus = function() {

        if(!this.layer) return;
        
        var box = decodeGeoHash(calculateAdjacent(this.neighbors.right.geohash, 'right'));
        var center = getAmapLngLat((box.longitude[0] + box.longitude[1]) / 2, (box.latitude[0] + box.latitude[1]) / 2);
        
        this.layer.setData([
            {name: 'ss', center: [center.lng, center.lat]}
        ], {
            lnglat: 'center'
        });
        this.layer.setOptions({
            style: {
                radius: 13,
                fill: '#FFF176',
                lineWidth: 1,
                stroke: '#FFFFFF',
                opacity: 0.2,
                size: 100,
            },
            source: function(){
                return 'https://www.baidu.com/img/bd_logo1.png';
            }
        });
        this.layer.render();
    }
    window.GeoHashBox = GeoHashBox;
    window.getAmapLngLat = getAmapLngLat;
})();





var polygon = null;
var geocoder = null;



;(function() {
    var map = null,
        marks = [],
        loca = null,
        layer = null;
    function initMap() {
        $('#map').css({
            width: window.innerWidth,
            height: window.innerHeight
        });
        map = new AMap.Map('map',{
            zoom: 14, // 缩放级别
            resizeEnable: true,
            layers: [new AMap.TileLayer(), new AMap.TileLayer.Traffic(), new AMap.Buildings()]
        });
        map.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MapType'], function() {
            map.addControl(new AMap.ToolBar());
            map.addControl(new AMap.Scale());
            map.addControl(new AMap.MapType({
                defaultType: 0
            }));
        });

        loca = new Loca(map, {});
        layer = new Loca.VisualLayer({
            container: loca,
            eventSupport: true,
            type: 'point',
            shape: 'image'
        });
        layer.on('mouseenter', function (ev) {
            // 事件类型
            var type = ev.type;
            // 当前元素的原始数据
            var rawData = ev.rawData;
            // 原始鼠标事件
            var originalEvent = ev.originalEvent;
            var lnglat = ev.lnglat;
            console.log('事件类型 ' + type);
            console.log('原始数据 ' + JSON.stringify(rawData));
            console.log('鼠标事件 ' + originalEvent);
            layer.setOptions({
                style: {
                    radius: 13,
                    fill: '#FF0000',
                    lineWidth: 1,
                    stroke: '#FFFFFF',
                    opacity: 1,
                    size: 100,
                }
            });
            layer.render();
        });
        layer.on('mouseleave', function (ev) {
            // 事件类型
            var type = ev.type;
            // 当前元素的原始数据
            var rawData = ev.rawData;
            // 原始鼠标事件
            var originalEvent = ev.originalEvent;
            var lnglat = ev.lnglat;
            console.log('事件类型 ' + type);
            console.log('原始数据 ' + JSON.stringify(rawData));
            console.log('鼠标事件 ' + originalEvent);
            layer.setOptions({
                style: {
                    radius: 13,
                    fill: '#FFF176',
                    lineWidth: 1,
                    stroke: '#FFFFFF',
                    opacity: 0.2,
                    size: 100,
                },
                source: function(){
                    return 'https://www.baidu.com/img/bd_logo1.png';
                }
            });
            layer.render();
        });
        layer.on('click', function(ev){
            alert(ev.type);
        });

        AMap.event.addListener(map, 'complete', function() {
            geocodeAddress();
        });


        /* map.setCenter(map.getCenter());
        map.setZoom(map.getZoom()); */
    }

    function geocodeAddress() {
        cleanUp();
        // 位置转换经纬度服务
        AMap.service(['AMap.Geocoder'], function() {
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: 'all'
            });
            geocoder.getLocation('广东省深圳市南山区', function(status, data) {
                if (data.geocodes.length > 0) {
                    console.log(data.geocodes[0].formattedAddress);
                    /* AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
                        new SimpleMarker({
                            //设置节点属性
                            iconLabel: {
                                //普通文本
                                innerHTML: '码怪',
                                //设置样式
                                style: {
                                    color: '#fff',
                                    fontSize: '120%',
                                    marginTop: '2px'
                                }
                            },
                            iconStyle: 'red',
                            map: map,
                            position: data.geocodes[0].location
                        });
                    }); */
                    // location是一个高德的经纬度对象
                    var lngLat = data.geocodes[0].location;
                    var geohash = encodeGeoHash(lngLat.lng, lngLat.lat);
                    console.log('中心区geohash：' + geohash + '经度：' + lngLat.lng + '，纬度：' + lngLat.lat);
                    var resolution = 6; // geohash层级
                    geohash = geohash.substr(0, resolution);
                    plotGeoHash(geohash);
                } else {
                    console.error('检索位置失败');
                }
            });
        });
    }

    function plotGeoHash(geohash) {
        document.getElementById('geohash_input').value = geohash;
        var geoHashBox = new GeoHashBox(geohash, map, marks, layer);
        geoHashBox.centerMap();
        geoHashBox.showNeighbors();
        geoHashBox.showPlus();



        
        
        // 后面这段是计算距离的
        searchInfo = document.getElementById("searchInfo");
        var __l = geoHashBox.neighbors.topright.corners.topright;
        var __ll = getAmapLngLat(__l.lng, __l.lat);
        var xdistance = geoHashBox.neighbors.topleft.corners.topleft.distance(__ll);
        var __l = geoHashBox.neighbors.bottomleft.corners.bottomleft;
        var __ll = getAmapLngLat(__l.lng, __l.lat);
        var ydistance = geoHashBox.neighbors.topleft.corners.topleft.distance(__ll);
        var searcharea = parseInt((xdistance / 1000) * (ydistance / 1000) * 100) / 100;
        if (xdistance > 2000) {
            xdistance = parseInt(xdistance / 10) / 100;
            ydistance = parseInt(ydistance / 10) / 100;
            units = "km";
        } else {
            xdistance = parseInt(xdistance + 0.5);
            ydistance = parseInt(ydistance + 0.5);
            units = "m";
        }
        console.log("矩形[宽:" + xdistance + units + ", 高:" + ydistance + units + "] 查询平面面积(" + searcharea + "平方公里)");
    }

    // 清除地图上所有标记
    function cleanUp() {
        for(i in marks) {
            marks[i].setMap(null);
        }
        marks = [];
    }

    $(function() {
        initMap();
        $('#btn_ok').click(function() {
            cleanUp();
            plotGeoHash(document.getElementById('geohash_input').value);
        });
    });
    $(window).on('resize', function() {
        //sizeMap();
    });

})();