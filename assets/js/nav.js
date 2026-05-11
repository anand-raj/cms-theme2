(function () {
  var btn  = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-links');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open);
  });

  // ── State Chapters dropdown ──────────────────────────────────────────────
  var dropdownBtns = document.querySelectorAll('.nav-dropdown-btn');
  dropdownBtns.forEach(function (dropBtn) {
    var dropMenu = dropBtn.nextElementSibling;

    dropBtn.addEventListener('click', function () {
      var open = dropBtn.getAttribute('aria-expanded') === 'true';
      // Close all other dropdowns first
      dropdownBtns.forEach(function (other) {
        if (other !== dropBtn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.classList.remove('is-open');
        }
      });
      dropBtn.setAttribute('aria-expanded', String(!open));
      dropMenu.classList.toggle('is-open', !open);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-dropdown')) {
      dropdownBtns.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('is-open');
      });
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dropdownBtns.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('is-open');
        b.focus();
      });
    }
  });

  // Set real header height as CSS variable so sticky offsets are exact
  function setHeaderHeight() {
    var h = document.getElementById('siteHeader').offsetHeight;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  // Shrink nav on scroll
  var header   = document.getElementById('siteHeader');
  var scrolled = false;
  window.addEventListener('scroll', function () {
    if (!scrolled && window.scrollY > 80) {
      header.classList.add('is-scrolled');
      scrolled = true;
    } else if (scrolled && window.scrollY < 40) {
      header.classList.remove('is-scrolled');
      scrolled = false;
    }
  }, { passive: true });
  header.addEventListener('transitionend', setHeaderHeight);
})();
