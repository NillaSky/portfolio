// ---------- 초기화 ----------
window.addEventListener('load', function () {
  inputData(); //data-fn="id_masking 주민 번호 data-fn="phone_masking 핸드폰 번호
  tabSwitch();
  findToggle();
  accordion(); // 아코디언 토글
  classToggle(); //클래스 토글
  dropDownList(); //드롭다운
  scrollNav(); // 탭 클릭시 좌우 포커스 스크롤링
  hideFixedBottomOnKeyboard(); // 모바일 키보드 나타날 때 fixed_bottom 숨김
  // insertFloatingArea();  // 플로팅 영역 삽입
  // insertTopScroll();
  // topScroll(); // 스크롤탑 이벤트
  // compareFloating(); // 요금제 비교하기시 하단 플로팅
  
  // MutationObserver 설정 (추가된 요소만 감지)
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function(mutationsList, observer) {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          classToggle();
          accordion();
          if (node.matches && node.matches('.floating_compare_area')) {
            inputData();
          }
        });
      }
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
});

function inputData() {
  // ---------- 공통 유틸 ----------
  const digitsOnly = (v) => (String(v ?? '').match(/\d/g) || []).join('');
  const getMax = (el) => parseInt(el.dataset.maxlength || '0', 10) || 0;
  const getDelim = (el) => (el.dataset.delimiter ?? '-');
  const parsePattern = (el) => {
    const p = (el.dataset.hyphen || '').trim();
    if (!p) return null;
    return p.split(/[, -]+/).map(n => parseInt(n, 10)).filter(Boolean);
  };
  const chunkEvery = (str, n) => {
    const out = [];
    for (let i = 0; i < str.length; i += n) out.push(str.slice(i, i + n));
    return out;
  };

  // ---------- 주민등록번호 마스킹 ----------
  // 주민번호 마스킹: input[data-fn="id_masking"] 전용 (hidden 없으면 생략 동작)
  document.querySelectorAll('input[data-fn="id_masking"]').forEach(maskInput => {
    const onlyDigits = v => (String(v ?? '').match(/\d/g) || []).join('');

    // 같은 래퍼에서 hidden 찾기 (옵션). 커스텀은 data-target-hidden에 CSS 셀렉터로 지정
    const scope = maskInput.closest('[data-module="input_wrap"]') || maskInput.parentElement || document;
    const hiddenSel = maskInput.dataset.targetHidden || 'input[type="hidden"][name="resident_number"]';
    const realInput = scope.querySelector(hiddenSel) || maskInput.form?.querySelector(hiddenSel) || null;

    const MAX = parseInt(maskInput.dataset.maxlength || '13', 10) || 13;

    let digits = onlyDigits(maskInput.value).slice(0, MAX);

    const render = (d) => {
      if (d.length <= 6) return d;
      if (d.length === 7) return d.slice(0, 6) + '-' + d[6];
      return d.slice(0, 6) + '-' + d[6] + '*'.repeat(Math.min(d.length - 7, 6));
    };

    const v2d = (pos, L) => (L <= 6)
      ? Math.max(0, Math.min(pos, L))
      : (pos <= 6 ? Math.max(0, Math.min(pos, L)) : Math.max(0, Math.min(pos - 1, L)));

    const d2v = (idx, L) => (L <= 6)
      ? Math.max(0, Math.min(idx, L))
      : (idx <= 6 ? idx : idx + 1);

    const syncHidden = () => { if (realInput) realInput.value = digits; };

    const update = (caretDigitIdx = null) => {
      maskInput.value = render(digits);
      syncHidden();
      const L = digits.length;
      const idx = caretDigitIdx == null ? L : Math.max(0, Math.min(caretDigitIdx, L));
      const pos = d2v(idx, L);
      if (typeof maskInput.setSelectionRange === 'function') maskInput.setSelectionRange(pos, pos);
    };

    const insertAt = (idx, text) => {
      const room = MAX - digits.length;
      if (room <= 0) return idx;
      const add = onlyDigits(text).slice(0, room);
      if (!add) return idx;
      digits = digits.slice(0, idx) + add + digits.slice(idx);
      return idx + add.length;
    };

    const deleteRange = (s, e) => {
      const L = digits.length;
      const start = Math.max(0, Math.min(s, L));
      const end   = Math.max(start, Math.min(e, L));
      if (end > start) digits = digits.slice(0, start) + digits.slice(end);
      return start;
    };

    // 입력/삭제/드래그/잘라내기/IME(조합)까지 제어
    maskInput.addEventListener('beforeinput', (e) => {
      const L = digits.length;
      const vStart = maskInput.selectionStart ?? maskInput.value.length;
      const vEnd   = maskInput.selectionEnd   ?? vStart;
      const s  = v2d(vStart, L);
      const ed = v2d(vEnd,   L);
      const hasRange = ed > s;

      if (e.inputType === 'insertText' || e.inputType === 'insertCompositionText') {
        e.preventDefault();
        const caret = hasRange ? deleteRange(s, ed) : s;
        const next  = insertAt(caret, e.data || '');
        update(next);
        return;
      }

      if (
        e.inputType === 'deleteContentBackward' ||
        e.inputType === 'deleteContentForward'  ||
        e.inputType === 'deleteByCut'           ||
        e.inputType === 'deleteByDrag'
      ) {
        e.preventDefault();
        if (hasRange) { update(deleteRange(s, ed)); return; }
        if (e.inputType === 'deleteContentBackward' && s > 0) { update(deleteRange(s - 1, s)); return; }
        if (e.inputType === 'deleteContentForward'  && s < L) { update(deleteRange(s, s + 1)); return; }
        update(s);
        return;
      }

      e.preventDefault();
    });

    maskInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData && e.clipboardData.getData('text'))
                || (window.clipboardData && window.clipboardData.getData('text'))
                || '';
      const L = digits.length;
      const vStart = maskInput.selectionStart ?? maskInput.value.length;
      const vEnd   = maskInput.selectionEnd   ?? vStart;
      const s  = v2d(vStart, L);
      const ed = v2d(vEnd,   L);
      const caret = ed > s ? deleteRange(s, ed) : s;
      const next = insertAt(caret, text);
      update(next);
    });

    // 일부 브라우저 fallback
    maskInput.addEventListener('input', () => {
      const cleaned = onlyDigits(maskInput.value).slice(0, MAX);
      if (cleaned !== digits) {
        digits = cleaned;
        update(); // 커서 끝
      } else {
        const rendered = render(digits);
        if (maskInput.value !== rendered) maskInput.value = rendered;
      }
    });

    update(); // 초기 렌더
  });


  // ---------- 범용 numeric_input ----------
  const formatNumeric = (el, raw) => {
    const d = digitsOnly(raw ?? '');
    const max = getMax(el);
    const capped = max ? d.slice(0, max) : d;

    const groups = parsePattern(el);
    if (groups && groups.length) {
      const out = [];
      let i = 0;
      for (const g of groups) {
        if (i >= capped.length) break;
        out.push(capped.slice(i, i + g));
        i += g;
      }
      if (i < capped.length) out.push(capped.slice(i));
      return out.join(getDelim(el));
    }

    const every = parseInt(el.dataset.hyphenEvery || '0', 10);
    return every > 0 ? chunkEvery(capped, every).join(getDelim(el)) : capped;
  };

  const setFormatted = (el, newVal, prev, start) => {
    el.value = newVal;
    const leftDigits = digitsOnly((prev ?? '').slice(0, start)).length;
    let pos = 0, seen = 0;
    while (pos < el.value.length && seen < leftDigits) {
      if (/\d/.test(el.value[pos])) seen++;
      pos++;
    }
    if (typeof el.setSelectionRange === 'function') {
      el.setSelectionRange(pos, pos);
    }
  };

  document.addEventListener('input', (e) => {
    const el = e.target.closest('input[data-fn="numeric_input"]');
    if (!el) return;
    const prev = el.value ?? '';
    const start = el.selectionStart ?? prev.length;
    const formatted = formatNumeric(el, prev);
    if (formatted !== prev) setFormatted(el, formatted, prev, start);
  });

  document.addEventListener('paste', (e) => {
    const el = e.target.closest('input[data-fn="numeric_input"]');
    if (!el) return;
    e.preventDefault();
    const text = (e.clipboardData && e.clipboardData.getData('text'))
              || (window.clipboardData && window.clipboardData.getData('text'))
              || '';
    const formatted = formatNumeric(el, text);
    setFormatted(el, formatted, '', 0);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });

  document.querySelectorAll('input[data-fn="numeric_input"]').forEach(el => {
    const f = formatNumeric(el, el.value ?? '');
    if (f !== el.value) el.value = f;
  });
}

function findToggle(root = document) {
  const $all = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const bind = (trigger) => {
    if (trigger.dataset.bound === 'true') return;
    trigger.dataset.bound = 'true';

    const trigAttr = trigger.getAttribute('data-trigger');
    // 빈 값이면 observer만 설정하고 클릭 이벤트는 무시
    const trigClass = (trigAttr || 'active').trim();
    let targetSel   = trigger.getAttribute('data-target');
    let   locked    = false;

    if (!targetSel) {
      const container = trigger.closest('[data-fn="find_toggle"]');
      if (container && container.dataset.target) {
        targetSel = container.dataset.target;
        if (!trigger.hasAttribute('data-target')) trigger.setAttribute('data-target', targetSel);
        if (!trigger.dataset.mode && container.dataset.mode) trigger.dataset.mode = container.dataset.mode;
        if (!trigger.dataset.match && container.dataset.match) trigger.dataset.match = container.dataset.match;
        if (!trigger.dataset.syncDisabled && container.dataset.syncDisabled) {
          trigger.dataset.syncDisabled = container.dataset.syncDisabled;
        }
        if (!trigger.dataset.once && container.dataset.once) {
          trigger.dataset.once = container.dataset.once;
        }
      }
    }
    if (!targetSel) return;

    // 컨테이너 상속 후에 값을 읽음
    const mode      = (trigger.dataset.mode || 'toggle').toLowerCase(); // 'toggle' | 'mirror'
    const matchCls  = (trigger.dataset.match || '').trim();
    const syncDis   = trigger.dataset.syncDisabled === 'true';
    const once      = trigger.dataset.once === 'true';

    const targets = $all(targetSel);
    if (!targets.length) return;

    const applyToggle = (isInit = false) => {
      if (locked) return;
      trigger.classList.toggle(trigClass);
      if (syncDis) trigger.toggleAttribute('disabled', trigger.classList.contains(trigClass));
      if (!isInit && once) {
        locked = true;
        trigger.dataset.locked = 'true';
        observer.disconnect();
      }
    };

    const applyMirror = (isInit = false) => {
      if (!matchCls) return;
      if (locked) return;
      const anyHas = targets.some(t => t.classList.contains(matchCls));

      // once 모드일 때: anyHas가 true가 되는 순간 즉시 lock (더 이상 toggle 방지)
      if (once && anyHas) {
        trigger.classList.remove('disabled');
        trigger.classList.add(trigClass);
        if (syncDis) {
          trigger.removeAttribute('disabled');
          // trigger가 버튼이 아닌 경우 내부 버튼 찾아서 disabled 제거
          const btn = trigger.querySelector('button');
          if (btn) {
            btn.removeAttribute('disabled');
            btn.classList.remove('disabled');
          }
        }
        locked = true;
        trigger.dataset.locked = 'true';
        observer.disconnect();
        return;
      }

      // 일반 모드
      trigger.classList.toggle(trigClass, anyHas);
      if (syncDis) trigger.toggleAttribute('disabled', !anyHas);
    };

    const apply = (isInit = false) => (mode === 'mirror' ? applyMirror(isInit) : applyToggle(isInit));

    let rafId = null;
    const observer = new MutationObserver(muts => {
      if (locked) return;
      if (muts.some(m => m.type === 'attributes' && m.attributeName === 'class')) {
        // requestAnimationFrame으로 다음 프레임까지 대기 (여러 변화를 한 번에 처리)
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          apply(false); // 변화에 반응(once 대상이면 이때 1회만)
          rafId = null;
        });
      }
    });
    targets.forEach(t => observer.observe(t, { attributes: true, attributeFilter: ['class'] }));

    if (mode === 'mirror') apply(true);
    trigger._findToggleObserver = observer;
  };

  // 1) 직접형: 트리거 요소에 data-trigger와 data-target가 모두 있는 경우
  $all('[data-trigger][data-target]', root).forEach(bind);

  // 2) 컨테이너형: data-fn="find_toggle" 내부의 [data-trigger]가 컨테이너 값 상속
  $all('[data-fn="find_toggle"]', root).forEach(container => {
    $all('[data-trigger]:not([data-trigger=""])', container).forEach(bind);
  });
}


function tabSwitch() {
  document.querySelectorAll('[data-fn="tab_switch"]').forEach(function(box) {
    if (box.__inited) return;
    box.__inited = true;

    // ① 빈 값 트리거 제외해서 수집 (dropdown 방지)
    var triggers = box.querySelectorAll('[data-trigger]:not([data-trigger=""])');
    var panels   = box.querySelectorAll('[data-tab-panel]');
    if (!triggers.length || !panels.length) return;

    // ② 초기 상태: 모든 패널 숨김
    panels.forEach(function(pn) {
      pn.hidden = true;
      pn.setAttribute('aria-hidden', 'true');
      pn.style.display = 'none';
    });

    // ③ 초기 키: data-default > 체크된 라디오 포함 트리거 (첫 트리거 자동 활성화 제거)
    var initial = box.getAttribute('data-default') || getCheckedTriggerValue(triggers);
    if (initial) {
      activate(initial);
    }

    // 클릭 전환
    box.addEventListener('click', function(e) {
      var t = e.target.closest('[data-trigger]');
      if (!t || !box.contains(t)) return;

      // ② a태그일 때만 기본동작 막기
      if (t.tagName === 'A') e.preventDefault();

      var key = t.getAttribute('data-trigger');
      // ① 빈 값이면 무시 (dropdown 등과 충돌 방지)
      if (!key) return;

      activate(key);
    });

    // 라디오 변경 전환
    box.addEventListener('change', function(e) {
      var t = e.target.closest('[data-trigger]');
      if (!t || !box.contains(t)) return;
      if (e.target.type === 'radio' || e.target.type === 'checkbox') {
        var key = t.getAttribute('data-trigger');
        if (key) activate(key);
      }
    });

    function activate(key) {
      // 트리거 상태 업데이트 (라디오 자동 체크 제거)
      triggers.forEach(function(tr) {
        var on = tr.getAttribute('data-trigger') === key;
        tr.setAttribute('aria-selected', String(on));
        // 라디오 자동 체크 기능 제거 - HTML에서 checked 속성으로 제어
      });

      // 패널 표시/숨김 (CSS 없이 JS로)
      panels.forEach(function(pn) {
        var on = pn.getAttribute('data-tab-panel') === key;
        pn.hidden = !on;
        pn.setAttribute('aria-hidden', String(!on));
        pn.style.display = on ? '' : 'none';
      });
    }

    function getCheckedTriggerValue(triggers) {
      for (var i = 0; i < triggers.length; i++) {
        var r = triggers[i].querySelector('input[type="radio"]');
        if (r && r.checked) return triggers[i].getAttribute('data-trigger');
      }
      return null;
    }
  });
}

function accordion(root) {
  const $containers = $('[data-fn="accordion"]', root);
  $containers.each(function () {
    const $root = $(this);
    if ($root.data('bound')) return;
    $root.data('bound', true);

    const single       = ($root.data('acc') !== 'multiple');
    const collapsible  = $root.data('accCollapsible') !== false;
    const useShift     = !!$root.data('accShift');

    // 초기 상태
    $root.find('[data-acc-item]').each(function () {
      const $item  = $(this);
      const $btn   = $item.find('[data-acc-trigger]').first();
      const $panel = $item.find('[data-acc-panel]').first();

      $btn.attr({ type: 'button', 'aria-expanded': 'false' });
      $panel.attr({ 'aria-hidden': 'true' });

      if (!$item.hasClass('active')) {
        $panel.hide();
      } else {
        $btn.attr('aria-expanded', 'true');
        $panel.attr('aria-hidden', 'false').show();
      }
    });

    // 클릭
    $root.on('click', '[data-acc-trigger]', function (e) {
      e.preventDefault();
      const $btn   = $(this);
      const $item  = $btn.closest('[data-acc-item]');
      const $panel = $item.find('[data-acc-panel]').first();
      const isOpen = $item.hasClass('active');

      if (isOpen && !collapsible) return;

      if (single) {
        $root.find('[data-acc-item].active').not($item).each(function () {
          const $peer = $(this);
          $peer.removeClass('active');
          $peer.find('[data-acc-trigger]').attr('aria-expanded', 'false');
          $peer.find('[data-acc-panel]').stop(true, true).slideUp(200).attr('aria-hidden', 'true');
        });
      }

      if (isOpen) {
        $item.removeClass('active');
        $btn.attr('aria-expanded', 'false');
        $panel.stop(true, true).slideUp(200).attr('aria-hidden', 'true');
        if (useShift) $root.find('[data-acc-item]').css({ transform: '', zIndex: '' });
      } else {
        $item.addClass('active');
        $btn.attr('aria-expanded', 'true');
        $panel.stop(true, true).slideDown(200).attr('aria-hidden', 'false');
      }
    });
  });
}


function scrollNav(root = document) {
  const NAV_SEL = '[data-fn="scroll_nav"]';
  const $roots = (root instanceof Element ? root : document).querySelectorAll(NAV_SEL);

  $roots.forEach(nav => {
    if (nav.dataset.bound === 'true') return;
    nav.dataset.bound = 'true';

    const itemSel     = nav.dataset.items || '[data-trigger="tab"]';
    const targetBehavior = nav.dataset.behavior || 'smooth'; // 최종 목표 behavior
    let behavior      = 'instant'; // 초기에는 instant로 시작
    const align       = nav.dataset.align || 'center';
    const activeClass = nav.dataset.activeClass || 'active';

    // 새로운 옵션: MutationObserver 비활성화 (Swiper 등 외부 로직과 충돌 방지)
    const disableObserver = nav.dataset.disableObserver === 'true';
    // 새로운 옵션: 초기 자동 스크롤 비활성화
    const disableInitialScroll = nav.dataset.disableInitialScroll === 'true';
    // 새로운 옵션: 클릭 시에만 작동
    const clickOnly = nav.dataset.clickOnly === 'true';

    // 페이지 로드 완료 후 smooth로 전환 (1초 후)
    setTimeout(() => {
      behavior = targetBehavior;
    }, 1000);

    const scrollToEl = (el) => {
      if (!el) return;
      el.scrollIntoView({ behavior, block: 'nearest', inline: align });
    };

    const getActive  = () =>
      nav.querySelector(`${itemSel}.${activeClass}, ${itemSel}[aria-selected="true"], ${itemSel}[aria-current]`);

    // 초기 스크롤 (비활성화 가능)
    if (!disableInitialScroll && !clickOnly) {
      setTimeout(() => scrollToEl(getActive()), 0);
    }

    // 클릭 이벤트는 항상 유지
    nav.addEventListener('click', (e) => {
      const t = e.target.closest(itemSel);
      if (t && nav.contains(t)) scrollToEl(t);
    });

    // MutationObserver (선택적 비활성화)
    if (!disableObserver && !clickOnly) {
      const mo = new MutationObserver((muts) => {
        for (const m of muts) {
          if (m.type === 'attributes') {
            const t = m.target.closest(itemSel);
            if (t && nav.contains(t)) { scrollToEl(getActive()); break; }
          } else if (m.type === 'childList' && m.addedNodes.length) {
            scrollToEl(getActive()); break;
          }
        }
      });
      mo.observe(nav, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'aria-selected', 'aria-current'],
        childList: true
      });
    }

    // 커스텀 이벤트 (항상 유지)
    nav.addEventListener('scroll-nav:sync', () => scrollToEl(getActive()));
  });
}

function dropDownList(root) {
  let $root = root ? $(root) : $(document);
  let ns = '.fnDropdown';

  function durOf($wrap){ return Number($wrap.data('duration')) || 100; }
  function closeWrap($wrap){
    let $btn   = $wrap.find('[data-trigger]').first();
    let $panel = $wrap.find('[data-panel]').first();
    $wrap.removeClass('active');
    $btn.attr('aria-expanded','false');
    $panel.stop(true,true).slideUp(durOf($wrap)).attr('aria-hidden','true').attr('hidden', true);
  }
  function closeOthersIfNeed($cur){
    let closeOthers = $cur.is('[data-close-others]') ? String($cur.data('closeOthers')) !== 'false' : true;
    if (!closeOthers) return;
    $root.find('[data-fn="dropdown"].active').each(function(){
      if (this !== $cur[0]) closeWrap($(this));
    });
  }

  // 초기 상태
  $root.find('[data-fn="dropdown"]').each(function(){
    let $wrap = $(this);
    let $btn  = $wrap.find('[data-trigger]').first();
    let $panel= $wrap.find('[data-panel]').first();
    $btn.attr('aria-expanded','false');
    $panel.attr({'aria-hidden':'true','hidden':true}).hide();
  });

  // 토글
  $root.off('click'+ns, '[data-fn="dropdown"] [data-trigger]').on('click'+ns,  '[data-fn="dropdown"] [data-trigger]', function(e){
    e.preventDefault();
    let $wrap = $(this).closest('[data-fn="dropdown"]');
    if ($wrap.is('[data-disabled]')) return;

    let $panel = $wrap.find('[data-panel]').first();
    let open   = $wrap.hasClass('active');

    closeOthersIfNeed($wrap);

    if (open) {
      closeWrap($wrap);
    } else {
      $wrap.addClass('active');
      $(this).attr('aria-expanded','true');
      $panel.removeAttr('hidden').stop(true,true).slideDown(durOf($wrap)).attr('aria-hidden','false');
    }
  });

  // 옵션 선택 → 버튼 텍스트 반영 + 닫기
  $root.off('click'+ns, '[data-fn="dropdown"] [data-panel] [data-option]').on('click'+ns,  '[data-fn="dropdown"] [data-panel] [data-option]', function(){
    let $opt  = $(this);
    let $wrap = $opt.closest('[data-fn="dropdown"]');
    let html  = $.trim($opt.html());
    $wrap.find('[data-trigger] > [data-label]').html(html);
    closeWrap($wrap);
    $wrap.find('[data-trigger]').focus();
  });

  // 키보드: 토글(Enter/Space), 닫기(ESC/Tab)
  $root.off('keydown'+ns, '[data-fn="dropdown"] [data-trigger]').on('keydown'+ns,  '[data-fn="dropdown"] [data-trigger]', function(e){
    let $wrap = $(this).closest('[data-fn="dropdown"]');
    if (e.key === 'Escape'){ e.preventDefault(); closeWrap($wrap); }
    else if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32){
      e.preventDefault(); $(this).trigger('click');
    } else if (e.key === 'Tab' && e.shiftKey){
      closeWrap($wrap);
    }
  });

  // 리스트 내 키보드 이동
  $root.off('keydown'+ns, '[data-fn="dropdown"] [data-panel]').on('keydown'+ns,  '[data-fn="dropdown"] [data-panel]', function(e){
    let $opts = $(this).find('[data-option]');
    let $cur  = $(document.activeElement).closest('[data-option]');
    let i = $opts.index($cur);
    if (e.key === 'ArrowDown'){ e.preventDefault(); $opts.eq(Math.min(i+1,$opts.length-1)).focus(); }
    else if (e.key === 'ArrowUp'){ e.preventDefault(); $opts.eq(Math.max(i-1,0)).focus(); }
    else if (e.key === 'Escape'){ e.preventDefault(); closeWrap($(this).closest('[data-fn="dropdown"]')); $(this).closest('[data-fn="dropdown"]').find('[data-trigger]').focus(); }
    else if (e.key === 'Tab'){ closeWrap($(this).closest('[data-fn="dropdown"]')); }
    else if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); $cur.click(); }
  });

  // 바깥 클릭 닫기
  $(document).off('mousedown'+ns).on('mousedown'+ns, function(e){
    if (!$(e.target).closest('[data-fn="dropdown"]').length) {
      $root.find('[data-fn="dropdown"].active').each(function(){ closeWrap($(this)); });
    }
  });
}

function classToggle(root) {
  var $root = root ? $(root) : $(document);
  var NS = '.classToggle';

  $root
    .off('click' + NS, '[data-fn="class_toggle"][data-trigger], [data-fn="class_toggle"] [data-trigger]')
    .on('click' + NS, '[data-fn="class_toggle"][data-trigger], [data-fn="class_toggle"] [data-trigger]', function (e) {
      e.preventDefault();

      var $btn  = $(this);

      // find_toggle 요소는 무시 (충돌 방지)
      if ($btn.attr('data-fn') === 'find_toggle' || $btn.closest('[data-fn="find_toggle"]').length > 0) {
        return;
      }

      var $wrap = $btn.closest('[data-fn="class_toggle"]');
      var className = $btn.attr('data-class') || $wrap.attr('data-class') || 'active';
      var mode = ($btn.attr('data-mode') || $wrap.attr('data-mode') || 'multiple').toLowerCase(); // multiple | single | radio

      var targetSel = $btn.attr('data-target') || $wrap.attr('data-target');

      function toggleAndClean($el) {
        $el.toggleClass(className);
        if (!$el.attr('class')) $el.removeAttr('class');
      }
      function removeClassAndClean($el) {
        $el.removeClass(className);
        if (!$el.attr('class')) $el.removeAttr('class');
      }
      function addClassAndClean($el) {
        if (!$el.hasClass(className)) $el.addClass(className);
      }

      // ---- with data-target (외부 대상 제어) ----
      if (targetSel) {
        var $targets = $(targetSel);

        if (mode === 'single') {
          var $tgt = $targets.first();
          $targets.not($tgt).each(function(){ removeClassAndClean($(this)); });
          toggleAndClean($tgt);
          return;
        }

        if (mode === 'radio') {
          var $tgt = $targets.first();
          // 이미 활성 상태면 아무 것도 하지 않음
          if ($tgt.hasClass(className)) return;
          $targets.not($tgt).each(function(){ removeClassAndClean($(this)); });
          addClassAndClean($tgt);
          return;
        }

        // multiple (기본)
        $targets.each(function(){ toggleAndClean($(this)); });
        return;
      }

      if (mode === 'single') {
        var $siblings = $wrap.find('[data-trigger]');
        $siblings.not($btn).each(function(){ removeClassAndClean($(this)); });
        toggleAndClean($btn);
        return;
      }

      if (mode === 'radio') {
        var $siblings = $wrap.find('[data-trigger]');
        if ($btn.hasClass(className)) return;
        $siblings.not($btn).each(function(){ removeClassAndClean($(this)); });
        addClassAndClean($btn);
        return;
      }

    });
}

// window.showToast = function (message, opts = {}) {
//   const DEFAULT_DURATION = 2500;
//   let toastTimer = null;
//   const container = opts.container ? document.querySelector(opts.container) : document.body;
//   const duration = opts.duration ?? DEFAULT_DURATION;

//   const existingToast = container.querySelector('.toast_alert');
//   if (existingToast) {
//     existingToast.remove();
//     clearTimeout(toastTimer);
//   }

//   const toast = document.createElement('div');
//   toast.className = 'toast_alert';
//   toast.setAttribute('role', 'status');
//   toast.setAttribute('aria-live', 'polite');
//   toast.innerHTML = `<span>${message}</span>`;
//   toast.style.opacity = '0';
//   toast.style.transition = 'opacity 0.18s ease';
//   toast.style.display = 'block';

//   container.appendChild(toast);
//   requestAnimationFrame(() => { toast.style.opacity = '1'; });

//   toastTimer = setTimeout(() => {
//     toast.style.opacity = '0';
//     toast.addEventListener('transitionend', () => toast.remove(), { once: true });
//   }, duration);
// };

// function topScroll(opts = {}) {
//   const {
//     topScrollAreaSel = '.top_scroll_area',
//     topScrollBtnSel  = '.top_scroll_btn',
//     floatingAreaSel  = '.floatingArea',
//     threshold = 300,
//     showClass = 'show',
//     bottomWhenShown = '13rem',
//     bottomWhenHidden = '4rem'
//   } = opts;

//   const topScrollArea = document.querySelector(topScrollAreaSel);
//   const topScrollBtn  = document.querySelector(topScrollBtnSel);
//   const floatingArea  = document.querySelector(floatingAreaSel);

//   if (!topScrollArea || !topScrollBtn || !floatingArea) return;

//   const onScroll = () => {
//     const show = window.scrollY > threshold;
//     topScrollArea.classList.toggle(showClass, show);
//     floatingArea.style.bottom = show ? bottomWhenShown : bottomWhenHidden;
//   };

//   window.addEventListener('scroll', onScroll, { passive: true });
//   onScroll(); // 초기 1회 반영

//   topScrollBtn.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   });
// }

// function insertFloatingArea() {
//   if (!document.querySelector('.floatingArea')) {
//     const floatingAreaHTML = `
//       <div class="floatingArea" data-module="floating_area">
//         <img src="../../assets/images/main/img_float_FAQ.svg" alt="궁금한 점이 있으시면 무엇이든 물어보세요!">
//         <button class="float_faq" title="고객지원 새창 열림"></button>
//       </div>
//     `;
//     document.querySelector('main').insertAdjacentHTML('beforeend', floatingAreaHTML);
//   }
// }

// function insertTopScroll() {
//   if (!document.querySelector('.top_scroll_area')) {
//     const topScrollHTML = `
//       <div class="top_scroll_area" data-module="Scroll_top">
//         <button class="top_scroll_btn"><img src="../../assets/images/main/icon_top_scroll.png" alt="위로 이동"></button>
//       </div>
//     `;
//     document.querySelector('main').insertAdjacentHTML('beforeend', topScrollHTML);
//   }
// }
// function compareFloating(opts = {}) {
//   const {
//     root = document,
//     floatingSel = '.floating_compare_area',
//     btnSel = '.btn',
//     countSel = '.title span',
//     checkboxSel = '.product_card .compare_check input[type=checkbox]',
//     minCount = 2,
//     maxCount = 3,
//     disabledClass = 'disabled',
//     activeClass = 'active',
//     onCompare = (count) => console.log('선택된 요금제', count, '개 - 팝업 열기'),
//     onBelowMin = () => showToast('요금제 비교는 2개 이상 선택 시 가능해요.'),
//     onExceedMax = () => showToast(`요금제 비교는 최대 ${maxCount}개까지 가능해요.`)
//   } = opts;

//   const main = document.querySelector('main') || document.body;

//   // 체크박스가 하나도 없으면 바로 종료 (비교 UI 필요 없음)
//   if (!root.querySelector(checkboxSel)) return;

//   // compare area 확보 (없으면 생성)
//   let compareArea = main.querySelector(floatingSel);
//   if (!compareArea) {
//     main.insertAdjacentHTML('beforeend', `
//       <div class="floating_compare_area">
//         <div class="floating_compare_inner">
//           <div class="title">비교 대상 요금제<span>0</span></div>
//           <button class="btn new btnPrimary2">비교하기</button>
//         </div>
//       </div>
//     `);
//     compareArea = main.querySelector(floatingSel);
//     if (!compareArea) return; // 방어
//   }

//   // 중복 바인딩 방지
//   if (compareArea.dataset.bound === '1') return;
//   compareArea.dataset.bound = '1';

//   const btnCompare = compareArea.querySelector(btnSel);
//   const cntTxt     = compareArea.querySelector(countSel);

//   let compareCnt = root.querySelectorAll(`${checkboxSel}:checked`).length;
//   if (cntTxt) cntTxt.textContent = compareCnt;

//   compareArea.classList.toggle(activeClass, compareCnt > 0);
//   if (btnCompare) btnCompare.classList.toggle(disabledClass, compareCnt < minCount);

//   // change 핸들러 중복 방지
//   if (!root.__compareFloatingBound) {
//     root.addEventListener('change', (e) => {
//       if (!e.target.matches(checkboxSel)) return;

//       compareCnt += e.target.checked ? 1 : -1;
//       if (compareCnt > maxCount) {
//         e.target.checked = false;
//         compareCnt--;
//         onExceedMax();
//       }

//       if (cntTxt) cntTxt.textContent = compareCnt;
//       compareArea.classList.toggle(activeClass, compareCnt > 0);
//       if (btnCompare) btnCompare.classList.toggle(disabledClass, compareCnt < minCount);
//     });
//     root.__compareFloatingBound = true;
//   }

//   if (btnCompare) {
//     btnCompare.addEventListener('click', () => {
//       if (btnCompare.classList.contains(disabledClass)) { onBelowMin(); return; }
//       onCompare(compareCnt);
//     });
//   }
// }

/* 2025-01-24 KMVNO-#### [DR-2025-######] 모바일 키보드 나타날 때 fixed_bottom 숨김 */
function hideFixedBottomOnKeyboard() {
  let fixedBottom = document.querySelector('[data-scope="fixed_bottom"]');
  if (!fixedBottom) return;

  let wrapElement = document.querySelector('.wrap');
  let inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea, select');
  let hideTimer = null;
  let showTimer = null;

  // 모바일 체크 (태블릿 이하)
  let isMobile = function() {
    return window.innerWidth <= 1024;
  };

  // 숨기기 함수
  let hideFixedBottom = function() {
    clearTimeout(showTimer);
    fixedBottom.style.visibility = 'hidden';
    fixedBottom.style.opacity = '0';
    fixedBottom.style.pointerEvents = 'none';
    fixedBottom.style.transition = 'opacity 0.2s ease, visibility 0.2s ease';

    // wrap에 클래스 추가하여 padding 제거
    if (wrapElement) {
      wrapElement.classList.add('fixed_bottom_hidden');
    }
  };

  // 보이기 함수
  let showFixedBottom = function() {
    clearTimeout(hideTimer);
    fixedBottom.style.visibility = '';
    fixedBottom.style.opacity = '';
    fixedBottom.style.pointerEvents = '';
    fixedBottom.style.transition = '';

    // wrap에서 클래스 제거하여 padding 복구
    if (wrapElement) {
      wrapElement.classList.remove('fixed_bottom_hidden');
    }
  };

  // input focus 이벤트 - 키보드 나타남
  inputs.forEach(function(input) {
    input.addEventListener('focus', function() {
      if (!isMobile()) return;
      lastFocusedInput = this; // 마지막 포커스된 input 추적
      hideFixedBottom();
    });

    input.addEventListener('blur', function() {
      if (!isMobile()) return;

      // blur 직후 다른 input으로 포커스 이동 체크
      showTimer = setTimeout(function() {
        let activeTag = document.activeElement.tagName;
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA' && activeTag !== 'SELECT') {
          lastFocusedInput = null; // blur 시 초기화
          showFixedBottom();
        }
      }, 150);
    });
  });

  // 안드로이드 키보드 닫기 감지 (VisualViewport + resize + polling)
  let initialHeight = window.innerHeight;
  let initialVisualHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  let resizeTimer = null;
  let isKeyboardOpen = false;
  let lastFocusedInput = null;
  let pollingInterval = null;

  // input이 포커스 상태인지 확인
  let isInputFocused = function() {
    let activeElement = document.activeElement;
    let activeTag = activeElement ? activeElement.tagName : '';
    return activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT';
  };

  // 키보드 상태 체크 함수
  let checkKeyboardState = function() {
    if (!isMobile()) return;

    let currentHeight = window.innerHeight;
    let visualHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

    // window.innerHeight 또는 visualViewport.height 중 하나라도 변화 감지
    let heightDiff = currentHeight - initialHeight;
    let visualDiff = visualHeight - initialVisualHeight;

    // 화면이 커졌으면 (키보드가 사라짐)
    // 단, 키보드가 열려있는 상태여야만 체크
    if ((heightDiff > 100 || visualDiff > 100) && isKeyboardOpen) {
      isKeyboardOpen = false;
      showFixedBottom();
      stopPolling(); // polling 중지
      initialHeight = currentHeight;
      initialVisualHeight = visualHeight;
    }
    // 화면이 작아졌으면 (키보드가 나타남)
    // 단, input에 포커스가 있을 때만 키보드로 판단
    else if ((heightDiff < -100 || visualDiff < -100) && !isKeyboardOpen && isInputFocused()) {
      isKeyboardOpen = true;
      hideFixedBottom();
      startPolling(); // polling 시작
      initialHeight = currentHeight;
      initialVisualHeight = visualHeight;
    }
    // 탭 전환 등으로 인한 높이 변화는 무시하고 기준값만 업데이트
    else if (Math.abs(heightDiff) > 50 || Math.abs(visualDiff) > 50) {
      // 키보드 상태가 아니면 기준값만 조용히 업데이트
      if (!isKeyboardOpen) {
        initialHeight = currentHeight;
        initialVisualHeight = visualHeight;
      }
    }
  };

  // Polling 시작 (키보드 열릴 때)
  let startPolling = function() {
    stopPolling(); // 기존 polling 중지
    pollingInterval = setInterval(function() {
      checkKeyboardState();
    }, 150); // 150ms마다 체크 (더 빠르게)
  };

  // Polling 중지
  let stopPolling = function() {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  };

  // VisualViewport API 사용 (더 정확한 키보드 감지)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', function() {
      if (!isMobile()) return;
      checkKeyboardState();
    });
  }

  // 일반 resize 이벤트 (fallback)
  window.addEventListener('resize', function() {
    if (!isMobile()) return;

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      checkKeyboardState();
    }, 100);
  });

  // document 클릭 시 체크 (안드로이드 키보드 닫기 대응)
  document.addEventListener('click', function(e) {
    if (!isMobile()) return;

    // input 외부 클릭 시
    if (!e.target.closest('input, textarea, select')) {
      setTimeout(function() {
        let activeTag = document.activeElement.tagName;
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA' && activeTag !== 'SELECT') {
          showFixedBottom();
        }
      }, 300);
    }
  });

  // 터치 이벤트로 키보드 닫기 감지는 제거 (polling으로 대체)

  // 페이지 visibility 변경 시 복구
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden && isMobile()) {
      setTimeout(function() {
        let activeTag = document.activeElement.tagName;
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA' && activeTag !== 'SELECT') {
          showFixedBottom();
        }
      }, 100);
    }
  });

  // 스크롤 이벤트로 키보드 닫기 감지 (추가 보완)
  let scrollCheckTimer = null;
  document.addEventListener('scroll', function() {
    if (!isMobile() || !isKeyboardOpen) return;

    clearTimeout(scrollCheckTimer);
    scrollCheckTimer = setTimeout(function() {
      checkKeyboardState();
    }, 100);
  }, true); // capture phase에서 감지

  // 페이지를 떠날 때 polling 정리
  window.addEventListener('beforeunload', function() {
    stopPolling();
  });

  // 페이지 숨김 시 polling 중지
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopPolling();
    } else if (isKeyboardOpen) {
      startPolling();
    }
  });
}
/* //2025-01-24 KMVNO-#### [DR-2025-######] */
