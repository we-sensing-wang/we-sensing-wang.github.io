(function () {
  'use strict';
  function initNavigation() {
    var button = document.querySelector('.sq-nav-toggle');
    var navigation = document.querySelector('.sq-primary-navigation');
    if (!button || !navigation) return;

    function setOpen(open) {
      button.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
      document.body.classList.toggle('sq-nav-open', open);
      var label = button.querySelector('.sq-screen-reader-only');
      if (label) label.textContent = open ? 'Close navigation' : 'Open navigation';
    }

    button.addEventListener('click', function () {
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });
    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initNavigation);
  else initNavigation();
})();
