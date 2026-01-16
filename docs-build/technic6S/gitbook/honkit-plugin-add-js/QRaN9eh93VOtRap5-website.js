(function () {
  function addCopyButtons() {
    var blocks = document.querySelectorAll('pre > code');

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

  document.addEventListener('DOMContentLoaded', addCopyButtons);
  document.addEventListener('gitbook:page.change', addCopyButtons);
})();

