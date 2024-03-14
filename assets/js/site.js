$(function($) {
    $('.header-logo, .top-logo_sp, .header-hamburger_line').on('click',function(){
        $('.header-hamburger_line').toggleClass('active');
        $('.header-nav').toggleClass('active');
        $('body').toggleClass('is-open');
        $('.js-nav').toggleClass('is-open');
    });
});

function fadeAnime(){
// 回転
$('.rotateLeftZTrigger').each(function(){
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
        $(this).addClass('rotateLeftZ');
    }else{
        $(this).removeClass('rotateLeftZ');
    }
});
    
$('.rotateRightZTrigger').each(function(){
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight)
    {
        $(this).addClass('rotateRightZ');
    }else{
        $(this).removeClass('rotateRightZ');
    }
});
}

$(window).scroll(function (){
    fadeAnime();
});
$(window).on('load', function(){
    fadeAnime();
});