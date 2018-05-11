var controller = {
     styles : [
        'Road',
        'RoadOnDemand',
        'Aerial',
        'AerialWithLabels'
    ],

    mCenterLat : 39.89,
    mCenterLon : 116.28,
    mZoom : 4,
    // mDataType : 'REAL',  //实况 REAL； 预报 FC
    // mLevel:"",
    // mVti:"",
    // mElem:"",
    mTime:null,

    layers : [],
    // var baseUrl = 'http://weather1.xinhong.net/gfs/isosurfacedata?';
    baseUrl : 'http://localhost:8899/service',


    view: null,
    map:null,



    init:function(){

        controller.layers.push(
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }));

        controller.layers.push(new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                params: {
                    'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
                    'TILED': true
                }
            })
        }));
        controller.view = new ol.View({
            center: ol.proj.fromLonLat([controller.mCenterLon, controller.mCenterLat]),
            zoom: controller.mZoom
        });

        controller.map = new ol.Map({
            layers: controller.layers,
            // Improve user experience by loading tiles while dragging/zooming. Will make
            // zooming choppy on mobile or slow devices.
            loadTilesWhileInteracting: true,
            target: 'map',
            view: controller.view
        });



        $('#administrativeMap').on({'click': function (){controller.switchMap(0);}});
        $('#satelliteMap').on({'click': function (){controller.switchMap(1);}});

        controller.switchMap(0);


        controller.initStation();
        controller.initAirport();
        controller.initModel();


    },


    switchMap:function(type) {
        console.info(type);
        for (var i = 0, ii = controller.layers.length; i < ii; ++i) {
            var visible = false;
            if (i == type) {
                visible = true;
            }
            controller.layers[i].setVisible(visible);
        }
    },



    // parseJsonData : function(res) {
    //     if (res.status_code != 0) {
    //         return
    //     }
    //     var start = ol.proj.fromLonLat(res.data.slng, res.data.slat);
    //     var end = ol.proj.fromLonLat(res.data.elng, res.data.elat);
    //     var imageExtent =  new ol.Bounds(start.x, start.y, end.x, end.y);
    //     var img_size = new ol.Size(res.data.width, res.data.height);
    //     var image = new ol.layer.Image({
    //         source:new ol.source.ImageStatic({
    //             url: res.data.url + res.data.files[0],
    //             crossOrigin:'',
    //             imageExtent: imageExtent,
    //             imageSize:img_size
    //         })
    //     })
    //     map.addLayer(image);
    // },



    addElemEvent: function (elem) {
        $('#'+elem).on({'click':function () {
                controller.containType = true;
                // controller.mElem = elem
                // controller.showRealOrFCElem();


                optionStation.setElemSelectByName(elem);
                optionStation.update();
                //
                optionAirport.setElemSelectByName(elem)
                optionAirport.update();

                optionModel.setElemSelectByName(elem);
                optionModel.update()
        }});

    },

    initStation: function () {

        // ["ws", "tt", "rh", "rn", "pr", "vis", "wth", "aqi"],
        controller.addElemEvent("station_ws");
        controller.addElemEvent("station_tt");
        controller.addElemEvent("station_rh");
        controller.addElemEvent("station_rn");
        controller.addElemEvent("station_pr");
        controller.addElemEvent("station_vis");
        controller.addElemEvent("station_wth");
        controller.addElemEvent("station_aqi")


        controller.addHeightLevelEvent("station_tt");
        controller.addHeightLevelEvent("station_aqi");


        // 实况 预报 切换
        $('#dataType').change(function () {
            var value = $(this).children('option:selected').val();
            console.log('data :'+ value)
            if ("实况" == value) {
                optionStation.setDataType("REAL");
            }else if ("预报" == value) {
                optionStation.setDataType("FC");
            }
            // console.log(value +" : "+ optionStation.mDataType)
            optionStation.update()

        });
    },

    initAirport: function () {
        // mElemArray: ["airport_ws", "airport_tt", "airport_rh", "airport_pr", "airport_cat", "airport_ice",
        //     "airport_vis", "airport_wth", "airport_cloud"],
        controller.addElemEvent("airport_ws");
        controller.addElemEvent("airport_tt");
        controller.addElemEvent("airport_rh");
        controller.addElemEvent("airport_pr");
        controller.addElemEvent("airport_cat");
        controller.addElemEvent("airport_ice");
        controller.addElemEvent("airport_vis");
        controller.addElemEvent("airport_wth");
        controller.addElemEvent("airport_cloud");


        controller.addHeightLevelEvent("airport_cloud");

    },

    initModel: function () {
        // mElemArray: ["model_hh", "model_tt", "model_ws", "model_rh", "model_rn",
        //     "model_cat", "model_ice", "model_cth", "model_clh", "model_ts"],
        controller.addElemEvent("model_hh");
        controller.addElemEvent("model_tt");
        controller.addElemEvent("model_ws");
        controller.addElemEvent("model_rh");
        controller.addElemEvent("model_rn");

        controller.addElemEvent("model_cat");
        controller.addElemEvent("model_ice");
        controller.addElemEvent("model_cth");
        controller.addElemEvent("model_clh");
        controller.addElemEvent("model_ts");


    },



    // 位势高度 切换


    addHeightLevelEvent :function addHeightLevelEvent(elem) {

        $('#'+elem+'_selected').change(function () {
            var value = $(this).children('option:selected').val();
            console.log("位势高度：" + value);

            if ("station_tt" == elem){
                optionStation.setTempLevel(value);
                optionStation.update()
            } else if("station_pr" == elem){
                optionStation.setPressureLevel(value);
                optionStation.update()
            } else if ("station_aqi" == elem) {
                optionStation.setAqiCategory(value);
                optionStation.update()
            } else if ("airport_cloud"== elem) {
                optionAirport.setCloudType(value);
                optionAirport.update()
            }



            // controller.showRealOrFCElem();

        });
    },




    showRealOrFCElem:function (){


        // var time = new Date().getTime();
        // controller.mZoom = controller.view.getZoom();
        // var requestdata = {
        //     vti:controller.mVti,
        //     level:controller.mLevel,
        //     elem:controller.mElem,
        //     dataType:controller.mDataType,
        //     time:controller.mTime,
        //     centerLat:controller.mCenterLat,
        //     centerLon:controller.mCenterLon,
        //     zoom:controller.mZoom,
        //     zoom:controller.mZoom,
        //     width:$('#map').width(),
        //     height:$('#map').height()
        // };
        // console.info(requestdata);
        // // $.post(baseUrl,requestdata,function(data){process(data);},'json');
        // // function process(data) {
        // //     parseJsonData(data);
        // // }
        //
        // $.get("line/hh",function(data){
        //     console.log(data);
        //     controller.drawLine(data);
        // },'json');
        // function process(data) {
        //     controller.parseJsonData(data);
        // }
    },

    // drawLine:function (data) {
    //     var lines = data.data.lines;
    //
    //     var line1 = lines[0];
    //     var lats = line1.lat;
    //     var lngs = line1.lng;
    //
    //     var lineArray = new Array();
    //     for (var i = 0; i < lats.length; i++) {
    //         // lineArray[i]= new Array( lngs[i], lats[i])
    //         lineArray[i] = new Array(i, i);
    //     }
    //
    //     console.log(lineArray)
    //
    //
    //     var feature = new ol.Feature({
    //         geometry:new ol.geom.LineString(
    //             lineArray)
    //     });
    //
    //     feature.setStyle(new ol.style.Style({
    //         stroke: new ol.style.Stroke({
    //             width: 3,
    //             color: [255, 0, 0, 1]
    //         })
    //     }));
    //
    //     var source = new ol.source.Vector({
    //         features:[feature]
    //     });
    //
    //     var layer = new ol.layer.Vector({
    //         source: source
    //
    //     });
    //
    //     layer.setZIndex(10)
    //     map.addLayer(layer)
    //
    //     var layers = map.getLayers();
    //     for (var i = 0; i < layers.length; i++) {
    //         console.log(layers[i].source)
    //     }
    //
    // },



    // 初始加载
    containType : false,




    // String.prototype.format = function(args) {
    //     var result = this;
    //     if (arguments.length > 0) {
    //         if (arguments.length == 1 && typeof (args) == "object") {
    //             for (var key in args) {
    //                 if(args[key]!=undefined){
    //                     var reg = new RegExp("({" + key + "})", "g");
    //                     result = result.replace(reg, args[key]);
    //                 }
    //             }
    //         }
    //         else {
    //             for (var i = 0; i < arguments.length; i++) {
    //                 if (arguments[i] != undefined) {
    //                     var reg= new RegExp("({)" + i + "(})", "g");
    //                     result = result.replace(reg, arguments[i]);
    //                 }
    //             }
    //         }
    //     }
    //     return result;
    // }
    //
    // function getElem(index){
    //     var elem = ""
    //     switch (index) {
    //         case 0:
    //
    //             break
    //         case 1:
    //             elem = "";
    //             break
    //         case 2:
    //             elem = "";
    //             break
    //         case 3:
    //             elem = "";
    //             break
    //         case 4:
    //             elem = "HH";
    //             break
    //
    //     }
    //
    //     return elem;
    // }
    //
    // var isolineUrl = "http://weather1.xinhong.net/gfs/isolinedata?level={1}&elem={0}";
    // function getUrl(elem, level, time) {
    //     var url;
    //     switch (elem) {
    //         case "HH":
    //             url = "http://weather1.xinhong.net/gfs/isolinedata?level={1}&elem={0}".format(elem, level)
    //             break
    //
    //
    //     }
    //
    //     return url;
    // }


    setTime:function (time) {
        controller.mTime = time;
        optionStation.setTime(time)
    },

    update:function () {
        optionStation.update()

    }


}

