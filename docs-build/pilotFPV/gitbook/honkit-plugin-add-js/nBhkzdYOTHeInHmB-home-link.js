(function () {
  const HOME = "https://llc-skyris.github.io/technic6S/";

  function fix() {
    document.querySelectorAll('a[href="' + HOME + '"]').forEach(a => {
      a.removeAttribute("target");
      a.removeAttribute("rel");
      a.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = HOME;
      }, true);
    });
  }

  document.addEventListener("DOMContentLoaded", fix);
  if (typeof gitbook !== "undefined" && gitbook.events && gitbook.events.bind) {
    gitbook.events.bind("page.change", fix);
  }
})();

