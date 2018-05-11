var sliderBar = {
	callback:null,	//�ص��¼�
	
	touchArea:null,		//������ ������
	slider:null,	//����
	scale:null,		//�̶ȱ������
	
	width:null,
	itpt:null,		//�����̶ȳ���
	index:0,		//��������λ��
	
	time:null,		//��ǰʱ��
	
	init:function(callback) {		//��ʼ��
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
		//��ʼ���������laydateʵ��
		var lay = laydate.render({
			elem: '#timeInput', 	//ָ��Ԫ��
			value: time,			//��ʼֵ
			showBottom: false,		//�����ֵײ�ѡ����
			done: function(value, date){	//�ص�����
				//console.log('��ѡ��������ǣ�' + value);
				//console.log(date);
				sliderBar.time = value;
				sliderBar.returnTime();
			},
		});
		
		//���ó�ʼֵ��ʱ��
		sliderBar.time = time;			//��¼��ǰʱ��
		sliderBar.index = hour;
		sliderBar.setSliderIndex();
	},
	layoutInit:function(){	//��ʼ���̶����򲼾�
		var width = sliderBar.scale.css("width").split("px")[0];
		sliderBar.width = width;
		sliderBar.itpt = (((width / 23) * 100) >> 0) / 100;
		
		var html = '';
		for(var i = 0; i < 24; i++) {
			var value = i < 10 ? '0' + i + ':00' : i + ':00';
			var left = (4.34 * i) + "%";
			html+= "<a style='position: absolute;top: .8em;margin-left: -2em;width: 4em;text-align: center;color: #fff;font-variant: small-caps;white-space: pre;left:" + left + ";'>" + value + "</a>";
		}
		sliderBar.scale.html(html);
	},
	setSliderPosition:function(left){		//���û�����ʾλ��
		sliderBar.slider.css('left', (left - 10) + 'px');
	},
	setOnTouchEvent:function(){	//���ô����¼�
		var onTouch = false;
		var clickX = 0;
		sliderBar.touchArea[0].addEventListener('mousedown',function(e){	//onmousedown	��갴ť������
			onTouch = true;
		});
		sliderBar.touchArea[0].addEventListener('mousemove',function(e){	//onmousemove	��걻�ƶ�
			if(onTouch) {	//����״̬ʱִ��
				var currentX = e.offsetX;
				sliderBar.setSliderPosition(currentX);
			}
		});
		sliderBar.touchArea[0].addEventListener('mouseup',function(e){		//onmouseup	    ��갴�����ɿ�
			if(onTouch) {	//����״̬ʱִ��
				var currentX = e.offsetX;
				sliderBar.slideStop(currentX);
				onTouch = false;
			}
		});
		sliderBar.touchArea[0].addEventListener('mouseout',function(e){		//onmouseout	����ĳԪ���ƿ�
			if(onTouch) {	//����״̬ʱִ��
				var currentX = e.offsetX;
				sliderBar.slideStop(currentX);
				onTouch = false;
			}
		});
	},
	slideStop:function(currentX) {		//����ֹͣ
		if(currentX < 0) currentX = 0;
		if(currentX > sliderBar.width) currentX = sliderBar.width;//�ж��Ƿ����
		
		var index = (currentX / sliderBar.itpt) >> 0;		//�������λ�ü��㵱ǰ��Ӧ�̶�����
		var x = currentX % sliderBar.itpt;
		index = x >= (sliderBar.itpt / 2) ? index  + 1: index;
		sliderBar.index = index;
		
		sliderBar.setSliderIndex();
	},
	setSliderIndex:function() {			//�����������û���λ��
		sliderBar.setSliderPosition(sliderBar.index * sliderBar.itpt);
		sliderBar.returnTime();
	},
	returnTime:function() {			//����ʱ��
		var value = sliderBar.index < 10 ? '0' + sliderBar.index + ':00' : sliderBar.index + ':00';
		sliderBar.callback ? sliderBar.callback(new Date(sliderBar.time + ' ' + value).getTime()) : null;
	},
	next:function() {		//��һʱ��
		sliderBar.index = (sliderBar.index + 1) > 23 ? 0 : sliderBar.index + 1;
		if(sliderBar.index == 0) {		//�����һʱ����0�����һ��
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
	previous:function() {		//��һʱ��
		sliderBar.index = (sliderBar.index - 1) < 0 ? 23 : sliderBar.index - 1;
		if(sliderBar.index == 23) {		//�����һʱ����23�����һ��
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
