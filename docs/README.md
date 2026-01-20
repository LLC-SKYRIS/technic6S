<div class="landing">

  <nav class="gen-header">
    <a href="./" class="icon-home">
      <div class="logo">
        <img src="images/logo.svg" alt="SKYRIS" />
      </div>
    </a>

    <div class="nav-link header-nav-link">
      <a href="https://skyris.pro/" target="_blank" rel="noopener"><span>Сайт компании</span></a>
      <a href="https://t.me/skyris_public" target="_blank" rel="noopener"><span>Новости компании</span></a>
    </div>

    <div class="wy-header-nav-search">
      <div class="input" role="search">
        <form id="site-search-form" class="wy-form search-inline" action="#" method="get" role="search">
          <span class="search-icon" aria-hidden="true">
            <img src="images/search.png" alt="">
          </span>
          <input id="site-search-input" type="text" name="q" placeholder="Быстрый поиск" autocomplete="off">
        </form>
      </div>
    </div>
  </nav>

  <div class="wy-nav-content">
    <div class="rst-content">
      <main>
        <div class="cards-row">

          <a class="big-card" href="technic6S/">
            <div class="big-card-inner">
              <div class="big-card-text">
                <div class="title">
                  <span>Техник </span><span class="accent">6S</span>
                </div>
                <div class="go-link">
                  <span class="divider" aria-hidden="true"></span>
                  <span class="text">В раздел</span>
                </div>
              </div>
              <div class="big-card-image">
                <img src="images/6S.png" alt="Техник 6S">
              </div>
            </div>
          </a>

          <a class="big-card" href="pilotFPV/">
            <div class="big-card-inner">
              <div class="big-card-text">
                <div class="title">
                  <span>Пилот </span><span class="accent">FPV</span>
                </div>
                <div class="go-link">
                  <span class="divider"></span>
                  <span class="text">В раздел</span>
                </div>
              </div>
              <div class="big-card-image">
                <img src="images/pilot.png" alt="Пилот FPV">
              </div>
            </div>
          </a>

        </div>
      </main>
    </div>
  </div>

  </div>

<script>
  // Поиск: просто пробрасываем q в страницу результатов поиска HonKit
  // ВАЖНО: подставьте реальную страницу (например technic6S/OrangePi.html или любую существующую),
  // где HonKit показывает результаты поиска (honkit-plugin-search обычно сам рендерит выдачу).
  const SEARCH_RESULTS_PAGE = "technic6S/OrangePi.html";

  function goSearch(q) {
    q = (q || "").trim();
    if (!q) return;
    window.location.href = `${SEARCH_RESULTS_PAGE}?q=${encodeURIComponent(q)}`;
  }

  const form = document.getElementById("site-search-form");
  const input = document.getElementById("site-search-input");
  if (form && input) {
    form.addEventListener("submit", (e) => { e.preventDefault(); goSearch(input.value); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); goSearch(input.value); }
    });
  }
</script>
