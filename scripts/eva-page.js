(function () {
  'use strict';

  var content = window.WESensingEVA;
  if (!content) return;

  function renderLocalNavigation() {
    var list = document.querySelector('[data-eva-local-navigation]');
    if (!list) return;
    var fragment = document.createDocumentFragment();
    content.localNavigation.forEach(function (item) {
      var link = document.createElement('a');
      link.href = item.target;
      link.textContent = item.label;
      fragment.appendChild(link);
    });
    list.replaceChildren(fragment);
    trackActiveSection(list);
    initLocalMenu(list);
  }

  // Highlight the local-navigation link for the section in the middle of the viewport.
  function trackActiveSection(list) {
    if (!('IntersectionObserver' in window)) return;
    var links = Array.from(list.querySelectorAll('a'));
    var byId = {};
    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute('href'));
      if (section) byId[section.id] = { link: link, section: section };
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var match = byId[entry.target.id];
        if (!match) return;
        if (entry.isIntersecting) {
          links.forEach(function (link) { link.removeAttribute('aria-current'); });
          match.link.setAttribute('aria-current', 'true');
        } else {
          match.link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { observer.observe(byId[id].section); });
  }

  // On narrow screens the section links collapse behind a chevron, as on Apple product pages.
  function initLocalMenu(list) {
    var nav = list.closest('[data-eva-local-nav]');
    var toggle = nav && nav.querySelector('.eva-local-nav__toggle');
    if (!toggle) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      list.classList.toggle('is-open', open);
      var label = toggle.querySelector('.sr-only');
      if (label) label.textContent = open ? 'Hide EVA page sections' : 'Show EVA page sections';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    list.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) setOpen(false);
    });
  }

  function renderRoadmap() {
    var list = document.querySelector('[data-eva-roadmap]');
    if (!list) return;
    var fragment = document.createDocumentFragment();
    content.roadmap.forEach(function (stage, index) {
      var item = document.createElement('li');
      item.style.setProperty('--i', String(index));
      var number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      var title = document.createElement('h3');
      title.textContent = stage;
      item.appendChild(number);
      item.appendChild(title);
      fragment.appendChild(item);
    });
    list.replaceChildren(fragment);
  }

  function renderPartnerships() {
    var list = document.querySelector('[data-eva-partnerships]');
    if (!list) return;
    var fragment = document.createDocumentFragment();
    content.partnerships.forEach(function (category, index) {
      var item = document.createElement('li');
      item.style.setProperty('--i', String(index));
      var number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      var label = document.createElement('strong');
      label.textContent = category;
      item.appendChild(number);
      item.appendChild(label);
      fragment.appendChild(item);
    });
    list.replaceChildren(fragment);
  }

  function renderPageData() {
    renderLocalNavigation();
    renderRoadmap();
    renderPartnerships();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderPageData);
  else renderPageData();
})();
