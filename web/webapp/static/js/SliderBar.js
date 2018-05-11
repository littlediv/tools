var sliderBar = {
    callback:null,	//回调事件

    touchArea:null,		//进度轴 触摸板
    slider:null,	//滑块
    scale:null,		//刻度标记区域

    width:null,
    itpt:null,		//单个刻度长度
    index:0,		//滑块所在位置

    time:null,		//当前时间

    init:function(callback) {		//初始化
        sliderBar.touchArea = $('#bar');
        sliderBar.slider = $('#slider');
        sliderBar.scale = $('#scale');

        sliderBar.callback = callback;

        sliderBar.layoutInit();
        sliderBar.setOnTouchEvent();

        var time = new Date();

        var hour = time.getHours();
        var month = time.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        time = time.getFullYear() + '-' + month + '-' + time.getDate();
        //初始化三方插件laydate实例
        var lay = laydate.render({
            elem: '#timeInput', 	//指定元素
            value: time,			//初始值
            showBottom: false,		//不出现底部选择栏
            done: function(value, date){	//回调函数
                //console.log('你选择的日期是：' + value);
                //console.log(date);
                sliderBar.time = value;
                sliderBar.returnTime();
            },
        });

        //设置初始值（时）
        sliderBar.time = time;			//记录当前时间
        sliderBar.index = hour;
        sliderBar.setSliderIndex();
    },
    layoutInit:function(){	//初始化刻度区域布局
        var width = sliderBar.scale.css("width").split("px")[0];
        sliderBar.width = width;
        sliderBar.itpt = (((width / 23) * 100) >> 0) / 100;

        var html = '';
        for(var i = 0; i < 24; i++) {
        	if (i == 0 || (i+1)%3 != 0)
        		continue
            var value = i < 10 ? '0' + i + ':00' : i + ':00';
            var left = (4.34 * i) + "%";
            html+= "<a style='position: absolute;top: .8em;margin-left: -2em;width: 4em;text-align: center;color: #111;font-variant: small-caps;white-space: pre;left:" + left + ";'>" + value + "</a>";
        }
        sliderBar.scale.html(html);
    },
    setSliderPosition:function(left){		//设置滑块显示位置
        sliderBar.slider.css('left', (left - 10) + 'px');
    },
    setOnTouchEvent:function(){	//设置触摸事件
        var onTouch = false;
        var clickX = 0;
        sliderBar.touchArea[0].addEventListener('mousedown',function(e){	//onmousedown	鼠标按钮被按下
            onTouch = true;
        });
        sliderBar.touchArea[0].addEventListener('mousemove',function(e){	//onmousemove	鼠标被移动
            if(onTouch) {	//按下状态时执行
                var currentX = e.offsetX;
                sliderBar.setSliderPosition(currentX);
            }
        });
        sliderBar.touchArea[0].addEventListener('mouseup',function(e){		//onmouseup	    鼠标按键被松开
            if(onTouch) {	//按下状态时执行
                var currentX = e.offsetX;
                sliderBar.slideStop(currentX);
                onTouch = false;
            }
        });
        sliderBar.touchArea[0].addEventListener('mouseout',function(e){		//onmouseout	鼠标从某元素移开
            if(onTouch) {	//按下状态时执行
                var currentX = e.offsetX;
                sliderBar.slideStop(currentX);
                onTouch = false;
            }
        });
    },
    slideStop:function(currentX) {		//滑动停止
        if(currentX < 0) currentX = 0;
        if(currentX > sliderBar.width) currentX = sliderBar.width;//判断是否出界

        var index = (currentX / sliderBar.itpt) >> 0;		//根据鼠标位置计算当前对应刻度索引
        var x = currentX % sliderBar.itpt;
        index = x >= (sliderBar.itpt / 2) ? index  + 1: index;
        sliderBar.index = index;

        sliderBar.setSliderIndex();
    },
    setSliderIndex:function() {			//根据索引设置滑块位置
        sliderBar.setSliderPosition(sliderBar.index * sliderBar.itpt);
        sliderBar.returnTime();
    },
    returnTime:function() {			//返回时间
        var value = sliderBar.index < 10 ? '0' + sliderBar.index + ':00' : sliderBar.index + ':00';
        sliderBar.callback ? sliderBar.callback(new Date(sliderBar.time + ' ' + value).getTime()) : null;
    },
    next:function() {		//下一时次
        sliderBar.index = (sliderBar.index + 1) > 23 ? 0 : sliderBar.index + 1;
        if(sliderBar.index == 0) {		//如果下一时次是0点则加一天
            var time = new Date(sliderBar.time);
            time.setDate(time.getDate() + 1);
            var month = time.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            time = time.getFullYear() + '-' + month + '-' + time.getDate();
            sliderBar.time = time;
            $('#timeInput').html(time);
        }
        sliderBar.setSliderIndex();
    },
    previous:function() {		//上一时次
        sliderBar.index = (sliderBar.index - 1) < 0 ? 23 : sliderBar.index - 1;
        if(sliderBar.index == 23) {		//如果上一时次是23点则减一天
            var time = new Date(sliderBar.time);
            time.setDate(time.getDate() - 1);
            var month = time.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            time = time.getFullYear() + '-' + month + '-' + time.getDate();
            sliderBar.time = time;
            $('#timeInput').html(time);
        }
        sliderBar.setSliderIndex();
    },
};