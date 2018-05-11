var optionRadar = {

    mDataType: 'REAL',  //实况 REAL； 预报 FC
    mVti: "",
    // 类型，区域
    mElemArray: ["radar_type", "radar_area"],
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
        for (var i = 0; i < optionRadar.mElemArray.length; i++) {
            if (optionRadar.mElemArray[i] == elem)
                return i;
        }

        return -1;
    },

    setTempLevel: function (level) {
        optionRadar.mTempLevel = level;
    },

    setAqiCategory: function (category) {
        optionRadar.mAqiCategory = category;
    },

    setPressureLevel: function (level) {
        optionRadar.mPressureLevel = level;
    },

    setElemSelectByName: function (elem) {
        var index = optionRadar.getElemIndex(elem);
        console.log("index:" + index);
        if (index != -1) {
            optionRadar.setElemSelectByIndex(index)
        }

    },

    setElemSelectByIndex:function(index){
        for (var i = 0; i < optionRadar.mElemSelect.length; i++) {
            if (i == index) {
                optionRadar.setElemSelectsByIndex(i, true)
            }else {
                optionRadar.setElemSelectsByIndex(i, false)
            }
        }
    },

    setElemSelectsByIndex: function (index, isSelected) {
        if (isSelected) {
            optionRadar.mElemSelect[index] = 0;
        }else {
            optionRadar.mElemSelect[index] = 1;
        }
    },

    setVti: function (vti) {
        optionRadar.mVti = vti;
    },

    setTime: function (time) {
        optionRadar.mTime = time;
    },

    setStartTime: function (time) {
        optionRadar.mStartTime = time;
    },

    setDataType: function (dataType) {
        optionRadar.mDataType = dataType;
    },

    update:function () {
        var selecteds = optionRadar.mElemSelect;
        console.log("selected:"+selecteds)
        for (var i = 0; i < selecteds.length; i++) {
            if (selecteds[i] == 0) {
                console.log("update station "+ optionRadar.mElemArray[i]+
                " "+optionRadar.mDataType +"  "+optionRadar.mVti+ "  "+
                optionRadar.mTime + "  "+ optionRadar.mTempLevel)
            }
        }
    },


};