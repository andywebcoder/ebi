//headerの読み込み・PC時お問い合わせモーダル用
fetch("/partial/header.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#js-header").innerHTML = data)
    .then(() => {
        suggestLink("#js-header-search");
    });

//footerの読み込み・スマホ時MENUモーダル用
fetch("/partial/footer.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#js-footer").innerHTML = data)
    .then(() => {
        modalFunc('#js-modaal_footer-btn', 'modaal-menu');
        modalFunc('#js-modaal_header-btn', 'modaal-contact');

    });

//------------------------------------ 
// 各ページで実装するJS
//------------------------------------ 

$(window).on('load', function () {
    var path = location.pathname;
    console.log('このパスは' + path);
    //--------------------- 
    //トップページ
    //---------------------
    if (path == "/" || path == "/index.html") {
        //検索窓サジェスト機能
        suggestLink("#js-top_search");
        //おすすめの部屋を見るのスライダー 
        fetch("/partial/catalog-slider.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-catalog_slider").innerHTML = data)
            .then(() => {
                catalogSlider('#js-slider');
                //お気に入りボタン
                addActive('.js-fav_btn');

            });

        //ご相談・お問い合わせ(コンテナ幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta").innerHTML = data);
        //ご相談・お問い合わせ(全幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_full").innerHTML = data);

    }
    //--------------------- 
    //エリアから探す・路線から探すページ
    //---------------------
    if (path == "/area/" || path == "/line/") {
        //追従サーチボタンの読み込み用
        fetch("/partial/fiexdmenu-search.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-fiexdmenu_search").innerHTML = data)
            .then(() => {
                var thisOffset;
                $(window).scroll(function () {
                    if (!$('.fiexdmenu-search').hasClass('fiexdmenu-static')) {
                        thisOffset = $('#js-search').offset().top + $('#js-search').outerHeight() - 80;
                    }
                    if ($(window).scrollTop() + $(window).height() > thisOffset) {
                        $('.fiexdmenu-search').addClass('fiexdmenu-static');
                    } else {
                        $('.fiexdmenu-search').removeClass('fiexdmenu-static');
                    }
                });
            });
        // エリア・路線　アコーディオン用
        $(function () {
            $('.js-accordion_header').click(function () {
                $(this).next('.js-accordion_inner').slideToggle();
                $(this).toggleClass("open");
            });
        });

        //  エリア・路線　チェックボックスcheckdスタイル用
        addActive('.js-check', 'checkd');
        // エリア・路線　タブ切り替え用
        $(function () {
            $('#js-tab li').on('click', function () {
                $('#js-tab li, .js-tab_list').removeClass('active');
                $(this).addClass('active');
                var index = $('#js-tab li').index(this);
                $('.js-tab_list').eq(index).addClass('active');
            });
        });

    }
    if (path == "/line/") {
        //モーダル
        fetch("/partial/modal-line.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-modal_line").innerHTML = data)
            .then(() => {
                //  エリア・路線　チェックボックスcheckdスタイル用
                addActive('.js-check', 'checkd');
                // 路線　モーダル用
                modalFunc('.js-modaal_line-btn', 'modaal-station');
            });
    }
    //--------------------- 
    //オンライン・物件のお問い合わせ・来店予約
    //---------------------
    if (path == "/online/" || path == "/reservation/" || path == "/contact/" || path == "/request/") {

        //プライバシーポリシー
        fetch("../../partial/privacy.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-privacy").innerHTML = data);

        //全角⇔半角に変換
        $("input").blur(function () {
            changeZen($(this));
        });
        changeZen = function (ele) {
            var val = ele.val();
            var han = val.replace(/[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 65248) });
            $(ele).val(han);
        }
        $('#js-form').validate({
            // バリデーションルール
            rules: {
                name: { required: true },
                email: { email: true },
                phone: { number: true },
                tool: { required: true },
                desired: { required: true },
                time: { required: true },
                station: { required: true },
                area: { required: true }
            },
            // エラーメッセージ
            messages: {
                name: { required: 'お名前を入力してください。', },
                email: { email: '有効なメールアドレスを入力してください。' },
                phone: { number: '有効な電話番号を入力してください。※ハイフンなし' },
                tool: { required: 'ツールを選択してください。', },
                contact: { required: '連絡方法を選択してください。', },
                season: { required: '時期を選択してください。', },
                content: { required: '内容を選択してください。', },
                desired: { required: '日付と時間を選択してください。', },
                time: { required: '時間を選択してください。', },
                station: { required: '希望の沿線・駅を入力してください。', },
                area: { required: '希望エリアを入力してください。', },
            },
            // エラーメッセージ出力箇所
            errorPlacement: function (error, element) {
                var name = element.attr('name');
                error.appendTo($('.form-error_' + name));
            },
        });

        //Datepicker
        $(function () {
            $('.input-desired').datepicker({
                changeYear: true,
                changeMonth: true,
                minDate: '0',
                maxDate: '+1y +6m',
            });
        });

    }
    if (path == "/contact/") {

        //チェックボックス
        const pcCheckAll = $("#js-table_check");
        const pcCheckSingle = $(".js-table-check");
        const spCheckall = $("#js-check");
        const spCheckSingle = $(".js-check");

        checkdList(pcCheckAll, pcCheckSingle);
        checkdList(spCheckall, spCheckSingle);

        // もっと見るボタン
        var moreNum = 3;
        var section = $("#contact");
        var pcItemlist = $("#js-tbody .contact-property_item");
        var spItemList = $("#js-list .contact-property_item");
        showList(pcItemlist, moreNum, section);
        showList(spItemList, moreNum, section);


    }
    //--------------------- 
    //棟詳細・号室詳細
    //---------------------
    if (
        path == "/catalog/31608/" ||
        path == "/catalog/31608/126637.html" ||
        path == "/catalog/jkk/" ||
        path == "/catalog/jkk/126637.html"
    ) {
        // スライダー
        $("#js-fv_slider").on("init", function (event, slick) {
            $(this).append(
                '<div class="slider-num"><span class="now-count"></span>　/　<span class="all-count"></span></div>'
            );
            $(".now-count").text(slick.currentSlide + 1);
            $(".all-count").text(slick.slideCount);
        }).slick({
            autoplay: true,
            arrows: true,
            asNavFor: ".thumbnail-slider",
            prevArrow: '<span class="prev_icon hover-cursor"><img src="/assets/img/icon/arrow.svg" alt=""></span>',
            nextArrow: '<span class="next_icon hover-cursor"><img src="/assets/img/icon/arrow.svg" alt=""></span>',

        }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            $(".now-count").text(nextSlide + 1);
        });
        $("#js-thumbnail_slider").slick({
            slidesToShow: 3,
            asNavFor: ".main-slider",
            infinite: false,
            focusOnSelect: true,
            arrows: false,
        });


        //360度画像
        fetch("/partial/360-view.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-360_view").innerHTML = data);


        //部屋一覧
        var listItem = document.querySelectorAll(".js-roomlist");

        $.each(listItem, function (index, value) {
            fetch("/partial/roomlist.html")
                .then((response) => response.text())
                .then((data) => listItem[index].innerHTML = data)
                .then(() => {

                    //チェックボックス
                    const pcCheckAll = $(".js-table_check");
                    const spCheckall = $(".js-list_check");

                    $.each(pcCheckAll, function (index, value) {
                        const pcCheckSingle = $('.js-available_tbody').eq(index).find(".js-table_available--check");
                        pcCheckAll.eq(index).on('click', function () {

                            if (pcCheckAll.eq(index).prop("checked")) {
                                for (val of pcCheckSingle) {
                                    val.checked = true;
                                }
                            } else {
                                for (val of pcCheckSingle) {
                                    val.checked = false;
                                }
                            }
                        });

                    })
                    $.each(spCheckall, function (index, value) {
                        const spCheckSingle = $('.js-available_list').eq(index).find(".js-list_available--check");
                        spCheckall.eq(index).on('click', function () {

                            if (spCheckall.eq(index).prop("checked")) {
                                for (val of spCheckSingle) {
                                    val.checked = true;
                                }
                            } else {
                                for (val of spCheckSingle) {
                                    val.checked = false;
                                }
                            }
                        });
                    })

                    // もっと見るボタン
                    var moreNum = 3;
                    var section = $(".js-room");
                    var pcItem = $(".js-available_tbody");
                    var spItem = $(".js-available_list");
                    $.each(pcItem, function (index, value) {
                        const pcItemlist = pcItem.eq(index).find(".roomlist-property_item");
                        const showBtn = section.eq(index).find(".js-show_btn");

                        if (pcItemlist.length <= moreNum) {
                            showBtn.hide();
                        }
                        pcItemlist.slice(moreNum).hide();
                        showBtn.on('click', function () {
                            $(this).hide();
                            pcItemlist.slice(moreNum).show();

                        });
                    })
                    $.each(spItem, function (index, value) {
                        const spItemlist = spItem.eq(index).find(".roomlist-item");
                        const showBtn = section.eq(index).find(".js-show_btn");

                        if (spItemlist.length <= moreNum) {
                            showBtn.hide();
                        }
                        spItemlist.slice(moreNum).hide();
                        showBtn.on('click', function () {
                            $(this).hide();
                            spItemlist.slice(moreNum).show();

                        });
                    })

                });
        })

        //ご相談・お問い合わせ(コンテナ幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta").innerHTML = data);

        //おすすめポイント
        fetch("/partial/catalog-point.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-catalog_point").innerHTML = data);

        //周辺地図
        fetch("/partial/catalog-map.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-catalog_map").innerHTML = data);

        //この物件に近い物件
        fetch("/partial/catalog-slider.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-catalog_slider").innerHTML = data)
            .then(() => {
                catalogSlider('#js-slider');

            });



        //ご相談・お問い合わせ(全幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_full").innerHTML = data);
        //追従メニュー
        fetch("/partial/fiexdmenu-fav.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-fav").innerHTML = data)
            .then(() => {
                //お気に入りボタン
                addActive('.js-fav_btn');
            });

    }

    //--------------------- 
    //よくあるご質問
    //---------------------
    if (path == "/faq.html") {

        $(".faq-list dd").hide();
        $(".faq-list").on("click", function (e) {
            $('dd', this).slideToggle(400);
            if ($(this).hasClass('js-accordion_open')) {
                $(this).removeClass('js-accordion_open');
            } else {
                $(this).addClass('js-accordion_open');
            }
        });
        //ご相談・お問い合わせ(全幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_full").innerHTML = data);

    }

    //--------------------- 
    //お気に入り
    //---------------------
    if (path == "/favorites.html") {

        //追従メニュー
        fetch("../../partial/fiexdmenu-fav-delete.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-fav").innerHTML = data)
            .then(() => {
                addActive('.js-fav_btn');
            });

    }

    //--------------------- 
    //閲覧履歴
    //---------------------
    if (path == "/history.html") {

        //追従メニュー
        fetch("../../partial/fiexdmenu-fav.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-fav").innerHTML = data)
            .then(() => {
                addActive('.js-fav_btn');
            });
    }

    //--------------------- 
    //スタッフ紹介
    //---------------------
    if (path == "/staff.html") {

        //ご相談・お問い合わせ(全幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_full").innerHTML = data);

    }

    //--------------------- 
    //JKK東京特集・UR賃貸住宅特集
    //---------------------
    if (path == "/feature/jkk.html" || path == "/feature/ur.html") {

        //シティモバイルでお申し込みのメリット
        fetch("/partial/merit.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-merit").innerHTML = data);

        //お問い合わせ
        fetch("/partial/cta-contact.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_contact").innerHTML = data);

        //お問い合わせ二個目
        fetch("/partial/cta-contact.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_contact2").innerHTML = data);
    }
       //--------------------- 
    //JKK東京特集・UR賃貸住宅特集
    //---------------------
    if (path == "/feature/cm_introdaction.html") {

        //お問い合わせ
        fetch("/partial/cta-contact.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_contact").innerHTML = data);
   }
    //--------------------- 
    //ハイクラス特集
    //---------------------
    if (path == "/feature/hi-class.html") {

        //お問い合わせ
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_full").innerHTML = data);

    }





    //--------------------- 
    //物件検索結果ページ
    //---------------------   
    if (
        path == "/area/A1A2A3A4A5A6A7.html" ||
        path == "/area/A1.html" ||
        path == "/line/station_6627.html" ||
        path == "/line/station_6627station_66299.html" ||
        path == "/keyword.html"
    ) {
        //sidebarの読み込み
        fetch("/partial/sidebar.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-sidebar").innerHTML = data)
            .then(() => {
                $("#js-sidebar_tab").on("click", function () {
                    $("#js-sidebar_tab").toggleClass('active');
                    $("#js-sidebar_tab").next().slideToggle();
                });
                //検索窓サジェスト機能は入れない方が良い？
                suggestNotLink("#js-sidebar_search");
                // エリアの変更　モーダル用
                modalFunc('.js-modaal_areas-btn', 'modaal-area');
                // 駅の変更　モーダル用
                modalFunc('.js-modaal_line-btn', 'modaal-station');

                //条件を追加するボタン
                const addBtn = $("#js-sidebar_add");
                const hiddenItem = addBtn.nextAll($("section"));

                hiddenItem.hide();
                addBtn.on('click', function () {
                    hiddenItem.show();
                    addBtn.hide();
                });
            });
        //sidebarエリアを変更するモーダルウィンドウ読み込み
        fetch("/partial/modal-sidebar-area.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-modal_sidebar--area").innerHTML = data)
            .then(() => {
                //  エリア　チェックボックスcheckdスタイル用
                addActive('.js-check', 'checkd');
            });
        //sidebar駅を変更すモーダルウィンドウ読み込み
        fetch("/partial/modal-sidebar-line.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-modal_sidebar--line").innerHTML = data)
            .then(() => {
                //  路線　チェックボックスcheckdスタイル用
                addActive('.js-check_line', 'checkd');
            });

        // スライダー
        $(".js-fv_slider").on("init", function (event, slick) {
            $(this).append(
                '<div class="slider-num"><span class="now-count"></span>　/　<span class="all-count"></span></div>'
            );
            $(".now-count").text(slick.currentSlide + 1);
            $(".all-count").text(slick.slideCount);
        }).not('.slick-initialized').slick({
            autoplay: true,
            arrows: true,
            asNavFor: ".thumbnail-slider",
            prevArrow: '<span class="prev_icon hover-cursor"><img src="/assets/img/icon/arrow.svg" alt=""></span>',
            nextArrow: '<span class="next_icon hover-cursor"><img src="/assets/img/icon/arrow.svg" alt=""></span>',

        }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            $(".now-count").text(nextSlide + 1);
        });
        $(".js-thumbnail_slider").slick({
            slidesToShow: 1,
            asNavFor: ".main-slider",
            infinite: false,
            focusOnSelect: true,
            arrows: false,
        });
        //チェックボックス
        const pcCheckAll = $(".js-table_check");
        const spCheckall = $(".js-list_check");

        $.each(pcCheckAll, function (index, value) {
            const pcCheckSingle = $('.js-available_tbody').eq(index).find(".js-table_available--check");
            pcCheckAll.eq(index).on('click', function () {

                if (pcCheckAll.eq(index).prop("checked")) {
                    for (val of pcCheckSingle) {
                        val.checked = true;
                    }
                } else {
                    for (val of pcCheckSingle) {
                        val.checked = false;
                    }
                }
            });

        })
        $.each(spCheckall, function (index, value) {
            const spCheckSingle = $('.js-available_list').eq(index).find(".js-list_available--check");
            spCheckall.eq(index).on('click', function () {

                if (spCheckall.eq(index).prop("checked")) {
                    for (val of spCheckSingle) {
                        val.checked = true;
                    }
                } else {
                    for (val of spCheckSingle) {
                        val.checked = false;
                    }
                }
            });
        })

        // もっと見るボタン
        var moreNum = 3;
        var section = $(".js-roomlist");
        var pcItem = $(".js-available_tbody");
        var spItem = $(".js-available_list");
        $.each(pcItem, function (index, value) {
            const pcItemlist = pcItem.eq(index).find(".roomlist-property_item");
            const showBtn = section.eq(index).find(".js-show_btn");

            if (pcItemlist.length <= moreNum) {
                showBtn.hide();
            }
            pcItemlist.slice(moreNum).hide();
            showBtn.on('click', function () {
                $(this).hide();
                pcItemlist.slice(moreNum).show();

            });
        })
        $.each(spItem, function (index, value) {
            const spItemlist = spItem.eq(index).find(".roomlist-item");
            const showBtn = section.eq(index).find(".js-show_btn");

            if (spItemlist.length <= moreNum) {
                showBtn.hide();
            }
            spItemlist.slice(moreNum).hide();
            showBtn.on('click', function () {
                $(this).hide();
                spItemlist.slice(moreNum).show();

            });
        })

        //ページネーションの読み込み
        fetch("/partial/pagination.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-pagination").innerHTML = data);

        //追従メニュー
        fetch("/partial/fiexdmenu-fav.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-fav").innerHTML = data)
            .then(() => {
                //お気に入りボタン
                addActive('.js-fav_btn');
            });

    }


    //--------------------- 
    //お役立ち情報下層ページ
    //---------------------
    if (path == "/guide/howto.html" ||
        path == "/guide/flow.html" ||
        path == "/guide/price.html" ||
        path == "/guide/plus.html"
    ) {
        //サイドナビゲーション
        fetch("/partial/sidebar-guide.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-sidebar").innerHTML = data)
            .then(() => {
                // active付与
                $("#js-guide li a").each(function () {
                    var $href = $(this).attr('href');
                    if (path == $href) {
                        $(this).parent().addClass('active');
                    } else {
                        $(this).parent().removeClass('active');
                    }
                })
            });


        //ご相談・お問い合わせ(全幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_full").innerHTML = data);

    }

    //--------------------- 
    //エリアガイド
    //---------------------
    if (
        path == "/locations/" ||
        path == "/locations/tokyo.html" ||
        path == "/locations/kanagawa.html" ||
        path == "/locations/chiba.html" ||
        path == "/locations/saitama.html" ||
        path == "/locations/ibaraki.html" ||
        path == "/locations/hokkaido.html" ||
        path == "/locations/aichi.html" ||
        path == "/locations/mie.html" ||
        path == "/locations/gifu.html" ||
        path == "/locations/shizuoka.html" ||
        path == "/locations/osaka.html" ||
        path == "/locations/hyogo.html" ||
        path == "/locations/kyoto.html" ||
        path == "/locations/shiga.html" ||
        path == "/locations/nara.html" ||
        path == "/locations/wakayama.html"
    ) {
        //ご相談・お問い合わせ(全幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_full").innerHTML = data);

    }
    if (
        path == "/locations/tokyo.html" ||
        path == "/locations/kanagawa.html" ||
        path == "/locations/chiba.html" ||
        path == "/locations/saitama.html" ||
        path == "/locations/ibaraki.html" ||
        path == "/locations/hokkaido.html" ||
        path == "/locations/aichi.html" ||
        path == "/locations/mie.html" ||
        path == "/locations/gifu.html" ||
        path == "/locations/shizuoka.html" ||
        path == "/locations/osaka.html" ||
        path == "/locations/hyogo.html" ||
        path == "/locations/kyoto.html" ||
        path == "/locations/shiga.html" ||
        path == "/locations/nara.html" ||
        path == "/locations/wakayama.html"
    ) {
        //おすすめの部屋を見るのスライダー
        fetch("/partial/catalog-slider.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-catalog_slider").innerHTML = data)
            .then(() => {
                catalogSlider('#js-slider');
                //お気に入りボタン
                addActive('.js-fav_btn');

            });

        //そのほかのエリアも見る
        fetch("/partial/district-other.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-district-other").innerHTML = data)
            .then(() => {
                //今いるページのリストを非表示にする
                var linkList = $("#js-area_display a");
                linkList.each(function () {
                    var thisLink = $(this).attr('href');
                    if (path == thisLink) {
                        $(this).parent("li").hide();
                    }
                })
            });
    }

    //--------------------- 
    //地図から探す
    //---------------------
    if (path == "/locations/tokyo/map.html") {

        //検索窓サジェスト機能
        suggestNotLink("#js-map_search");

        // 条件で絞り込む　モーダル読込
        fetch("/partial/modal-filter.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-filter").innerHTML = data)
            .then(() => {
                modalFunc('#js-modaal_filter-btn', 'modaal-refine');
            });

        //そのほかのエリアも見る※エリアガイドの実装完了後に表示する
        fetch("/partial/district-other.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-district-other").innerHTML = data);

        //ご相談・お問い合わせ(全幅)
        fetch("/partial/cta.html")
            .then((response) => response.text())
            .then((data) => document.querySelector("#js-cta_full").innerHTML = data);

        //スマホ時　条件絞り込みボタン
        $("#js-refine_tab").on("click", function () {
            $("#js-refine_tab").toggleClass('active');
            $("#js-refine_tab").next().slideToggle();
        });

        //地図上の棟ポップアップ用
        $(".js-pin").on("click", function () {
            $(".popup").hasClass('active') ? $(".popup").removeClass('active') : $(".popup").addClass('active');
        })
        $(".popup-close").on("click", function () {
            $(".popup").removeClass('active');
        })
        //お気に入りボタン
        addActive('.js-fav_btn');



    }
    //--------------------- 
    //引っ越し祝い金
    //---------------------    
    if (path == "/feature/gift.html") {
        //アコーディオンをクリックした時の動作
        $('dt').on('click', function () {//タイトル要素をクリックしたら
            var findElm = $(this).next("dd");//直後のアコーディオンを行うエリアを取得し
            $(findElm).slideToggle(250);//アコーディオンの上下動作

            if ($(this).hasClass('gift-question_dl--box__close')) {//タイトル要素にクラス名closeがあれば
                $(this).removeClass('gift-question_dl--box__close');//クラス名を除去し
            } else {//それ以外は
                $(this).addClass('gift-question_dl--box__close');//クラス名closeを付与
            }
        });
    }
});

//------------------------------------ 
// 共通関数
//------------------------------------ 
//モーダル

function modalFunc(element, customClass) {
    $(element).modaal({
        overlay_close: true,
        custom_class: customClass,
        before_open: function () {
            $('html').css('overflow-y', 'hidden');
        },
        after_close: function () {
            $('html').css('overflow-y', 'scroll');
        }
    });
}

//チェックボックス
function checkdList(all, single) {
    all.on('click', function () {
        if (all.prop("checked")) {
            for (val of single) {
                val.checked = true;
            }
        } else {
            for (val of single) {
                val.checked = false;
            }
        }
    });
};
//もっと見るボタン
function showList(itemList, moreNum, section, btn = ".js-show_btn") {
    if (itemList.length <= moreNum) {

        section.find(btn).hide();
    }
    itemList.slice(moreNum).hide();
    section.find(btn).on('click', function () {
        itemList.slice(moreNum).show();
        section.find(btn).hide();
    });
}

//検索サジェスト機能
function suggestLink(id) {
    $(function () {
        $.ui.autocomplete.prototype._renderItem = function (ul, item) {
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(
                    $("<div class='suggest'></div>")
                        .html(item.label)
                )
                .appendTo(ul);
        };
        var words = [
            { label: "東京", url: "/area/A1.html" },
            { label: "東京都千代田区", url: "/area/A1.html" },
            { label: "東京都中央区", url: "/area/A1.html" },
            { label: "東京都新宿区", url: "/area/A1.html" },
            { label: "東京都港区", url: "/area/A1.html" },
            { label: "東京駅", url: "/line/station_6627.html" },

        ];

        $(id).autocomplete({
            source: function (request, response) {
                let list = [];
                list = words.filter(function (word) {
                    return (
                        word.label.indexOf(request.term) === 0 ||
                        word.kana.indexOf(request.term) === 0 ||
                        word.label.toLowerCase().indexOf(request.term) === 0
                    );
                });
                response(list);
            },

            select: function (event, ui) {
                location.href = ui.item.url;
                return false;


            }
        });
    });
}
//検索サジェスト機能
function suggestNotLink(id) {
    $(function () {
        $.ui.autocomplete.prototype._renderItem = function (ul, item) {
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(
                    $("<div class='suggest'></div>")
                        .html(item.label)
                )
                .appendTo(ul);
        };
        var words = [
            "東京",
            "東京都千代田区",
            "東京都中央区",
            "東京都新宿区",
            "東京都港区",
            "東京駅",


        ];

        $(id).autocomplete({
            source: words,

        });
    });
}

//カード用スライダー
function catalogSlider(element) {
    $(element).slick({
        autoplay: true,
        dots: false,
        centerMode: true,
        arrows: false,
        slidesToShow: 3,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    centerPadding: '20px',
                    prevArrow: '<span class="slider-wide_prev"><img src="/assets/img/icon/arrow.svg" alt="" ></span>',
                    nextArrow: '<span class="slider-wide_next"><img src="/assets/img/icon/arrow.svg" alt="" ></span>',
                },

            }
        ]

    });
}

//active付与
function addActive(element, active = 'active') {
    $(element).on("click", function () {
        event.preventDefault();
        $(this).toggleClass(active);
    });

}
