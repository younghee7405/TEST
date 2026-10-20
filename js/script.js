(function () {
  'use strict';

  var header = document.getElementById('header');
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  // 스크롤 시 헤더 구분선
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 모바일 메뉴
  function setNav(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () {
    setNav(!nav.classList.contains('open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setNav(false);
  });

  // 숫자 카운트업
  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    var duration = 1200;
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // 스크롤 등장 효과
  var targets = document.querySelectorAll('.section__title, .card, .stat, .steps li, .timeline li, .table-wrap, .about__text');
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('visible'); });
    document.querySelectorAll('[data-count]').forEach(countUp);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      var num = entry.target.querySelector('[data-count]');
      if (num) countUp(num);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  targets.forEach(function (el) { io.observe(el); });
})();
