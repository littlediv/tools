var optionAirport = {

    // mDataType: 'REAL',  //实况 REAL； 预报 FC
    mVti: "",
    // 风场，气温，湿度，气压，颠簸，积冰，能见度，天气现象，云
    mElemArray: ["airport_ws", "airport_tt", "airport_rh", "airport_pr", "airport_cat", "airport_ice",
        "airport_vis", "airport_wth", "airport_cloud"],
    mElemSelect: [1,1,1,1,1,1,1,1,1],

    mStartTime: null,
    mTime: null,

    mTempLevel:"",
    mAqiCategory:"",
    mPressureLevel:"",
    mCloudType: "",

    init: function () {


    },

    getElemIndex: function (elem) {
        var index;
        for (var i = 0; i < optionAirport.mElemArray.length; i++) {
            if (optionAirport.mElemArray[i] == elem)
                return i;
        }

        return -1;
    },

    setTempLevel: function (level) {
        optionAirport.mTempLevel = level;
    },

    setAqiCategory: function (category) {
        optionAirport.mAqiCategory = category;
    },

    setPressureLevel: function (level) {
        optionAirport.mPressureLevel = level;
    },

    setCloudType: function (type) {
        optionAirport.mCloudType = type;
    },

    setElemSelectByName: function (elem) {
        var index = optionAirport.getElemIndex(elem);
        console.log("index:" + index);
        if (index != -1) {
            optionAirport.setElemSelectByIndex(index)
        }

    },

    setElemSelectByIndex:function(index){
        for (var i = 0; i < optionAirport.mElemSelect.length; i++) {
            if (i == index) {
                optionAirport.setElemSelectsByIndex(i, true)
            }else {
                optionAirport.setElemSelectsByIndex(i, false)
            }
        }
    },

    setElemSelectsByIndex: function (index, isSelected) {
        if (isSelected) {
            optionAirport.mElemSelect[index] = 0;
        }else {
            optionAirport.mElemSelect[index] = 1;
        }
    },

    setVti: function (vti) {
        optionAirport.mVti = vti;
    },

    setTime: function (time) {
        optionAirport.mTime = time;
    },

    setStartTime: function (time) {
        optionAirport.mStartTime = time;
    },

    // setDataType: function (dataType) {
    //     optionAirport.mDataType = dataType;
    // },

    update:function () {
        var selecteds = optionAirport.mElemSelect;
        console.log("selected:"+selecteds)
        for (var i = 0; i < selecteds.length; i++) {
            if (selecteds[i] == 0) {
                console.log("update station "+ optionAirport.mElemArray[i]+
                    " " +"  "+optionAirport.mVti+ "  "+
                    optionAirport.mTime + "  "+ optionAirport.mTempLevel+"  "+
                optionAirport.mCloudType)
            }
        }
    },


};