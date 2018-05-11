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

    //左侧要素
    $('.leftMain .mainBtn').click(function(event) {
        $(this).parent().toggleClass('current');  
        
    });

    
    //预报时效
    $('select').change(function(event) {
        var myVal = $(this).children('option:selected').val();
        // alert(myVal); 
        $(this).closest('div').find('.selectA').html(myVal);
    });

    // 底部轮播图 
    function myFn(){
        var winW = $(window).width();
        var ulDivW = winW * 0.9;
        var liW = $('.lunBo .ulDiv ul li').outerWidth(true);
        var liLength = $('.lunBo .ulDiv ul li').length;

        $('.lunBo .ulDiv ul').width(liW * liLength);
        var ulW =  $('.lunBo .ulDiv ul').width();
         //console.log(ulW);
         //console.log(ulDivW);

        if(ulW > ulDivW){
            $('.lunBo .bottomDiv .arrowLBtn').css('background', 'url(static/image/icon9.png) no-repeat');

            $('.lunBo .bottomDiv .arrowRBtn').css('background','url(static/image/icon10.png) no-repeat');
        }else{
            $('.lunBo .bottomDiv .arrowLBtn').css('background','url(static/image/icon9.1.png) no-repeat');
            $('.lunBo .bottomDiv .arrowRBtn').css('background','url(static/image/icon10.1.png) no-repeat');
        }
    }
    myFn();

    $(window).resize(function(event) {
        myFn();
    });

    num = 0;
    $('.lunBo .arrowLBtn').click(function(event) {
        var winW = $(window).width();
        var ulDivW = winW * 0.9;
        var liW = $('.lunBo .ulDiv ul li').outerWidth(true);
        var lis = Math.floor( ulDivW / liW ) ;
        var liLength = $('.lunBo .ulDiv ul li').length;
        var geShu = liLength - lis;

        num++;
        if(num > geShu){
            num = geShu;
        }
        var move = num * -169.4;
        $('.lunBo .ulDiv ul').stop().animate({'left':''+move+'px'},500);
        
    });

    $('.lunBo .arrowRBtn').click(function(event) {
        var winW = $(window).width();
        var ulDivW = winW * 0.9;
        var liW = $('.lunBo .ulDiv ul li').outerWidth(true);
        var lis = Math.floor( ulDivW / liW ) ;
        var liLength = $('.lunBo .ulDiv ul li').length;
        var geShu = liLength - lis;

        num--;
        if(num < 0){
            num = 0;
        }
        var move = num * -169.4;
        $('.lunBo .ulDiv ul').stop().animate({'left':''+move+'px'},500);
        
    });
    

})