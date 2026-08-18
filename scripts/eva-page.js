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
  }

  function renderRoadmap() {
    var list = document.querySelector('[data-eva-roadmap]');
    if (!list) return;
    var fragment = document.createDocumentFragment();
    content.roadmap.forEach(function (stage, index) {
      var item = document.createElement('li');
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
