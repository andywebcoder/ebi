//headerの読み込み・PC時お問い合わせモーダル用
// fetch("/partial/header.html")
//     .then((response) => response.text())
//     .then((data) => document.querySelector("#js-header").innerHTML = data);
// 
// //footerの読み込み・スマホ時MENUモーダル用
// fetch("/partial/footer.html")
//     .then((response) => response.text())
//     .then((data) => document.querySelector("#js-footer").innerHTML = data);


$(function($) {
    $('.header-logo').on('click',function(){
        $('.header-hamburger_line').toggleClass('active');
        $('.header-nav').toggleClass('active');
        $('body').toggleClass('is-open');
        $('.js-nav').toggleClass('is-open');
    });
    $('.header-hamburger_line').on('click',function(){
        // $('.header-nav').toggleClass('active');
    })
});

$(function () {
    // スクロール時の処理
    $(window).scroll(function () {
      // 対象要素に初期状態のスタイルを付与
    $(".scroll-anim").addClass("ready");

    // ウィンドウの高さを取得
    const windowHeight = $(this).height();

    // 現在の座標を取得
    const scrollAmount = $(this).scrollTop();

    $(".ready").each(function () {
    // 対象要素の座標を取得
    const targetPosition = $(this).offset().top;

    // 対象要素が画面内に入った時の処理
    if (scrollAmount > targetPosition - windowHeight + 60) {
        $(this).addClass("active");
    } else {
        $(this).removeClass("active");
    }
    });
});
});
