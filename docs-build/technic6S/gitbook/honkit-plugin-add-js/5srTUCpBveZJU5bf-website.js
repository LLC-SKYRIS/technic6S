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

  function init() {
    // 1) Попробуем сразу
    addCopyButtons(document);

    // 2) Наблюдаем за изменениями контента (SPA + поздний рендер)
    var target =
      document.querySelector('.page-inner') ||
      document.querySelector('.book-body') ||
      document.querySelector('.book') ||
      document.body;

    var scheduled = false;
    var observer = new MutationObserver(function () {
      // дебаунс, чтобы не дёргать 1000 раз подряд
      if (scheduled) return;
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        addCopyButtons(target);
      }, 50);
    });

    observer.observe(target, { childList: true, subtree: true });

    // 3) Если доступен gitbook events — тоже подпишемся
    if (window.gitbook && window.gitbook.events && window.gitbook.events.bind) {
      window.gitbook.events.bind('page.change', function () {
        addCopyButtons(document);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

