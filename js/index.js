$(document).ready(function () {
    const $playButton = $('.play-button');
    const $introCover = $('.intro-cover');
    const $top20 = $('.top20');
    const $bot80 = $('.bot80');
    const $topbar = $('.topbar');
    const $menu = $('.menu');
    const $logo = $('.logo');
    const $ul = $('ul');
    const $somenu = $('.somenu');
    const $menuItems = $somenu.find('li');
    const $video = $('.bot80 video');
    const $header = $('header');
    const headerHeight = $header.outerHeight();


    // 원본 메뉴 아이템 스타일 저장
    let originalMenu = [];
    $menuItems.each(function (i) {
        originalMenu[i] = {
            text: $(this).text(),
            fontSize: $(this).css('font-size'),
            bg: $(this).css('background-color'),
            color: $(this).css('color')
        };
    });

    $playButton.on('click', function () {
        $('body').css('overflow', 'auto');
        $introCover.hide();
        $('body').removeClass('noscroll');
        $top20.show();
        $bot80.show();
        $video.show();

        $topbar.show();
        $topbar.css({
            'transformOrigin': 'left bottom',
            'transform': 'rotate(-135deg)',
            'transition': 'transform 1s ease'
        });

        setTimeout(() => {
            $topbar.css('transform', 'rotate(0deg)');
        }, 50);

        setTimeout(() => {
            $top20.hide();
            $menu.css('display', 'flex').css('position', 'relative').css('top', '0').css('left', '0').css('width', '100%'); // fixed 추가
            $logo.css({
                'transform': 'translateY(-100px)',
                'opacity': '0',
                'transition': 'all 0.5s ease-out'
            });

            $menuItems.each(function (index) {
                $(this).css({
                    'transform': 'translateY(-100px)',
                    'opacity': '0',
                    'transition': `all 0.5s ease ${index * 0.2}s`
                });
            });

            setTimeout(() => {
                $logo.css({
                    'transform': 'translateY(0)',
                    'opacity': '1'
                });

                $menuItems.each(function () {
                    $(this).css({
                        'transform': 'translateY(0)',
                        'opacity': '1'
                    });
                });
                $bot80.css({
                    'top': '20%'
                })
                $video.get(0).play();
            }, 50);

        }, 1150);
    });

    

    // 부들부들 랜덤 위글 효과 (li마다 독립적으로)
    $('.menu li').each(function () {
        const $li = $(this);
        let wiggleInterval = null;

        $li.on('mouseenter', function () {
            let count = 0;
            clearInterval(wiggleInterval);

            // ★ transition 제거 (즉시 움직이게)
            $li.css('transition', 'none');

            wiggleInterval = setInterval(function () {
                if (count > 5) {
                    clearInterval(wiggleInterval);
                    $li.css({
                        'transform': 'translate(0, 0)',
                        'transition': 'all 0.1s ease' // ★ 원래대로 복구
                    });
                    return;
                }

                const randomX = Math.random() * 6 - 3;   // -3 ~ +3
                const randomY = Math.random() * 6 - 3;   // -3 ~ +3

                $li.css('transform', `translate(${randomX}px, ${randomY}px)`);
                count++;
            }, 30);
        });

        $li.on('mouseleave', function () {
            clearInterval(wiggleInterval);
            $li.css({
                'transform': 'translate(0, 0)',
                'transition': 'all 0.1s ease' // ★ 복구
            });
        });
    });

    // 스크롤 이벤트트
    $(window).on('scroll', function () {
        if (window.scrollY > 0) {

            $menu.addClass('shrink');
            $logo.css('display', 'none');
            $menuItems.each(function (i) {
                $(this).text('+' + originalMenu[i].text);

            });
            
        } else {

            $menu.removeClass('shrink');
            $logo.css('display', 'block');
            $menuItems.each(function (i) {
                $(this).text(originalMenu[i].text);

            });
        }
    });
});

const animationMove = function(selector){
    const targetEl = document.querySelector(selector)
    const bs = window.scrollY // 현재 브라우저 스크롤 Y 정보
    const targetSy = targetEl.getBoundingClientRect().top + bs
    window.scrollTo({
        top : targetSy,
        behavior : 'smooth'
    })
}

const scrollMove = document.querySelectorAll('[data-animation-scroll="true"]')
for(let i = 0; i < scrollMove.length; i++){
    scrollMove[i].addEventListener('click',function(){
        const target = this.dataset.target
        animationMove(target)
    })
}

if (window.innerWidth > 768) {
    skrollr.init({
        forceHeight: false
    });
}
