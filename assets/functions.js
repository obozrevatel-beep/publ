$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

/* ---------------------------------------------------------------------------------------------------------------------
 image lazy load
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    $(elements).lazyLoadXT();
});

/* ---------------------------------------------------------------------------------------------------------------------
            sticky columns
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    $('#sticky-content').sticky({
        topSpacing: 20,
        bottomSpacing: 910
    });

    $('#sticky-rightbar').sticky({
        topSpacing: 20,
        bottomSpacing: 910
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 кнопка наверх
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {

    var btn = $('#js-to-top');
    var iTime = 500; // время скрола
    var isLock = 0; // блокируем проверку состояния, пока выполняется скрол (фикс)

    if (btn.length === 0) {
        alert('Не найден триггер js-to-top');
        return;
    }

    showOrHide();

    // проверка отступа при скроле
    $(window).scroll(function () {
        if (isLock) {
            return;
        }

        showOrHide();
    });

    function showOrHide() {
        // if ($(this).scrollTop() > 200) {
        if ($(window).scrollTop() > 200) {
            btn.fadeIn();
        } else {
            btn.fadeOut();
        }
    }

    btn.click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, iTime);

        isLock = 1;

        // снимаем блок через время
        setTimeout(function () {
            isLock = 0;
        }, iTime);
    });

});

/* ---------------------------------------------------------------------------------------------------------------------
 определение ширины и наличия scrollbar
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {

    var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');

    // Append our div, do our calculation and then remove it
    $('body').append(div);
    var w1 = $('div', div).innerWidth();
    div.css('overflow-y', 'scroll');
    var w2 = $('div', div).innerWidth();
    $(div).remove();
    window.ScrollWidth = (w1 - w2) / 2;

});

/* ---------------------------------------------------------------------------------------------------------------------
 эффект-маска для поиска по сайту
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {

    var bwrap = '.b-wrap'; // Главной блок wpapper
    var bsearch = $('.b-search-header'); // Маска для поиска

    // Применение эффекта затемнения и блюра
    $('#js-header-search').click(function (event) {
        event.preventDefault(); // Убираем # заглушку

        // Делаем элемент видимым, двигаем по DOMу
        bsearch.fadeTo(400, 1)
            .css('visibility', 'visible')
            .css('opacity', '1')
            .insertBefore(bwrap);

        $(bwrap).css('filter', 'blur(30px)');

        // Если есть scrollbar - двигаем блок на его ширину
        if ($(document).height() > $(window).height()) {
            $(bwrap).css('left', '-' + ScrollWidth + 'px');
            document.body.style.overflow = 'hidden'; // скрыть скролл
        }

        // $('.b-search-header__input').focus(); // Делаем строку поиска активной
        $('.b-search-header__input').focus(); // Делаем строку поиска активной
    });

    // клик по пустому месту закрывает поиск
    bsearch.click(function (event) {
        if (event.target === this) {
            $(this).fadeTo(400, 0.0001, function () {
                $(this).css('visibility', 'hidden');
                document.body.style.overflow = 'visible'; // вернуть скролл
                $(bwrap).css('left', '0');
            });

            $(this).insertBefore('.navbar-trigger').css('opacity', '0');
            $(bwrap).css('filter', 'none');
        }
    });

});

/* ---------------------------------------------------------------------------------------------------------------------
 Поиск
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    // сброс настроек поиска
    var reset = $('#js-search-reset');
    reset.click(function () {
        reset.prop('disabled', true);
        $('.b-search-filters select').val(null);
        $('#js-search-submit').click();
    });
});


/* ---------------------------------------------------------------------------------------------------------------------
 выпадающее меню в header
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    var trigger = '#js-navbar-trigger';
    var menu = $('.b-navbar-dropdown-header');
    var subclass = 'b-navbar-dropdown-header--open';

    // клик по кнопке раскрывает меню
    $(trigger).click(function (event) {
        event.preventDefault(); // Убираем # заглушку
        menu.toggleClass(subclass); // добавили класс
        event.stopPropagation();
    });

    // клик вне поля закрывает меню
    $(document).click(function (event) {
        var target = $(event.target);

        if (target.closest(trigger).length) {
            return; // не даем закрыть неоткрытое меню
        }

        if (target.closest('.b-navbar-dropdown-header').length) {
            return; // не скрывать меню при клике в его поле
        }

        menu.removeClass(subclass);
        event.stopPropagation(); // прекратить дальнейшую передачу текущего события
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 прилипающий NavBar
 -------------------------------------------------------------------------------------------------------------------- */

// $(document).ready(function () {
//
//     var $this = $(this);
//     var pt = 'g-padding-top--50';
//
//     showStickyMenu();
//
//     $(window).scroll(function () {
//         showStickyMenu();
//     });
//
//     function showStickyMenu() {
//         if ($($this).scrollTop() > $('header').height() * 2) {
//             $('.b-navbar-header').addClass('b-sticky-header').addClass('col-12');
//             $('.b-navbar-dropdown-header').css('top', -125 + $this.scrollTop());
//             $('section.b-wrap__content').addClass(pt);
//         } else {
//             $('.b-navbar-header').removeClass('b-sticky-header').removeClass('col-12');
//             $('.b-navbar-dropdown-header').css('top', 25);
//             $('section.b-wrap__content').removeClass(pt);
//         }
//     }
// });

/* ---------------------------------------------------------------------------------------------------------------------
 подмена главной картинки при наведении
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {

    $('.js-slider-pic-trigger').mouseover(function () {
        sliderOn("js-slider-pic", $(this));
    });
    $('.js-slider-media-trigger').mouseover(function () {
        sliderOn("js-slider-media", $(this));
    });

    function sliderOn(key, event) {
        var img = event.find('.' + key + '__img').attr('src');
        var title = event.find('.' + key + '__title').text();
        var anons = event.find('.' + key + '__anons').text();
        var link = event.find('.' + key + '__link').attr('href');
        document.getElementById(key + '__img').src = img; // navite js = IE fix
        $('#' + key + '__title').text(title);
        $('#' + key + '__anons').text(anons);
        $('#' + key + '__link').attr('href', link);
    }

});

/* ---------------------------------------------------------------------------------------------------------------------
 реализайция работы ленты новостей через пагинацию
 -------------------------------------------------------------------------------------------------------------------- */

/*

$(document).ready(function () {

    $(document).on('click', '.js-news-feed-home a', function (e) {
        e.preventDefault();

        var page = $(this).attr('href').split('page=')[1];

        $.ajax({
            url: '/ajax/neewsfeed/?page=' + page
        }).done(function (data) {
            $('.b-news-feed-home').fadeOut(200, function () {
                $(this).html(data);
                $(this).fadeIn(200);
            });
        });
    });

});

*/

/* ---------------------------------------------------------------------------------------------------------------------
 меню новостей с окраской
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    // $('.b-navbar-header__links a[href="' + window.location.pathname + '"]').addClass('g-bg-color--grey');
    $('.b-navbar-header2__links a[href="' + window.location.pathname + '"]').addClass('b-navbar-header2__links--active');
});

/* ---------------------------------------------------------------------------------------------------------------------
 комментарии
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    $('#new-reply').hide();
    $('#js-reply-name').text('');
});

function CommentReply(event) {
    $('#js-reply-name').text(event.name);
    $('#new-reply').slideDown(200);
    $('#js-parent_id').attr('value', event.id);
}

function AbortReply() {
    $('#js-parent_id').attr('value', 0);
    $('#new-reply').slideUp(200, function () {
        $('#js-reply-name').text('');
    });
}

/* ---------------------------------------------------------------------------------------------------------------------
 мультимедиа галерея
 -------------------------------------------------------------------------------------------------------------------- */

$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

/* ---------------------------------------------------------------------------------------------------------------------
 Автоскрытие alert сообщений
 -------------------------------------------------------------------------------------------------------------------- */

$("#error_message").fadeTo(3000, 500).slideUp(500, function () {
    $("#error_message").alert('close');
});


/* ---------------------------------------------------------------------------------------------------------------------
 Слайдер для карточек
 -------------------------------------------------------------------------------------------------------------------- */

$(function () {
    var cards = $('#js-card-viewer');

    cards.owlCarousel({
        items: 1,
        margin: 10,
        center: true,
        loop: true,
        dots: false,
        autoHeight: true
    });

    $('.js-card-prev').click(function () {
        cards.trigger('prev.owl.carousel');
    });

    $('.js-card-next').click(function () {
        cards.trigger('next.owl.carousel');
    });

    cards.on('changed.owl.carousel', function (event) {
        showCardNum(event);
    })
});

function showCardNum(event) {
    var carousel = event.relatedTarget;
    $('#js-card-num')[0].innerText = carousel.relative(carousel.current()) + 1;
}

/* ---------------------------------------------------------------------------------------------------------------------
 Наложение авторов фото в статьях
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    var img = $('img[data-author]');

    img.each(function() {
        var data_author = "Фото: " + $(this).attr('data-author');
        var img_class = $(this).attr('class');
        var add_class = 'b-article-photo-overlay';

        if(img_class && img_class.match(/imagePattern_half.*/)) {
            add_class = add_class + ' ' + add_class + '--small';
        }

        if (data_author) {
            $(this).wrap("<div class='b-article-photo-overlay-wrapper "+ img_class +"'></div>");
            $(this).before("<div class='" + add_class + "'>"+ data_author +"</div>");
        }
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 Слайдер для партнеров
 -------------------------------------------------------------------------------------------------------------------- */

$(function () {
    var partners = $('#js-partners-slider');

    partners.owlCarousel({
        items: 5,
        margin: 30,
        center: true,
        loop: true,
        autoWidth: true,
        fluidSpeed: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });

    $('#js-partners-slider-prev').click(function () {
        partners.trigger('prev.owl.carousel');
    });

    $('#js-partners-slider-next').click(function () {
        partners.trigger('next.owl.carousel');
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 Слайдер фиксированных статей внутри статьи
 -------------------------------------------------------------------------------------------------------------------- */

$(function () {
    var fixed = $('#js-fixed-slider');

    fixed.owlCarousel({
        items: 1,
        margin: 1,
        center: true,
        // autoWidth: true,
        // autoHeight: true,
        // fluidSpeed: true,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });

    $('#js-fixed-slider-prev').click(function () {
        fixed.trigger('prev.owl.carousel');
    });

    $('#js-fixed-slider-next').click(function () {
        fixed.trigger('next.owl.carousel');
    });
});

$(function () {
    var fixed = $('#js-fixed-slider2');

    fixed.owlCarousel({
        items: 1,
        margin: 1,
        center: true,
        // autoWidth: true,
        // autoHeight: true,
        // fluidSpeed: true,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true
    });

    $('#js-fixed-slider2-prev').click(function () {
        fixed.trigger('prev.owl.carousel');
    });

    $('#js-fixed-slider2-next').click(function () {
        fixed.trigger('next.owl.carousel');
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 Слайдер скидок
 -------------------------------------------------------------------------------------------------------------------- */

$(function () {
    var fixed = $('#js-discounts-slider');

    fixed.owlCarousel({
        items: 1,
        margin: 1,
        center: true,
        // autoWidth: true,
        // autoHeight: true,
        // fluidSpeed: true,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });

    $('#js-discounts-slider-prev').click(function () {
        fixed.trigger('prev.owl.carousel');
    });

    $('#js-discounts-slider-next').click(function () {
        fixed.trigger('next.owl.carousel');
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 Слайдер трендов
 -------------------------------------------------------------------------------------------------------------------- */

$(function () {
    var trends = $('#js-trends-slider');

    trends.owlCarousel({
        items: 1,
        margin: 0,
        center: true,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });

    $('#js-trends-slider-prev').click(function () {
        trends.trigger('prev.owl.carousel');
    });

    $('#js-trends-slider-next').click(function () {
        trends.trigger('next.owl.carousel');
    });
});


/* ---------------------------------------------------------------------------------------------------------------------
 Слайдер картотеки
 -------------------------------------------------------------------------------------------------------------------- */

$(function () {
    var cards = $('#js-cards-slider');

    cards.owlCarousel({
        items: 1,
        margin: 0,
        center: true,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });

    $('#js-cards-slider-prev').click(function () {
        cards.trigger('prev.owl.carousel');
    });

    $('#js-cards-slider-next').click(function () {
        cards.trigger('next.owl.carousel');
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 Слайдер внутри статьи
 -------------------------------------------------------------------------------------------------------------------- */

$(function () {
    var slider = $('#js-photo-slider');
    var counter = $('.b-photo-slider__counter');

    slider.owlCarousel({
        items: 1,
        loop: true,
        // animateIn:  'fadeOut',
        animateOut:  'fadeOut',
        lazyLoad: true,
        // center: true,
        // autoWidth:true,
        autoHeight:true,

        onInitialized: function(e) {
            counter.text('1 из ' + e.item.count);
        }
    });

    slider.on('changed.owl.carousel', function (e) {
        counter.text(e.page.index + 1 + ' из ' + e.item.count) // e.item.index
    });

    $('#js-photo-slider-prev').click(function () {
        slider.trigger('prev.owl.carousel');
    });

    $('#js-photo-slider-next').click(function () {
        slider.trigger('next.owl.carousel');
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 Слайдер календаря
 -------------------------------------------------------------------------------------------------------------------- */

$(function () {
    var holidays = $('#js-holidays-slider');

    holidays.owlCarousel({
        items: 1,
        center: true,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
    });

    $('#js-holidays-slider-prev').click(function () {
        holidays.trigger('prev.owl.carousel');
    });

    $('#js-holidays-slider-next').click(function () {
        holidays.trigger('next.owl.carousel');
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 Скрыть подзаги в интерьвю на главной, если они не помещаются
 -------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    showOrHide();

    var timer;
    $(window).on('resize', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            showOrHide();
        }, 200);
    });

    function showOrHide() {
        var interview_wrap    = $('.b-interview-text');
        var tests_wrap    = $('.b-tests-text');
        var interview_title     = '.b-interview-text__title';
        var tests_title     = '.b-tests-text__title';
        var interview_subtitle     = '.b-interview-text__subtitle';
        var tests_subtitle     = '.b-tests-text__subtitle';

        interview_wrap.each(function () {
            var t = $(this).children(interview_title);
            var s = $(this).children(interview_subtitle);

            if (t.height() + s.height() >= $(this).height()) {
                s.fadeOut();
            } else {
                s.fadeIn();
            }
        });

        tests_wrap.each(function () {
            var t = $(this).children(tests_title);
            var s = $(this).children(tests_subtitle);

            if (t.height() + s.height() >= $(this).height()) {
                s.fadeOut();
            } else {
                s.fadeIn();
            }
        });
    }
});

/* ---------------------------------------------------------------------------------------------------------------------
 Изменение активности кнопки голосования при выборе варианта ответа
 -------------------------------------------------------------------------------------------------------------------- */

// $(function(){
$(document).ready(function () {
    $(".js-vote-radio").change(function(){
        $("#js-vote-submit").prop("disabled", false);
    });
});

/* ---------------------------------------------------------------------------------------------------------------------
 Понижение и повышение рейтинга комментария
 -------------------------------------------------------------------------------------------------------------------- */

$('.js-like').click(function (e) {
    e.preventDefault();
    var like = $(this);

    if (like.data('requestRunning')) {
        return;
    }
    like.data('requestRunning', true); // lock

    var id = like.attr('data-comment');

    $.ajax({
        // method: 'PUT',
        url: '/comment/like',
        data: {
            'comment_id': id, // comment #id
            'comment_mod': like.attr('data-like') // like | dislike
        },
        success: function (msg) {
            var update, count;

            if (msg === 'like') {
                update = $('#js-like-' + id);
                count = parseInt( update.text() ) + 1;
                update.text(count);
            } else if (msg === 'dislike') {
                update = $('#js-dislike-' + id);
                count = parseInt( update.text() ) + 1;
                update.text(count);
            }
        },
        complete: function () {
            like.data('requestRunning', false); // unlock
        }
    });
});
