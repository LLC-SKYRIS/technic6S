(function () {
  function addCopyButtons(root) {
    root = root || document;

    var blocks = root.querySelectorAll('pre > code');
    blocks.forEach(function (code) {
      var pre = code.parentNode;
      if (!pre || pre.querySelector('.copy-code-btn')) return;

      var btn = document.createElement('button');
      btn.className = 'copy-code-btn';
      btn.type = 'button';
      btn.textContent = 'Copy';

      btn.addEventListener('click', function () {
        var text = (code.innerText || code.textContent || '').replace(/\n$/, '');

        function showCopied() {
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = 'Copy'; }, 1200);
        }

        function fallbackCopy(t) {
          var ta = document.createElement('textarea');
          ta.value = t;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(showCopied).catch(function () {
            fallbackCopy(text);
            showCopied();
          });
        } else {
          fallbackCopy(text);
          showCopied();
        }
      });

      pre.appendChild(btn);
    });
  }

  function syncLandingMode() {
    var isLanding = !!document.querySelector('.landing');
    document.body.classList.toggle('landing-page', isLanding);
  }

  // ===== NEW: TOP HEADER ONLY ON LANDING =====
  function ensureLandingHeader() {
    // только если реально есть landing на странице
    if (!document.querySelector('.landing')) return;

    // уже вставлено
    if (document.querySelector('.landing-topbar')) return;

    var bar = document.createElement('div');
    bar.className = 'landing-topbar';
    bar.innerHTML =
      '<nav class="gen-header">' +
        '<a href="./" class="icon-home">' +
          '<div class="logo"><img src="images/logo.svg" alt="SKYRIS" /></div>' +
        '</a>' +

        '<div class="nav-link header-nav-link">' +
          '<a href="https://skyris.pro/" target="_blank" rel="noopener"><span>Сайт компании</span></a>' +
          '<a href="https://t.me/skyris_public" target="_blank" rel="noopener"><span>Новости компании</span></a>' +
        '</div>' +

        '<div class="wy-header-nav-search">' +
          '<div class="input" role="search">' +
            '<form id="site-search-form" class="wy-form search-inline" action="#" method="get" role="search">' +
              '<span class="search-icon" aria-hidden="true"><img src="images/search.png" alt=""></span>' +
              '<input id="site-search-input" type="text" name="q" placeholder="Быстрый поиск" autocomplete="off">' +
            '</form>' +
          '</div>' +
        '</div>' +
      '</nav>';

    // вставляем самым первым элементом в body
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function syncLandingHeader() {
    var isLanding = !!document.querySelector('.landing');
    var exists = document.querySelector('.landing-topbar');

    // ушли с главной — удаляем
    if (!isLanding && exists) {
      exists.parentNode.removeChild(exists);
      return;
    }

    // на главной — гарантируем наличие
    if (isLanding) ensureLandingHeader();
  }
  // ===== /NEW =====

  function init() {
    // сразу
    syncLandingMode();
    syncLandingHeader();

    // ещё раз после дорисовки
    setTimeout(function () { syncLandingMode(); syncLandingHeader(); }, 0);
    setTimeout(function () { syncLandingMode(); syncLandingHeader(); }, 50);

    addCopyButtons(document);

    var target =
      document.querySelector('.page-inner') ||
      document.querySelector('.book-body') ||
      document.querySelector('.book') ||
      document.body;

    var scheduled = false;
    var observer = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        addCopyButtons(target);
        syncLandingMode();
        syncLandingHeader();
      }, 50);
    });

    observer.observe(target, { childList: true, subtree: true });

    if (window.gitbook && window.gitbook.events && window.gitbook.events.bind) {
      window.gitbook.events.bind('page.change', function () {
        addCopyButtons(document);
        setTimeout(function () { syncLandingMode(); syncLandingHeader(); }, 0);
        setTimeout(function () { syncLandingMode(); syncLandingHeader(); }, 50);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
