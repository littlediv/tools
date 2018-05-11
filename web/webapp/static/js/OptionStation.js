var optionStation = {

    mDataType: 'REAL',  //实况 REAL； 预报 FC
    mVti: "",
    // 风场，气温，湿度，降水，气压，能见度，天气现象，空气质量
    mElemArray: ["station_ws", "station_tt", "station_rh", "station_rn", "station_pr", "station_vis", "station_wth", "station_aqi"],
    mElemSelect: [1,1,1,1,1,1,1,1],

    mStartTime: null,
    mTime: null,

    mTempLevel:"",
    mAqiCategory:"",
    mPressureLevel:"",

    init: function () {


    },

    getElemIndex: function (elem) {
        var index;
        for (var i = 0; i < optionStation.mElemArray.length; i++) {
            if (optionStation.mElemArray[i] == elem)
                return i;
        }

        return -1;
    },

    setTempLevel: function (level) {
        optionStation.mTempLevel = level;
    },

    setAqiCategory: function (category) {
        optionStation.mAqiCategory = category;
    },

    setPressureLevel: function (level) {
        optionStation.mPressureLevel = level;
    },

    setElemSelectByName: function (elem) {
        var index = optionStation.getElemIndex(elem);
        console.log("index:" + index);
        if (index != -1) {
            optionStation.setElemSelectByIndex(index)
        }

    },

    setElemSelectByIndex:function(index){
        for (var i = 0; i < optionStation.mElemSelect.length; i++) {
            if (i == index) {
                optionStation.setElemSelectsByIndex(i, true)
            }else {
                optionStation.setElemSelectsByIndex(i, false)
            }
        }
    },

    setElemSelectsByIndex: function (index, isSelected) {
        if (isSelected) {
            optionStation.mElemSelect[index] = 0;
        }else {
            optionStation.mElemSelect[index] = 1;
        }
    },

    setVti: function (vti) {
        optionStation.mVti = vti;
    },

    setTime: function (time) {
        optionStation.mTime = time;
    },

    setStartTime: function (time) {
        optionStation.mStartTime = time;
    },

    setDataType: function (dataType) {
        optionStation.mDataType = dataType;
    },

    update:function () {
        var selecteds = optionStation.mElemSelect;
        console.log("selected:"+selecteds)
        for (var i = 0; i < selecteds.length; i++) {
            if (selecteds[i] == 0) {
                console.log("update station "+ optionStation.mElemArray[i]+
                " "+optionStation.mDataType +"  "+optionStation.mVti+ "  "+
                optionStation.mTime + "  "+ optionStation.mTempLevel)
            }
        }
    },


};