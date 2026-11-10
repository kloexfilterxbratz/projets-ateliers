(() => {
  const LOADER_ID = "custom-mindar-loader";

  function installLoader() {
    const overlay = document.getElementById(LOADER_ID);

    if (!overlay) return;

    const update = () => {
      const mindarLoader =
        document.getElementById("mindar-loading");

      // Garder l'écran noir tant que MindAR
      // n'a pas encore créé son écran de chargement.
      const isLoading =
        !mindarLoader ||
        !mindarLoader.classList.contains("hidden");

      overlay.classList.toggle("visible", isLoading);
    };

    const observer = new MutationObserver(update);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"]
    });

    update();

    if (!customElements.get("model-viewer")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

      document.head.appendChild(script);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      installLoader,
      { once: true }
    );
  } else {
    installLoader();
  }
})();
