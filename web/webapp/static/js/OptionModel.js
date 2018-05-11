var optionModel = {

    mDataType: 'REAL',  //实况 REAL； 预报 FC
    mVti: "",
    // 位势高度，温度，风场，相对湿度，降水量
    // 颠簸，积冰，云顶高，云底高，能见度，雷暴
    mElemArray: ["model_hh", "model_tt", "model_ws", "model_rh", "model_rn",
                "model_cat", "model_ice", "model_cth", "model_clh", "model_ts"],
    mElemSelect: [1,1,1,1,1,1,1,1,1,1],

    mStartTime: null,
    mTime: null,

    mTempLevel:"",
    mAqiCategory:"",
    mPressureLevel:"",

    init: function () {


    },

    getElemIndex: function (elem) {
        var index;
        for (var i = 0; i < optionModel.mElemArray.length; i++) {
            if (optionModel.mElemArray[i] == elem)
                return i;
        }

        return -1;
    },

    setTempLevel: function (level) {
        optionModel.mTempLevel = level;
    },

    setAqiCategory: function (category) {
        optionModel.mAqiCategory = category;
    },

    setPressureLevel: function (level) {
        optionModel.mPressureLevel = level;
    },

    setElemSelectByName: function (elem) {
        var index = optionModel.getElemIndex(elem);
        console.log("index:" + index);
        if (index != -1) {
            optionModel.setElemSelectByIndex(index)
        }

    },

    setElemSelectByIndex:function(index){
        for (var i = 0; i < optionModel.mElemSelect.length; i++) {
            if (i == index) {
                optionModel.setElemSelectsByIndex(i, true)
            }else {
                optionModel.setElemSelectsByIndex(i, false)
            }
        }
    },

    setElemSelectsByIndex: function (index, isSelected) {
        if (isSelected) {
            optionModel.mElemSelect[index] = 0;
        }else {
            optionModel.mElemSelect[index] = 1;
        }
    },

    setVti: function (vti) {
        optionModel.mVti = vti;
    },

    setTime: function (time) {
        optionModel.mTime = time;
    },

    setStartTime: function (time) {
        optionModel.mStartTime = time;
    },

    setDataType: function (dataType) {
        optionModel.mDataType = dataType;
    },

    update:function () {
        var selecteds = optionModel.mElemSelect;
        console.log("selected:"+selecteds)
        for (var i = 0; i < selecteds.length; i++) {
            if (selecteds[i] == 0) {
                console.log("update station "+ optionModel.mElemArray[i]+
                " "+optionModel.mDataType +"  "+optionModel.mVti+ "  "+
                optionModel.mTime + "  "+ optionModel.mTempLevel)
            }
        }
    },


};