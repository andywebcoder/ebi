$(function($) {
    $('.header-logo, .top-logo_sp, .header-hamburger_line').on('click',function(){
        $('.header-hamburger_line').toggleClass('active');
        $('.header-nav').toggleClass('active');
        $('body').toggleClass('is-open');
        $('.js-nav').toggleClass('is-open');
    });
});

// function fadeAnime(){
// // 回転
// $('.rotateRightZTrigger').each(function(){
//     var elemPos = $(this).offset().top-50;
//     var scroll = $(window).scrollTop();
//     var windowHeight = $(window).height();
//     if (scroll >= elemPos - windowHeight)
//     {
//         $(this).addClass('rotateRightZ');
//     }else{
//         $(this).removeClass('rotateRightZ');
//     }
// });
// }
// 
// $(window).scroll(function (){
//     fadeAnime();
// });
// $(window).on('load', function(){
//     fadeAnime();
// });

// スクロールして表示領域に入ったらclass付与
$(function () {
    $(".js-rotate,.js-popup,.js-content-sp,").on("inview", function () {
        $(this).addClass("is-inview");
    });
});