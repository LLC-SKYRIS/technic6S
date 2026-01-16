(function () {
  function addCopyButtons() {
    // HonKit обычно рендерит код как: <pre><code class="lang-bash">...</code></pre>
    var blocks = document.querySelectorAll('pre > code');
    blocks.forEach(function (code) {
      var pre = code.parentNode;
      if (!pre || pre.querySelector('.copy-code-btn')) return;

      var btn = document.createElement('button');
      btn.className = 'copy-code-btn';
      btn.type = 'button';
      btn.textContent = 'Copy';

      btn.addEventListener('click', async function () {
        // Берём "чистый" текст без HTML
        var text = code.innerText.replace(/\n$/, ''); // уберём последний перенос строки
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = 'Copy'; }, 1200);
        } catch (e) {
          // fallback для старых браузеров
          var ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = 'Copy'; }, 1200);
        }
      });

      pre.appendChild(btn);
    });
  }

  // GitBook/HonKit подгружает страницы динамически — нужно ловить события
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCopyButtons);
  } else {
    addCopyButtons();
  }

  // На смену страницы в SPA-режиме
  document.addEventListener('gitbook:page.change', addCopyButtons);
})();

