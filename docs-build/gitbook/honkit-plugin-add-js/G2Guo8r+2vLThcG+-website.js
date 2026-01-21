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
    initCollapsibleSidebar();


    // ещё раз после дорисовки
    setTimeout(function () { syncLandingMode(); syncLandingHeader(); }, 0);
    setTimeout(function () { syncLandingMode(); syncLandingHeader(); }, 50);

    addCopyButtons(document);

    function initCollapsibleSidebar() {
      var summary = document.querySelector('.book-summary');
      if (!summary) return;

      var items = summary.querySelectorAll('li.chapter');

      items.forEach(function (li) {
        var child = li.querySelector(':scope > ul');
        var link = li.querySelector(':scope > a');
        if (!child || !link) return; // только "папки" (есть подменю)

        // уникальный ключ состояния
        var key = 'nav:' + (link.getAttribute('href') || link.textContent.trim());

        // уже обработано — не дублируем обработчики
        if (li.classList.contains('has-toggle')) return;
        li.classList.add('has-toggle');

        // создаём стрелку (caret), как в VS Code
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'nav-toggle';
        btn.setAttribute('aria-label', 'Toggle section');
        btn.innerHTML = '▸';

        // восстановим сохранённое состояние (по умолчанию раскрыто)
        var saved = localStorage.getItem(key);
        var collapsed = saved === '1';
        li.classList.toggle('is-collapsed', collapsed);

        function toggle() {
          var nowCollapsed = !li.classList.contains('is-collapsed');
          li.classList.toggle('is-collapsed', nowCollapsed);
          localStorage.setItem(key, nowCollapsed ? '1' : '0');
        }

        // клик по стрелке — всегда toggle
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          toggle();
        });

        // VS Code режим:
        // обычный клик по названию папки => toggle, НЕ навигация
        // Ctrl/Cmd/Shift/Alt или средняя кнопка => навигация (оставляем по умолчанию)
        link.addEventListener('click', function (e) {
          // если пользователь хочет открыть ссылку (как "open in new tab" / спец-клик) — не мешаем
          if (e.button !== 0) return; // не левая кнопка
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

          // обычный клик — просто свернуть/развернуть
          e.preventDefault();
          e.stopPropagation();
          toggle();
        });

        // вставляем стрелку перед ссылкой
        li.insertBefore(btn, link);
      });
    }



    // Force trailing slash for landing cards (fix slow load + broken navigation)
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a.big-card') : null;
      if (!a) return;

      // только левая кнопка мыши без модификаторов
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var href = a.getAttribute('href');
      if (!href) return;

      // внешние ссылки не трогаем
      if (/^(https?:)?\/\//i.test(href)) return;

      // нормализуем: technic6S  -> technic6S/
      //              technic6S#x -> technic6S/#x
      var parts = href.split('#');
      var path = parts[0];
      var hash = parts[1] ? ('#' + parts[1]) : '';

      // если это не файл и нет слэша — добавим
      if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) {
        path = path + '/';
      }

      var fixed = path + hash;

      // если gitbook умеет навигацию — используем её, но с правильным URL
      if (window.gitbook && window.gitbook.navigation && window.gitbook.navigation.go) {
        e.preventDefault();
        window.gitbook.navigation.go(fixed);
        return;
      }

      // иначе обычный переход
      if (fixed !== href) {
        e.preventDefault();
        window.location.href = fixed;
      }
    }, true);


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
        initCollapsibleSidebar();
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
