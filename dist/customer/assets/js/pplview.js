function startSWiper(){
    if($('.viewListSlide').length == 0){
        return;
    }
    let view_leng = $('.viewListSlide .swiper-slide').length;

    
    const viewListSlideArea = document.querySelector('.viewListSlideArea');

    const swiper = new Swiper(".viewListSlide", {
        slidesPerView: 'auto', 
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".productViewSlideArrow .btnNext",
            prevEl: ".productViewSlideArrow .btnPrev",
        },
        spaceBetween: 12,
        slidesOffsetBefore: 24,
        slidesOffsetAfter: 24,
        on: {
            transitionStart: function () {
                if (this.progress === 1) {
                    viewListSlideArea.classList.remove('active');
                } else {
                    viewListSlideArea.classList.add('active'); 
                }
            },
        },
        breakpoints: {
            1024: {
                spaceBetween: 10,
            }
          }
    });
    

    $(window).resize(function() {
        //swiper
        let w = $(this).width();
        let _lang = 2;
        if (w <= 1024) {
            _lang = 1;
        }
        if (view_leng > _lang) {
            $('.viewListContainer').removeClass('single');
        } else {
            $('.viewListContainer').addClass('single');
        }
        swiper.update();

    }).resize();
}



function fixedTitle(){
    //시작시 이동

    let preScrollTop = 0;

    $(window).on('scroll resize',function(){
        if($('.deferredTitle').length == 0){return}
        let top='';
        top = $('.deferredTitle h2').offset().top + $('.deferredTitle h2').height() - 20 ;
        if($(window).width() > 690){
            nextScrollTop  = $(window).scrollTop();
            // let pageTop = 110;
            // if($(window).width() > 1024){
            //     pageTop = 145;
            // }
            // if ($('#topBannerContainerClose:visible').height() == undefined) {
            //     bannerH = 0;
            // } else {
            //     bannerH = $('#topBannerContainerClose:visible').height();
            // }
            pageTop = $('.contentArea').offset().top; //pageTop + bannerH;
            //스크롤 상하 체크
            let down = preScrollTop < nextScrollTop ? 'down' : 'up';
            $('body').addClass('fixed');
            if($(window).scrollTop() >= 0 &&  $(window).scrollTop() < pageTop &&$('.noPlanMoney:visible').length == 0){
                if(  down == "up"){
                    $(window).scrollTop(0);
                    $('body').removeClass('fixed');
                    $('.pageTitleContainer').show()
                }else if(down == "down"){

                    // $("html, body").stop().animate({
                    //     scrollTop: pageTop,
                    // },100);
                }
            }  

            if ($('.mTop.fixed').length == 0 && $(window).scrollTop() > top  && down == 'down' ) {
                $('.mTop').addClass('fixed');
                $('.mTop .title').show(); 

            }else if($('.mTop.fixed').length == 1 && $(window).scrollTop() < top && down == "up"  ) {
                $('.mTop').removeClass('fixed');
                $('.mTop .title').hide();
                $(window).scrollTop(0);
            }else if($('.mTop.fixed').length == 0 && $(window).scrollTop() >= pageTop  && down == 'up' ) {
                $('.mTop .title').hide();
            }
            preScrollTop = nextScrollTop
        }else{
            //mobile
            top = $('.deferredTitle h2').offset().top + $('.deferredTitle h2').height() - 48;
            if($(window).scrollTop() >= top ){
                $('body').addClass('fixed');
                $('.mTop').addClass('fixed');
                $('.mTop .title').show();
            }else{
                $('body').removeClass('fixed');
                $('.mTop .title').hide();
                $('.mTop').removeClass('fixed');
            }
        }
    });
}


/* toolTip */
function startToolTip(){
    let $focus='';
    $('.tooltip').on('click',function(){
        $focus =$(this);        
        let left= 77;
        var width = 335; /* 2025-01-17 KMVNO-5220-DR-2025-03301 */
        let winSize = $(window).width(); 
       
        /* 2025-01-17 KMVNO-5220-DR-2025-03301 */
        if(winSize < 1025 && winSize > 690 ){
            left = 77;
            var width = 400;
            if($(".moneyPlan").length > 0 && $(".moneyPlan").width() < 400) {
                var width = $(".moneyPlan").width();
            }
        }else if(winSize <= 690 ){             
            left = 72;
            var width = 400;
            if($(window).width() <= 440){            
                width = $(window).width() - 40;                
            }
        }
        /* //2025-01-17 KMVNO-5220-DR-2025-03301 */
       
        $(this).next('.tooltipCont').css({
            'left':'-'+left+'px', 
            'width':width+'px',  
        });
        let top = $focus.next('.tooltipCont').outerHeight(true);  
        $(this).next('.tooltipCont').css('top','-'+top+'px').show();
        $(this).next('.tooltipCont').find('dt').attr('tabindex',0).focus();
        

    })
    $('.tooltipCont .close').on('click',function(){
        $(this).closest('.tooltipCont').hide(); 
        $focus.focus();
    });
    $('main').on('click',function(){
        if($(event.target).closest('.tooltipArea').length == 0 && $('.tooltipArea:visible').length == 1){
            $('.tooltipCont').hide();
        };

    })
    $(window).resize(function() {
        if($('.tooltipCont').is(':visible')&& $(window).width() <= 1204){
            $focus.trigger('click');
        }
    });
}
// 요금제 설명 더보기
function viewMore(){
    const outer = $('.pricingPlanDesc').height();
    const inner = $('.pricingPlanDesc .textArea').height();
    if(inner < outer){
        $('.btnPaperView').hide()
        $('.pricingPlanDesc').css('height','auto');
    }
    $('.btnPaperView').on('click',function(){
        if($('.pricingPlanDesc').hasClass('open')){
            $('.pricingPlanDesc, .btnPaperView').removeClass('open');
            $('.btnPaperView').text('펼쳐보기')
            $(window).scrollTop($('.pricingPlanDescTitle').offset().top);
        }else{
            $('.pricingPlanDesc, .btnPaperView').addClass('open');
            $('.btnPaperView').text('접기')
        }

    })
}
/**
 *  요금제 제공 안내, 통화.문자 사용제한 안내 toggle
 */
function viewToggle(){
    $('.optToggle dt button').on('click',function(){
        if($(this).hasClass('open')){
            $(this).closest('dt').next('dd').hide();
            $(this).removeClass('open').attr('title','내용보기');
        }else{
            $(this).closest('dt').next('dd').show();
            $(this).addClass('open').attr('title','내용접기');;
        }

    })
}
/** 전화번호 */
function phoneCall(){
    if(checkMobile() == 'android' || checkMobile() == 'ios'){
        $('.btnCall div').each(function(){
            const tel = $(this).data('tel');
            const txt = $(this).text();
            $(this).html(`<a href="tel:${tel}">${txt}</a>`);
        })

    }
}
/* dim 클릭시 팝업 닫기*/
function dimClose(){
    $('.popup.new .dim').on('click',function(){
        $(this).closest('.popup').find('.btnClose').trigger('click');
    })
}
/** 토스 메세지 */
function toossMsg(){
    const obj = $(event.target);
    if($('.toastMSG').length == 0){
        $('body').append('<div class="toastMSG"><span></span></div>');
    }

    $('.toastMSG span').text(obj.data('text'));
    $('.toastMSG').fadeIn();
    setTimeout(function() {
        $('.toastMSG').fadeOut();
    }, 3000);
}
/** 에러메시지 */
function noGoodPage(){
    $('.wrap').hide();
    $('.noPlanMoney').show();
}
/** 가입하기 버튼 가리면 위치 처리 */
function resizeEnter(){
    if ($('.deferredOpt').length == 0) { return; }
    $(window).on('resize scroll', function () {
        let heightSize = window.innerHeight;
        if (checkMobile() == 'other') {
            heightSize = $(window).height();
        }
        const width = $(window).width() >= 691;
        const height = $('.deferredOpt').offset().top + $('.deferredOpt').outerHeight() >= heightSize + $(window).scrollTop();
        if(width && height ){
            let mb = 34 + $('.deferredOpt').offset().top - $(window).scrollTop() + $('.deferredOpt').outerHeight() - heightSize;
            $('.deferredOpt .priceBottom').css('transform', `translateY(-${mb}px)`);
        }else{
            $('.deferredOpt .priceBottom').css('transform', 'translateY(0)');

        }
    }).resize();
    //$(window).trigger('resize');
}
/** 윈도우창이 팝업창보다 작을시 스크룰 생성*/
function popupScroll(){
    let h = vs = 0
    $(window).on('resize',function(){
        const obj = $('.popup.new.popupSelf:visible');
        if($(window).width()>1024){

            if(obj.length >= 1){
                $('body').css('overflow','hidden')
            }

        }
        if ($(window).width() >= 691) {
            const objH = obj.find('.popupContainer').height();
            if($(window).height() <= objH){
                obj.find('.dim').css({
                    'height': objH,
                });
                obj.css({
                    'overflow-y': 'auto',
                    'justify-content': 'start',
                    'padding':0
                });
           }else{
                obj.find('.dim').removeAttr('style');
                obj.removeAttr('style');
           }
        }else{
            obj.find('.dim').removeAttr('style');
            obj.removeAttr('style');
        }

    });
}
function tableScroll() {
    $('.adminVeiw table').wrap('<div class="scrollTalbe" style="overflow-x:auto" />' )  
}
/** 
 * .배율에 따라 미디어 쿼리 오류로 인해 클래스 추가
*/
function deviceResize() {
    
    $(window).on('resize', function () {
        if ($(window).width() <= 690) {
            $('.wrap').addClass('mobile');
        } else {
            $('.wrap').removeClass('mobile');
        }
    }).trigger('resize');
}
$(function(){
    startSWiper();
    startToolTip();
    viewMore();
    viewToggle();
    fixedTitle();
    phoneCall();
    dimClose();
    resizeEnter();
    popupScroll();
    tableScroll();
    deviceResize();

});
$('body').css('opacity',0)
$(window).on('load', function() {
    setTimeout(function(){
        $('body').css('opacity', 1);

        setTimeout(function () {
            // let bannerH = 0;
            // if ($('#topBannerContainerClose:visible').height() == undefined) {
            //     bannerH = 0;
            // } else {
            //     bannerH = $('#topBannerContainerClose:visible').height();
            // }
            
            // if($(window).width() > 1024){
            //     pageTop = 144;       

            // }else if($(window).width() <= 1024 && $(window).width() >= 691){
            //     pageTop = 110;
            // }else{
            //     pageTop = 0;
            // }      
           
            $(window).scrollTop($('.contentArea').offset().top)
        },100)

    },500)

})