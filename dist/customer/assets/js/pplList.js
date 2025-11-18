/* **************** *
  || 후불요금제 (상품목록, 요금제 비교선택팝업, 요금제비교하기 팝업 js) || 
 * **************** */
  let groupRemoveInit = false;

// visualViewport는 모바일 전용으로 제한 (macOS 데스크톱 제외)
if ('visualViewport' in window && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const VIEWPORT_VS_CLIENT_HEIGHT_RATIO = 0.75;
    window.visualViewport.addEventListener('resize', function (event) {
        if ((event.target.height * event.target.scale) / window.screen.height < VIEWPORT_VS_CLIENT_HEIGHT_RATIO ) {
			$('.debug').text('keyborad show');
            $('html').addClass('keyboradOn');
            /*
            old_scroll = -1;
            $('html, body').stop().animate({
                'scrollTop': 1
            }, 10);
            */
           if($('.productPlanList').hasClass('scrollingTop')){
            $('html, body').stop().animate({
                'scrollTop': 149
            }, 10);
           }

        }else {
			$('.searchInput input[type="text"]').trigger('focusout');
            /*
            if($('.productPlanList').hasClass('scrollingTop')){
                $('html, body').stop().animate({
                    'scrollTop': 0
                }, 10);
            }else if(!$('.productPlanList').hasClass('filterFix')){
                $('html, body').stop().animate({
                    'scrollTop': 1
                }, 10);
            }
            */
			$('.debug').text('keyborad hide');
            $('html').removeClass('keyboradOn');

		}
    });
}
//디바이스 체크
  function deviceChk() {
      let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
      var agent = navigator.userAgent.toLowerCase();
      if (!isMobile) {
          //PC
          $('html').addClass('desktop');
      } else {
          //MOBILE        
          $('html').removeClass('desktop');
          if (agent.indexOf('android') > -1) {
              // 안드로이드인 경우
          } else if (agent.indexOf("iphone") > -1 || agent.indexOf("ipad") > -1 || agent.indexOf("ipod") > -1) {
              // IOS인 경우
              $('html').addClass('ios');
          }
      }
  }
//후불요금제 > 상품목록 ::타이틀 상단 앵커이동
let old_scroll = 0;
let isInitializing = false; // 초기화 중 플래그 추가
window.addEventListener("load", loadInit);
function loadInit(){
    //상품목록에서만 사용
    if ($('.productPlanList.new').length > 0) {
        isInitializing = true;
        // macOS 데스크톱 감지 (userAgent 사용)
        var isMacOS = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
        var isDesktop = $('html').hasClass('desktop');

        if (isMacOS && isDesktop) {
            // macOS 데스크톱: 강제 스크롤 제거, 즉시 초기화
            $('.productPlanList.new').addClass('init');
            old_scroll = 0;
            isInitializing = false;
        } else {
            // 모바일/Windows: 기존 방식 유지하되 개선
            $('html, body').stop().animate({
                'scrollTop': 1
            }, 300, function() {
                setTimeout(function() {
                    $('.productPlanList.new').addClass('init');
                    old_scroll = 0; // -1 대신 0으로 변경
                    isInitializing = false;
                }, 100);
            });
        }
    }
}
/* 추가 2024-10-04 // */
function scrollLayerTop(){
    $('.popup.new').stop().animate({'scrollTop':0},500);
    $('#popupPplCompare .popupBottom').removeAttr('style');
}
/* // 추가 2024-10-04 */
$(function() {
    //상품목록
    if ($('.productPlanList.new').length > 0) {
        popupProductList();
    }
    //요금제 비교선택팝업
    if ($('.popupProductCompareSelect').length > 0) {
        popupProductPlanCompareSelect();
    }
    //요금제비교하기 팝업
    if ($('.popupProductPlanCompare.new').length > 0) {
        popupProductPlanCompare();
    }
    $(document).on('click', '.popup.new > .dim', function() {
        let $pop = $(this).closest('.popup');
        $pop.find('.btnClose').trigger('click');
    });
    $(document).on('click', '.dialoguePop .btnClose', function() {
        let $cont = $(this).closest('.dialoguePop');
        $cont.find('.dialogCancel').trigger('click');
    });
    $(document).on('click', '.dialoguePop .dialogCancel', function() {
        let $cont = $(this).closest('.dialoguePop');
        $cont.removeClass('show');
    });
    $(document).on('click', '.dialoguePop .dialogSubmit', function() {
        let $cont = $(this).closest('.dialoguePop');
        let _par = $cont.attr('data-parent');
        $cont.removeClass('show');
        if (_par == 'popupProductCompareSelect') {
            groupRemoveInit = true;
            $('.' + _par).find('.groupRemoveBtn').trigger('click');
        }else{
            $('.' + _par).find('.popupTop .btnClose').trigger('click');
        }
        $('.' + _par).removeClass('show');
    });
    $(window).resize(function() {
        deviceChk();
    }).resize();
    $(document).on('touchstart', 'button', function(e) {
    $(this).addClass('press');
    });
    $(document).on('touchend', 'button', function(e) {
    $(this).removeClass('press');
    });
    $(document).on('touchstart', function(e) {
    console.log($(e.target).attr('id'));
    if($(e.target).attr('id') != 'searchInputID02'){
        if($('html').addClass('keyboradOn')){
            $('#searchInputID02').blur();
        }            
    }
    });
});
function popupProductList() {
    //필터 floating
    var scrollTimeout;
    var isMacOS = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

    $(window).scroll(function(e) {
        // macOS에서 throttle 적용 (성능 개선)
        if (isMacOS && scrollTimeout) {
            return;
        }

        let $tar = $('.productPlanList.new');
        let lastScroll = parseInt($tar.height() - $(this).height());
        let top = $(this).scrollTop();
        $('.debug').text(top+' < '+old_scroll);

        // 초기화 중에는 스크롤 처리 안 함
        if (isInitializing) {
            return;
        }

        // 문제가 되는 무한 루프 제거
        // if(old_scroll == -1 && top == 0){
        //     $('html, body').stop().animate({
        //         'scrollTop': 1
        //     }, 10);
        // }

        if ($tar.hasClass('init') && $('html').hasClass('keyboradOn') == false) {
            if (top < (lastScroll - 100)) {
                if (top < old_scroll) {
                    //console.log('up');
                    if (top <= 1) {
                        $('.productPlanList').addClass('scrollingTop').removeClass('scrollingDown scrollingUp');
                        $tar.removeClass('filterFix');
                        // macOS에서 강제 스크롤 제거
                        if (!isMacOS) {
                            $('html, body').stop().animate({
                                'scrollTop': 0
                            }, 10);
                        }
                    } else {
                        $('.productPlanList').addClass('scrollingUp').removeClass('scrollingDown scrollingTop');
                        $tar.addClass('filterFix');
                    }
                } else if (top > 1 && top > old_scroll) {
                    //console.log('down');
                    $('.productPlanList').removeClass('scrollingTop scrollingUp').addClass('scrollingDown');
                    $tar.addClass('filterFix');
                }
                old_scroll = top;
            } else {
                old_scroll = lastScroll;
            }
        }

        // macOS throttle
        if (isMacOS) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
            }, 16); // 약 60fps
        }
        //$('.debug').text(top+' : '+old_scroll+' : '+lastScroll);
        //console.log(top,old_scroll,lastScroll);
        //console.log(top,_stand);
    });
    //검색 input 
    $('.searchInput input[type="text"]').keyup(function() {
        if ($(this).val() != '') {
            $('.searchInput .btnRemove').show();
        } else {
            $('.searchInput .btnRemove').hide();
        }
    });
//모바일 키패드 관련
    $('.searchInput input[type="text"]').focusin(function(){
    if(!$('html').hasClass('desktop')){
        if($('.floatingCompareArea').hasClass('active')){
            $('.floatingCompareArea').hide();
        }
    }
    });
    $('.searchInput input[type="text"]').focusout(function(){
    if(!$('html').hasClass('desktop')){
        if($('.floatingCompareArea').hasClass('active')){
            $('.floatingCompareArea').show();
        }
    }
    });
    $(document).on('click', '.searchInput .btnRemove', function() {
        $('.searchInput input[type="text"]').val('');
        $(this).hide();
    });
    //필터태그
    $(document).on('click', '.filterTagList .arrow', function() {
        $('.filterTagList').toggleClass('extend');
    });

    $(document).on('click', '.filterTag', function() {
        $(this).remove();
        filterTagListChk();
    });

    function filterTagListChk() {
        let _leng = $('.productPlanList .contentArea.new .filterTagList .filterTag').length;
        let tagCW = $('.productPlanList .contentArea.new .filterTagList .contentInner').width();
        let tagW = 0;
        $('.filterTagList .filterTag').each(function() {
            tagW += $(this).outerWidth() + 6;
        })
        //console.log(tagCW, tagW);
        if (tagW > tagCW) {
            $('.filterTagList .arrow').show();
        } else {
            $('.filterTagList .arrow').hide();
        }
        if (_leng == 0) {
            $('.productPlanList .contentArea.new .filterTagList').remove();
        }
    }
    //추천::mobile 
    $('.recommendTheme .radio input').on('click', function() {
        let $this = $(this).closest('.radio');
        $this.addClass('active').siblings().removeClass('active');
        recommendSet();
        setTimeout(function(){
            filterTagListChk();
        },500);
    });

    function recommendSet() {
        let idx = $('.recommendTheme .radio.active').index();
        let _left = 0;
        let space = 8;
        for (var i = 0; i < idx; i++) {
            _left += $('.recommendTheme .radio').eq(i).width() + space;
        }
        //console.log('recommendSet : ',_left);
        $('.recommendTheme').stop().animate({
            'scrollLeft': _left
        }, 100);
    }
    //정렬::mobile
    $(document).on('click', '.sortListArea .btnClose', function() {
        $('.sortListArea').removeClass('show');
        $('.productPlanList .contentArea.new').removeAttr('style');
        $('html').removeClass('lock');
    });
    //정렬::mobile popup close 
    $(document).on('click', '.sortArea .mobileOnly.sortBtn', function() {
        $('.sortListArea').addClass('show');
        $('.productPlanList').removeClass('filterFix scrollingUp scrollingDown');
        $('html').addClass('lock');
    });
    $('.sortListArea').click(function(e) {
        if ($('.mobileOnly.sortBtn').is(':visible')) {
            if ($(e.target).parents('.sortMobileWrap').length < 1) {
                $('.sortListArea .btnClose').trigger('click');
            }
        }
    });
    //정렬
    $('.sortList .sortBtn').click(function() {
        let $par = $(this).closest('li');
        let str = $(this).text();
        $('.sortList > li').removeClass('active');
        $par.addClass('active');
        $('.sortList > li .sortBtn').attr('title', '');
        $(this).attr('title', '선택 됨');
        $('.mobileOnly.sortBtn span').text(str);
        $('.sortListArea .btnClose').trigger('click');
    });
    $('.sortList .tootip').click(function() {
        let $par = $(this).closest('li');
        $('.sortList > li').find('.tootipCont').hide();
        $par.find('.tootipCont').show();
    });
    $('.sortList .tootipCont .close').click(function() {
        let $cont = $(this).closest('.tootipCont');
        $cont.hide();
    });
    $('html').click(function(e) {
    let $tar_tag = $(e.target).closest('.filterTagList');
    let $tar_tootip = $(e.target).closest('.tootipCont');
    if (!$tar_tootip.hasClass('tootipCont')) {
            if (!$(e.target).hasClass('tootip')) {
                $('.sortList .tootipCont').hide();
            }
        }
    if (!$tar_tag.hasClass('filterTagList')) {
        if($('.filterTagList').hasClass('extend')){
            $('.filterTagList .arrow').trigger('click');
        }
    }
    });
    //비교담기
    let list = '.popularDataNewList .popularDataItem';
    let _check = 0;
    $(list).each(function() {
        //체크박스 클릭
        $(this).find('input:checkbox').click(function() {
            if ($(this).is(':checked')) {
                _check++;
            } else {
                _check--;
            }
            /*
            if (_check > 3) {
                _check = 3;
                $(this).prop('checked', false);
                $('.productPlanList.new .contentContainer .toastMSG span').text('요금제 비교는 최대 3개까지 가능해요.');
                $('.productPlanList.new .contentContainer .toastMSG').fadeIn();
                setTimeout(function() {
                    $('.productPlanList.new .contentContainer .toastMSG').fadeOut();
                }, 3000);
            }
            */
            if (_check > 0) {
                $('.productPlanList.new .contentContainer .floatingCompareArea').addClass('active');
            } else {
                $('.productPlanList.new .contentContainer .floatingCompareArea').removeClass('active');
            }
            if (_check > 1) {
                $('.productPlanList.new .contentContainer .floatingCompareArea .btn').removeClass('disabled');
            } else {
                $('.productPlanList.new .contentContainer .floatingCompareArea .btn').addClass('disabled');
            }
            $('.productPlanList.new .contentContainer .floatingCompareArea .title span').text(_check);
            // console.log(_check);
        });
    });
    $(document).on('click', '.floatingCompareArea .btn', function() {
        if (_check < 2) {
            $('.productPlanList.new .contentContainer .toastMSG span').text('요금제 비교는 2개 이상 가능해요.');
            $('.productPlanList.new .contentContainer .toastMSG').fadeIn();
            setTimeout(function() {
                $('.productPlanList.new .contentContainer .toastMSG').fadeOut();
            }, 3000);
        }
    });
    //최근본 요금제 슬라이드   
    let view_leng = $('.viewListSlide .swiper-slide').length;
    let swiper = new Swiper(".viewListSlide", {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".productViewSlideArrow .btnNext",
            prevEl: ".productViewSlideArrow .btnPrev",
        }
    });
    $(window).resize(function() {
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
        recommendSet();
        filterTagListChk();
    }).resize();
}

function popupProductPlanCompareSelect() {
    //console.log('popupProductPlanCompareSelect');
    let list = '#CompareSelectList .checkboxLine';
    let $page = $('.popupProductCompareSelect .paging strong');
    let $btnT = $('.popupProductCompareSelect .popupBottom .total');
    let $btnC = $('.popupProductCompareSelect .popupBottom .current');
    let _check = 0;
    $(list).each(function() {
        //체크박스 클릭
        $(this).find('input:checkbox').click(function() {
            if ($(this).is(':checked')) {
                _check++;
            } else {
                _check--;
            }
            if (_check > 3) {
                _check = 3;
                $(this).prop('checked', false);
                $('.popupProductCompareSelect .toastMSG.msg3').fadeIn();
                setTimeout(function() {
                    $('.popupProductCompareSelect .toastMSG.msg3').fadeOut();
                }, 3000);
            }
            pageSet();
        });
        //리스트 삭제
        $(this).find('.remove').click(function() {
            let $tar = $(this).closest('.checkboxLine');
            if ($(list).length == 1) {
                $('.dialoguePop[data-parent="popupProductCompareSelect"] .title').text('요금제를 삭제할까요?');
                $('.dialoguePop[data-parent="popupProductCompareSelect"] .subTxt').html('해당 요금제를 삭제하시면 <br>요금제 선택 화면이 닫혀요.');
                $('.dialoguePop[data-parent="popupProductCompareSelect"]').addClass('show');
            } else {
                $tar.remove();
            }
            _check = $('#CompareSelectList .checkboxLine input:checkbox:checked').length;
            pageSet();
        });
    });
    //전체삭제
    $('.groupRemoveBtn').click(function() {
        if (groupRemoveInit) {
            _check = 0;
            $(list).remove();
            pageSet();
            groupRemoveInit = false;
        } else {
            $('.dialoguePop[data-parent="popupProductCompareSelect"] .title').text('요금제를 모두 삭제할까요?');
            $('.dialoguePop[data-parent="popupProductCompareSelect"] .subTxt').html('요금제를 모두 삭제하시면 <br>요금제 선택 화면이 닫혀요.');
            $('.dialoguePop[data-parent="popupProductCompareSelect"]').addClass('show');
        }
    });
    //비교버튼클릭시
    $('.popupProductCompareSelect .popupBottom .btn').click(function() {
        //console.log('비교버튼클릭시');
        if (_check == 0) {
            $('.popupProductCompareSelect .toastMSG.msg1').fadeIn();
            setTimeout(function() {
                $('.popupProductCompareSelect .toastMSG.msg1').fadeOut();
            }, 3000);
        } else if (_check == 1) {
            $('.popupProductCompareSelect .toastMSG.msg2').fadeIn();
            setTimeout(function() {
                $('.popupProductCompareSelect .toastMSG.msg2').fadeOut();
            }, 3000);
        }else{
            if ($('.popupProductPlanCompare.new').length > 0) {
                $('.popupProductPlanCompare.new').stop().animate({'scrollTop':0},500);
            }
        }
    });

    function pageSet() {
        let $list = $(list);
        if (_check > 1) {
            $('.popupProductCompareSelect .popupBottom .btn').removeClass('disabled');
        } else {
            $('.popupProductCompareSelect .popupBottom .btn').addClass('disabled');
        }
        $('.popupProductCompareSelect .paging strong').text($list.length);
        // $('.popupProductCompareSelect .popupBottom .total').text($list.length);
        $('.popupProductCompareSelect .popupBottom .current').text(_check);
    }
    pageSet();
}
function resetCompareSize() {   
    if ($(window).width() <= 717) {
        setTimeout(function () {
            let asHeight = $('.popupProductPlanCompare.new .popupMiddle').height();
            let moveScroll = $('.productCompareList').height() + 48; 
            if (moveScroll > asHeight && moveScroll - asHeight <= 110) {
                $('#CompareList').css('margin-bottom', '110px');
            } else {
                $('#CompareList').removeAttr('style');
            } 
        }, 100);
    }
     
}
function popupProductPlanCompare() {
    //console.log('popupProductPlanCompare');
    let _tar = '.popupProductPlanCompare.new #CompareList .popularDataArea';
    let _listX = $('#CompareList').scrollLeft();
    $('.popupProductPlanCompare.new .popupMiddle').scroll(function() {
        let $tar = $('.popupProductPlanCompare.new .popupContainer');
        let top = $(this).scrollTop();
        let w = $(window).width();
        let _w = $(_tar).width();
        let _tit1 = '선택한 요금제의 <br>비교 결과를 확인해 보세요';
        let _tit2 = '요금제 비교 결과';
        if (w <= 717) {
            if (top > 48) {
                $tar.addClass('mobileScroll');
                $tar.find('.popupTitle').html(_tit2);
            } else {
                $tar.removeClass('mobileScroll');
                $tar.find('.popupTitle').html(_tit1);
            }
        } else {
            $tar.removeClass('mobileScroll');
            $tar.find('.popupTitle').html(_tit1);
        }
        if (top > 48) {
            $(_tar).each(function(idx) {
                $(this).find('.summaryTit').addClass('fix').css({
                    'width': _w + 'px',
                    'left': (idx * _w) + 'px',
                    'margin-left': -(_listX) + 'px'
                });
            });
        } else {
            $(_tar).each(function(idx) {
                $(this).find('.summaryTit').removeClass('fix').removeAttr('style');
            });
        }
    });
    let fixTouch = false;
    let foxTouchX = 0;
    $(document).on('touchstart', '.summaryTit.fix, .popupProductPlanCompare .popupBottom', function(e) {
        e.stopPropagation();
        foxTouchX = e.originalEvent.touches[0].clientX;
    });
    $(document).on('touchend', '.summaryTit.fix, .popupProductPlanCompare .popupBottom', function(e) {
        e.stopPropagation();
        let _contW = $('#CompareList').width();
        let _x = e.originalEvent.changedTouches[0].clientX;
        let _sumW = 0;
        $('#CompareList .popularDataArea').each(function() {
            _sumW += $(this).width();
        })
        if (foxTouchX > _x + 5) {
            $('#CompareList').stop().animate({
                'scrollLeft': (_sumW - _contW)
            }, 10);
            //console.log('touch right',(_sumW - _contW));
        } else if (foxTouchX < _x - 5) {
            $('#CompareList').stop().animate({
                'scrollLeft': 0
            }, 10);
            //console.log('touch left',0);
        }
    });
    $(window).resize(function() {
        let $tar = $(_tar);
        let ww = $(window).innerWidth();
        let w = $tar.width();
        if (ww <= 717) {
            $tar.each(function(idx) {
                if ($(this).find('.summaryTit').hasClass('fix')) {
                    $(this).find('.summaryTit').css({
                        'width': w + 'px',
                        'left': (idx * w) + 'px',
                        'margin-left': -(_listX) + 'px'
                    });
                } else {
                    $(this).find('.summaryTit').removeAttr('style');
                }
            });
        } else {
            $tar.each(function(idx) {
                $(this).find('.summaryTit').removeClass('fix').removeAttr('style');
            });
        }
        resetCompareSize();
        popupProductPlanCompareCell();
    });
    $('.popupProductPlanCompare.new #CompareList').scroll(function() {
        let $tar = $(_tar);
        _listX = $(this).scrollLeft();
        $('#popupDefaultNew .popupBottom').css('left', -(_listX) + 'px');
        $tar.each(function(idx) {
            if ($(this).find('.summaryTit').hasClass('fix')) {
                $(this).find('.summaryTit').css({
                    'margin-left': -(_listX) + 'px'
                });
            } else {
                $(this).find('.summaryTit').removeAttr('style');
            }
        });
        //console.log(_listX);
    });
    $('.differToggleBtn').on('click', function() {
        $(this).toggleClass('active');
        $('#CompareList').toggleClass('active');
        $(window).resize();
    });
    $(document).on('click', '#CompareList .popularDataArea .btn.remove', function() {
        let $item = $(this).closest('.popularDataArea');
        let key = $item.attr('data-key');
        let _lang = $(_tar).length;
        if (_lang > 2) {
            $item.remove(); //개발에서 처리해도 됨 (퍼블 테스트를 위해 넣어놈)
            $('.popupProductPlanCompare.new .popupBottom .buttonArea[data-key=' + key + ']').remove(); //개발에서 처리해도 됨 (퍼블 테스트를 위해 넣어놈)
            //popupProductPlanCompareSet();
            if ($('.popupProductPlanCompare.new .popularDataArea .dlItemFlex:first-child  .subTxt:empty').length == 2) {
                $('.popupProductPlanCompare.new .popularDataArea .dlItemFlex:first-child  .subTxt:empty').css('display', 'none');
            }            
            $(window).resize();
        } else {
            $('.dialoguePop[data-parent="popupProductPlanCompare"]').addClass('show');
        }
        //console.log(_lang);
    });
    $(document).on('click', '.popupProductPlanCompare .popupTop .btnClose', function() {
        $('.popupProductPlanCompare .popupBottom').removeAttr('style');
        $('.popupProductPlanCompare .productCompareList').scrollLeft(0);
    });
    $(window).resize();
}

function popupProductPlanCompareCell() {
    let arr = new Array();
    let max = new Array();
    if ($('.popupProductPlanCompare.new').hasClass('show')) {
        $('.popupProductPlanCompare.new .popularDataArea').each(function(i) {
            //let i = $(this).index();
            let cell = new Array();
            $(this).find('.dlItemFlex').each(function(j) {
                //let j = $(this).index();
                let _h = $(this).height();
                //console.log('popupProductCompareSelect ::',i,j,_h);
                cell.push(_h);
            });
            arr.push(cell);
        });
        for (let i = 0; i < arr[0].length; i++) {
            let _lang = $('.popupProductPlanCompare.new .popularDataArea').length;
            if (_lang == 2) {
                max[i] = Math.max(arr[0][i], arr[1][i]);
            } else if (_lang == 3) {
                max[i] = Math.max(arr[0][i], arr[1][i], arr[2][i]);
            }
        }
        //console.log(arr, max);
        $('.popupProductPlanCompare.new .popularDataArea').each(function() {
            $(this).find('.dlItemFlex').each(function(idx) {
                $(this).css({
                    'min-height': max[idx]
                });
            });
        });
        $('.popupProductPlanCompare.new #CompareList .popularDataArea').each(function(idx) {
            let _w = $(this).width();
            //console.log(_w);
            $('.popup.popupProductPlanCompare.new .popupBottom .buttonArea').eq(idx).css({
                'width': _w + 'px'
            });
        });
        /*
        let _minW = $('.popupBottom .buttonArea').eq(0).find('.btn').outerWidth();
        $('.popupBottom .buttonArea:not(:first-child) .btn').css('max-width',_minW+'px');
        */
        /* //두번째 버튼으로 기준으로 했을때
	    let _minW = $('.popupBottom .buttonArea').eq(1).find('.btn').outerWidth();
	    $('.popupBottom .buttonArea:not(:nth-child(2)) .btn').css('max-width',_minW+'px');
	    */
    }
    //console.log('popupProductPlanCompareCell'); 
}