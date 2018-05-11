$(function(){

    //左侧要素  
    $('.leftMain .mainBtn').eq(6).children().css('background-position', '0px -216px');

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
            $('.lunBo .bottomDiv .arrowLBtn').css('background','url(static/image/icon9.png) no-repeat');
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