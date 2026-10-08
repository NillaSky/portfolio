/* Secure Check 리포트 데모
 * 화면은 state 하나에서 렌더링한다. 카드는 사용자 상태(로그인/회선), API 상태, 해지 예외에 따라
 * 이용 중 · 확인 중 · 회선 필요 · 미가입 · 로그인 필요 중 하나의 상태를 가진다.
 */
(function () {
  'use strict';

  var LINES = [
    { id: 'line1', label: '010-****-1234', spam: 128, phishing: 9 },
    { id: 'line2', label: '010-****-5678', spam: 41, phishing: 2 },
  ];

  var PROTECT = [
    { id: 'spam', icon: 'message', title: '스팸 문자 차단', desc: '스팸으로 의심되는 문자를 자동으로 걸러줘요.', statKey: 'spam', canCancel: true },
    { id: 'phishing', icon: 'phone', title: '피싱 번호 차단', desc: '신고된 사기 번호의 전화를 미리 막아줘요.', statKey: 'phishing', canCancel: false },
  ];

  var ACCOUNT = [
    { id: 'twofactor', icon: 'key', title: '2단계 인증', desc: '로그인할 때 한 번 더 본인을 확인해요.', lineOnly: false },
    { id: 'loginAlert', icon: 'bell', title: '새 기기 로그인 알림', desc: '처음 보는 기기에서 로그인하면 알려줘요.', lineOnly: false },
    { id: 'payLimit', icon: 'card', title: '소액결제 차단', desc: '원하지 않는 휴대폰 결제를 막아줘요.', lineOnly: true },
    { id: 'simLock', icon: 'sim', title: '유심 잠금', desc: '유심을 다른 기기에 꽂으면 잠겨요.', lineOnly: true },
  ];

  var HABIT = [
    { id: 'news', icon: 'news', title: '최신 사기 수법 알아보기', desc: '요즘 많이 쓰이는 수법을 3분 안에 확인해요.' },
    { id: 'quiz', icon: 'quiz', title: '보안 상식 퀴즈', desc: '5문제로 내 보안 상식을 점검해요.' },
    { id: 'password', icon: 'lock', title: '비밀번호 점검하기', desc: '같은 비밀번호를 여러 곳에 쓰고 있지 않은지 확인해요.' },
  ];

  var TIPS = [
    { title: '링크보다 앱에서 확인하기', text: '택배·결제 안내 문자의 링크 대신 공식 앱에서 직접 확인하세요.' },
    { title: '인증번호는 누구에게도', text: '어떤 기관도 전화로 인증번호를 묻지 않아요.' },
    { title: '공용 와이파이 주의', text: '공용 와이파이에서는 금융 앱 사용을 피하세요.' },
    { title: '앱은 공식 마켓에서만', text: '문자로 받은 설치 파일(APK)은 열지 마세요.' },
    { title: '가족과 암호 정하기', text: '가족을 사칭한 연락에 대비해 둘만 아는 암호를 정해 두세요.' },
    { title: '분실 즉시 정지', text: '휴대폰을 잃어버리면 바로 분실 신고와 일시 정지를 하세요.' },
  ];

  // 등급 구간 (게이지 눈금도 이 경계값을 사용)
  var GRADES = [
    { min: 90, label: '아주 좋음', tone: 'success' },
    { min: 70, label: '좋음', tone: 'info' },
    { min: 40, label: '보통', tone: 'warning' },
    { min: 0, label: '관심 필요', tone: 'danger' },
  ];

  function initialState() {
    return {
      user: 'member',
      apiError: false,
      cancelled: false,
      line: 'line1',
      done: { twofactor: true },
    };
  }

  var state = initialState();

  /* ---------- 상태 계산 ---------- */
  function hasLine() { return state.user === 'member'; }
  function isGuest() { return state.user === 'guest'; }
  function currentLine() {
    for (var i = 0; i < LINES.length; i++) if (LINES[i].id === state.line) return LINES[i];
    return LINES[0];
  }

  function protectStatus(item) {
    if (isGuest()) return 'guest';
    if (!hasLine()) return 'needLine';
    if (item.canCancel && state.cancelled) return 'notJoined';
    if (state.apiError) return 'checking';
    return 'active';
  }

  function missionStatus(item) {
    if (isGuest()) return 'guest';
    if (item.lineOnly && !hasLine()) return 'needLine';
    return state.done[item.id] ? 'done' : 'todo';
  }

  // 적용 가능한 항목 중 완료한 비율 — 회선이 없거나 API 확인 중인 항목은 분모에서 제외
  function calcScore() {
    var total = 0;
    var completed = 0;
    PROTECT.forEach(function (p) {
      var s = protectStatus(p);
      if (s === 'active') { total++; completed++; }
      else if (s === 'notJoined') { total++; }
    });
    ACCOUNT.concat(HABIT).forEach(function (m) {
      var s = missionStatus(m);
      if (s === 'done') { total++; completed++; }
      else if (s === 'todo') { total++; }
    });
    return total ? Math.round((completed / total) * 100) : 0;
  }

  function gradeOf(score) {
    for (var i = 0; i < GRADES.length; i++) if (score >= GRADES[i].min) return GRADES[i];
    return GRADES[GRADES.length - 1];
  }

  /* ---------- 렌더링 ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function icon(name, cls) {
    return '<svg class="' + cls + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  function status(tone, text) {
    return '<span class="status status--' + tone + '">' + esc(text) + '</span>';
  }

  function renderSummary() {
    var el = document.getElementById('summary');

    if (isGuest()) {
      el.className = 'hero__card hero__card--center';
      el.innerHTML =
        icon('shield', 'hero__icon') +
        '<h2 class="hero__lead" id="summaryTitle">내 디지털 생활,<br>지금 얼마나 안전할까요?</h2>' +
        '<p class="hero__sub">로그인하면 내 회선의 보호 현황과 보안 점수를 볼 수 있어요.</p>' +
        '<button type="button" class="btn btn--brand" data-action="login">로그인하고 리포트 보기</button>';
      return;
    }

    if (!hasLine()) {
      el.className = 'hero__card hero__card--center';
      el.innerHTML =
        icon('user', 'hero__icon') +
        '<h2 class="hero__greeting" id="summaryTitle"><span class="hero__name">홍길*</span><span class="hero__suffix">고객님</span></h2>' +
        '<p class="hero__sub">등록된 회선이 없어 보안 점수는 표시하지 않아요.<br>계정 보안 설정과 보안 습관 미션은 바로 참여할 수 있어요.</p>';
      return;
    }

    var score = calcScore();
    var grade = gradeOf(score);
    var line = currentLine();
    var ticks = GRADES.slice(0, 3).map(function (g) {
      return '<span class="gauge__tick" style="left:' + g.min + '%"></span>';
    }).join('');
    var optionsHtml = LINES.map(function (l) {
      var selected = l.id === state.line;
      return '<li class="select__option" role="option" id="opt-' + l.id + '" data-value="' + l.id + '" aria-selected="' + selected + '">' + esc(l.label) + '</li>';
    }).join('');

    el.className = 'hero__card';
    el.innerHTML =
      '<div class="hero__top">' +
        '<h2 class="hero__greeting" id="summaryTitle"><span class="hero__name">홍길*</span><span class="hero__suffix">고객님의 보안 리포트</span></h2>' +
        '<div class="select" id="lineSelect">' +
          '<span class="sr-only" id="lineLabel">회선 선택</span>' +
          '<button type="button" class="select__trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="lineLabel lineValue" aria-controls="lineList">' +
            '<span id="lineValue">' + esc(line.label) + '</span>' + icon('arrow', '') +
          '</button>' +
          '<ul class="select__list" id="lineList" role="listbox" tabindex="-1" aria-labelledby="lineLabel" hidden>' + optionsHtml + '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="score">' +
        '<div class="score__label-row">보안 점수' +
          '<span class="popover-wrap">' +
            '<button type="button" class="info-btn" aria-expanded="false" aria-controls="scorePopover" aria-label="점수 계산 방식 보기">i</button>' +
            '<div class="popover" id="scorePopover" role="note" hidden>적용할 수 있는 항목 중 완료한 항목의 비율이에요. 확인 중인 항목은 계산에서 잠시 빠져요.</div>' +
          '</span>' +
        '</div>' +
        '<div class="score__row">' +
          '<span class="score__value">' + score + '<small>점</small></span>' +
          '<span class="grade grade--' + grade.tone + '">' + grade.label + '</span>' +
        '</div>' +
        '<div class="gauge" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + score + '" aria-valuetext="' + score + '점, ' + grade.label + '" aria-label="보안 점수">' +
          '<div class="gauge__bar">' + ticks + '<span class="gauge__mask" style="width:' + (100 - score) + '%"></span></div>' +
          '<span class="gauge__marker" style="left:' + score + '%"></span>' +
        '</div>' +
        '<div class="gauge__legend" aria-hidden="true">' + GRADES.slice().reverse().map(function (g) { return '<span style="left:' + g.min + '%">' + g.label + '</span>'; }).join('') + '</div>' +
      '</div>' +
      (state.apiError ? '<p class="hero__note">보호 서비스 정보를 확인하고 있어요. 확인되면 점수에 반영돼요.</p>' : '');
  }

  function protectCard(item) {
    var s = protectStatus(item);
    var line = currentLine();
    var statusHtml = '';
    var body = '';

    if (s === 'active') {
      statusHtml = status('success', '이용 중');
      body = '<p class="protect__count">최근 30일 <strong>' + line[item.statKey] + '</strong>건 차단</p>';
    } else if (s === 'checking') {
      statusHtml = status('checking', '확인 중');
      body = '<p class="protect__count">정보를 불러오지 못했어요. 보호 기능은 그대로 동작해요.</p>' +
        '<button type="button" class="btn btn--line" data-action="retry">다시 확인</button>';
    } else if (s === 'notJoined') {
      statusHtml = status('neutral', '미가입');
      body = '<button type="button" class="btn btn--brand" data-action="rejoin" data-id="' + item.id + '">다시 가입하기</button>';
    } else if (s === 'needLine') {
      statusHtml = status('warning', '회선 필요');
    }

    return '<li><article class="protect" data-card="' + item.id + '">' + icon(item.icon, 'protect__icon') +
      '<div class="protect__body">' +
        '<div class="protect__top"><h3 class="protect__title" tabindex="-1">' + esc(item.title) + '</h3>' + statusHtml + '</div>' +
        '<p class="protect__desc">' + esc(item.desc) + '</p>' + body +
      '</div>' +
    '</article></li>';
  }

  function missionCard(item, verb, doneText) {
    var s = missionStatus(item);
    var statusHtml = '';
    var button;
    var described = ' aria-describedby="m-' + item.id + '"';

    if (s === 'done') {
      statusHtml = '<span class="mission__status">' + status('success', '완료') + '</span>';
      button = '<button type="button" class="btn btn--done" aria-disabled="true"' + described + '>' + doneText + '</button>';
    } else if (s === 'needLine') {
      statusHtml = '<span class="mission__status">' + status('warning', '회선 필요') + '</span>';
      button = '<button type="button" class="btn btn--locked" aria-disabled="true"' + described + '>' + verb + '</button>';
    } else if (s === 'guest') {
      button = '<button type="button" class="btn btn--line" data-action="needLogin"' + described + '>' + verb + '</button>';
    } else {
      button = '<button type="button" class="btn btn--primary" data-action="complete" data-id="' + item.id + '"' + described + '>' + verb + '</button>';
    }

    return '<li><article class="mission' + (s === 'needLine' ? ' is-disabled' : '') + '" data-card="' + item.id + '">' + statusHtml +
      icon(item.icon, 'mission__icon') +
      '<h3 class="mission__title" tabindex="-1" id="m-' + item.id + '">' + esc(item.title) + '</h3>' +
      '<p class="mission__desc">' + esc(item.desc) + '</p>' + button +
    '</article></li>';
  }

  function render() {
    // 다시 그린 뒤 같은 카드로 초점을 되돌리기 위해 기억
    var active = document.activeElement;
    var card = active && active.closest ? active.closest('#report [data-card]') : null;
    var focusKey = card ? card.getAttribute('data-card') : null;

    renderSummary();
    document.getElementById('protectList').innerHTML = PROTECT.map(protectCard).join('');
    document.getElementById('accountList').innerHTML = ACCOUNT.map(function (m) { return missionCard(m, '설정하기', '설정 완료'); }).join('');
    document.getElementById('habitList').innerHTML = HABIT.map(function (m) { return missionCard(m, '참여하기', '참여 완료'); }).join('');

    if (focusKey) {
      // 같은 카드의 버튼으로, 버튼이 사라졌으면 카드 제목으로 초점 유지
      var next = document.querySelector('#report [data-card="' + focusKey + '"]');
      var target = next && (next.querySelector('button') || next.querySelector('[tabindex="-1"]'));
      if (target) target.focus();
    }
    syncControls();
  }

  /* ---------- 모달 (초점 가두기) ---------- */
  var modal = document.getElementById('modal');
  var modalConfirm = document.getElementById('modalConfirm');
  var lastFocus = null;
  var onConfirm = null;

  function openModal(opts) {
    lastFocus = document.activeElement;
    document.getElementById('modalTitle').textContent = opts.title;
    document.getElementById('modalDesc').textContent = opts.desc;
    modalConfirm.textContent = opts.confirm;
    onConfirm = opts.onConfirm;
    modal.hidden = false;
    document.getElementById('report').setAttribute('inert', '');
    document.querySelector('.demo-dock').setAttribute('inert', '');
    modalConfirm.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.getElementById('report').removeAttribute('inert');
    document.querySelector('.demo-dock').removeAttribute('inert');
    onConfirm = null;
    if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
    else document.getElementById('report').focus();
  }

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeModal();
  });

  modalConfirm.addEventListener('click', function () {
    var fn = onConfirm;
    closeModal();
    if (fn) fn();
  });

  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    var list = Array.prototype.slice.call(modal.querySelectorAll('button'));
    var first = list[0];
    var last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- 카드 동작 ---------- */
  function findItem(id) {
    var all = PROTECT.concat(ACCOUNT, HABIT);
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  document.getElementById('report').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn || btn.getAttribute('aria-disabled') === 'true') return;
    var action = btn.getAttribute('data-action');
    var item = findItem(btn.getAttribute('data-id'));

    if (action === 'login' || action === 'needLogin') {
      openModal({
        title: '로그인이 필요해요',
        desc: '데모에서는 버튼을 누르면 로그인된 상태로 바뀌어요.',
        confirm: '로그인하기',
        onConfirm: function () { state.user = 'member'; render(); document.getElementById('summaryTitle').setAttribute('tabindex', '-1'); document.getElementById('summaryTitle').focus(); },
      });
    } else if (action === 'complete' && item) {
      openModal({
        title: item.title,
        desc: '데모에서는 완료 상태로 바꾸고 점수에 바로 반영해요.',
        confirm: '완료로 표시',
        onConfirm: function () { state.done[item.id] = true; render(); },
      });
    } else if (action === 'rejoin') {
      openModal({
        title: '스팸 문자 차단 다시 가입',
        desc: '다시 가입하면 바로 보호가 시작돼요.',
        confirm: '가입하기',
        onConfirm: function () { state.cancelled = false; render(); },
      });
    } else if (action === 'retry') {
      state.apiError = false;
      render();
    }
  });

  /* ---------- 점수 설명 팝오버 ---------- */
  function togglePopover(trigger, open) {
    trigger.setAttribute('aria-expanded', String(open));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = !open;
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.info-btn');
    var openTrigger = document.querySelector('.info-btn[aria-expanded="true"]');
    if (openTrigger && openTrigger !== trigger && !e.target.closest('.popover')) togglePopover(openTrigger, false);
    if (trigger) togglePopover(trigger, trigger.getAttribute('aria-expanded') !== 'true');
  });

  /* ---------- 회선 선택 (listbox) ---------- */
  var activeIndex = 0;

  function selectParts() {
    var root = document.getElementById('lineSelect');
    if (!root) return null;
    return {
      trigger: root.querySelector('.select__trigger'),
      list: root.querySelector('.select__list'),
      options: Array.prototype.slice.call(root.querySelectorAll('[role="option"]')),
    };
  }

  function setActive(p, index) {
    activeIndex = (index + p.options.length) % p.options.length;
    p.options.forEach(function (o, i) { o.classList.toggle('is-active', i === activeIndex); });
    p.list.setAttribute('aria-activedescendant', p.options[activeIndex].id);
  }

  function openList(p) {
    p.list.hidden = false;
    p.trigger.setAttribute('aria-expanded', 'true');
    var selected = 0;
    p.options.forEach(function (o, i) { if (o.getAttribute('aria-selected') === 'true') selected = i; });
    setActive(p, selected);
    p.list.focus();
  }

  function closeList(p, refocus) {
    p.list.hidden = true;
    p.trigger.setAttribute('aria-expanded', 'false');
    if (refocus) p.trigger.focus();
  }

  function choose(p, index) {
    state.line = p.options[index].getAttribute('data-value');
    render();
    var np = selectParts();
    if (np) np.trigger.focus();
  }

  document.addEventListener('click', function (e) {
    var p = selectParts();
    if (!p) return;
    if (e.target.closest('.select__trigger')) {
      if (p.list.hidden) openList(p); else closeList(p, true);
      return;
    }
    var opt = e.target.closest('.select__option');
    if (opt) { choose(p, p.options.indexOf(opt)); return; }
    if (!p.list.hidden && !e.target.closest('#lineSelect')) closeList(p, false);
  });

  document.addEventListener('keydown', function (e) {
    // 열린 팝오버는 Esc로 닫고 버튼으로 초점 복귀
    if (e.key === 'Escape') {
      var openTrigger = document.querySelector('.info-btn[aria-expanded="true"]');
      if (openTrigger) { togglePopover(openTrigger, false); openTrigger.focus(); return; }
    }

    var p = selectParts();
    if (!p) return;
    if (e.target === p.trigger && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      openList(p);
      return;
    }
    if (e.target !== p.list) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(p, activeIndex + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(p, activeIndex - 1); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(p, 0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(p, p.options.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(p, activeIndex); }
    else if (e.key === 'Escape' || e.key === 'Tab') { closeList(p, e.key === 'Escape'); }
  });

  /* ---------- 보안 팁 페이저 ---------- */
  var tipPage = 0;
  var PER_PAGE = 3;

  function renderTips() {
    var pages = Math.ceil(TIPS.length / PER_PAGE);
    document.getElementById('tipList').innerHTML = TIPS.map(function (tip, i) {
      var hidden = Math.floor(i / PER_PAGE) !== tipPage ? ' hidden' : '';
      return '<li' + hidden + '><span class="tip__no">TIP ' + (i + 1) + '</span><h3 class="tip__title">' + esc(tip.title) + '</h3><p class="tip__text">' + esc(tip.text) + '</p></li>';
    }).join('');
    var pager = document.getElementById('tipPager');
    pager.querySelector('[data-current]').textContent = tipPage + 1;
    pager.querySelector('[data-total]').textContent = pages;
    pager.querySelector('[data-dir="-1"]').disabled = tipPage === 0;
    pager.querySelector('[data-dir="1"]').disabled = tipPage === pages - 1;
  }

  document.getElementById('tipPager').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-dir]');
    if (!btn || btn.disabled) return;
    tipPage += Number(btn.getAttribute('data-dir'));
    renderTips();
    // 끝 페이지에서 버튼이 비활성화되면 초점을 반대쪽 버튼으로 옮김
    if (btn.disabled) btn.parentNode.querySelector('[data-dir]:not(:disabled)').focus();
  });

  /* ---------- 아코디언 ---------- */
  document.getElementById('faq').addEventListener('click', function (e) {
    var trigger = e.target.closest('.accordion__trigger');
    if (!trigger) return;
    var open = trigger.getAttribute('aria-expanded') !== 'true';
    trigger.setAttribute('aria-expanded', String(open));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = !open;
  });

  /* ---------- 데모 컨트롤 (떠 있는 패널) ---------- */
  var controls = document.getElementById('dockPanel');
  var dockToggle = document.getElementById('dockToggle');
  var themeToggle = document.getElementById('themeToggle');

  function setDock(open) {
    controls.hidden = !open;
    dockToggle.setAttribute('aria-expanded', String(open));
  }

  dockToggle.addEventListener('click', function () {
    setDock(dockToggle.getAttribute('aria-expanded') !== 'true');
  });

  controls.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setDock(false); dockToggle.focus(); }
  });

  function syncControls() {
    controls.querySelector('input[name="user"][value="' + state.user + '"]').checked = true;
    controls.querySelector('input[name="apiError"]').checked = state.apiError;
    controls.querySelector('input[name="cancelled"]').checked = state.cancelled;
  }

  controls.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === 'user') state.user = t.value;
    if (t.name === 'apiError') state.apiError = t.checked;
    if (t.name === 'cancelled') state.cancelled = t.checked;
    render();
  });

  function setTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', String(dark));
  }

  themeToggle.addEventListener('click', function () {
    setTheme(themeToggle.getAttribute('aria-pressed') !== 'true');
  });

  document.getElementById('resetDemo').addEventListener('click', function () {
    state = initialState();
    render();
  });

  // ?theme=dark 로 열면 다크 테마로 시작, 컨트롤 패널은 화면을 가리지 않게 접은 채로 시작
  var params = new URLSearchParams(location.search);
  setTheme(params.get('theme') === 'dark' || (!params.get('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches));
  setDock(false);

  render();
  renderTips();
})();
