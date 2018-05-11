$(function(){

    //搜索框
    $('.header .searchInput').focus(function(event) {
        var myVal = $(this).val();
        if(myVal == '搜索位置、气象站'){
            $(this).val('');
        }else{
            $(this).val(myVal);
        }
    }).blur(function(event) {
        var myVal = $(this).val();
        if(myVal == ''){
            $(this).val('搜索位置、气象站');
        }else{
            $(this).val(myVal);
        }
    });

    // 页面切换框
    $('.pageSwitch>li>a').click(function(event) {
        $(this).parent().addClass('current').siblings().removeClass('current');
        $('#mySelect').trigger('click');
    });

    $('.pageSwitch li .menuUL li a').click(function(event) {
        $(this).parent().addClass('current').siblings().removeClass('current');
    });


    // 工具
    $('.tool .toolBtn').click(function(event) {
        $(this).parent().toggleClass('current').siblings().removeClass('current');
    });
    

    $('.tool .twoMenuIcon').each(function(index, val) {
         var num;
         num = index * -18;
         $(val).css('background-position', '-35px '+num+'px');
    });

    $('.tool .twoMenuIcon').eq(0).css('background-position', '-60px 0');

    //点击地图的二级菜单
    $('.tool .oneLi .twoMenu').click(function(event) {
        $(this).parent().addClass('current').siblings().removeClass('current');

        $('.tool .twoMenuIcon').each(function(index, val) {
             var num;
             num = index * -18;
             $(val).css('background-position', '-35px '+num+'px');
        });

        var myIndex = $(this).closest('li').index();
        var num;
        num = myIndex * -18;
        $(this).children().css('background-position', '-60px '+num+'px');
    });

    

    //点击工具的二级菜单
    $('.tool .twoLi .twoMenu').click(function(event) {
        $(this).parent().addClass('current').siblings().removeClass('current');

        $('.tool .twoMenuIcon').each(function(index, val) {
             var num;
             num = index * -18;
             $(val).css('background-position', '-35px '+num+'px');
        });

        var myIndex = $(this).closest('li').index();
        var num;
        var myLi = $('.tool .oneLi li').length;
        num = (myIndex + myLi) * -18;
        $(this).children().css('background-position', '-60px '+num+'px');
    });

    //点击图例的二级菜单
    $('.tool .threeLi .twoMenu').click(function(event) {
        $(this).parent().addClass('current').siblings().removeClass('current');

        $('.tool .twoMenuIcon').each(function(index, val) {
             var num;
             num = index * -18;
             $(val).css('background-position', '-35px '+num+'px');
        });

        var myIndex = $(this).closest('li').index();
        var num;
        var myLi = $('.tool .oneLi li').length + $('.tool .twoLi li').length;
        num = (myIndex + myLi) * -18;
        $(this).children().css('background-position', '-60px '+num+'px');
    });

    $('.tool .twoLi .toolBtn,.tool .threeLi .toolBtn').click(function(event) {
        if($(this).parent().hasClass('current')){
            $(this).siblings('ul').children('li').removeClass('current');
        }
        $('.tool .twoMenuIcon').each(function(index, val) {
             var num;
             num = index * -18;
             $(val).css('background-position', '-35px '+num+'px');
        });
    });


    //预报时效
    $('select').change(function(event) {
        var myVal = $(this).children('option:selected').val();
        // alert(myVal); 
        $(this).closest('div').find('.selectA').html(myVal);
    });

    //左侧要素
    $('.leftMain .iconSpan').each(function(index, val) {
         var num;
         num = index * -36;
         $(val).css('background-position', '0px '+num+'px');
    });
    $('.leftMain .mainBtn').click(function(event) {
        $(this).parent().addClass('current').siblings().removeClass('current');  

        $('.leftMain .iconSpan').each(function(index, val) {
             var num;
             num = index * -36;
             $(val).css('background-position', '0px '+num+'px');
        });

        var myIndex = $(this).closest('li').index();
        var num;
        num = myIndex * -36;
        $(this).children().css('background-position', '-36px '+num+'px');
        
    });
 
    $('.leftMain .mainBtn').eq(6).children().css('background-position', '-36px -216px');

    //右侧面板
    // 点击搜素按钮右侧面板显示
    $('.header .searchBtn').click(function(event) {
        var rightPanelW = $('.rightPanel').width();
        $('.rightPanel').stop().animate({'right':'0'},200);
        $('.panelDel').stop().animate({'right':''+(rightPanelW - 10)+'px'},200);
        $('.tuLi,.predictionTime').stop().animate({'right':''+(rightPanelW + 20 )+'px'},200);

    });

    // 点击del右侧面板消失
    $('.panelDel').click(function(event) {
        $('.rightPanel').stop().animate({'right':'-1000px'},200);
        $(this).stop().animate({'right':'-50px'},200);
        $('.tuLi,.predictionTime').stop().animate({'right':'20px'},200);
    });

    //点击相应要素
    $('.rightPanel .listNav li a').click(function(event) {
        var myIndex = $(this).parent().index();    
        var myTop = $('.rightPanel .moduleDiv').eq(myIndex).offset().top;
        var rightTop = $('.rightPanel').scrollTop(myTop);
    });

})