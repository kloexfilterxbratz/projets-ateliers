(() => {
  const MODEL_PATH = "../../modeles/oeil_mirror.glb";
  const LOADER_ID = "custom-mindar-loader";

  function installLoader() {
    if (document.getElementById(LOADER_ID)) return;

    // Créer immédiatement le nouvel écran
    const overlay = document.createElement("div");
    overlay.id = LOADER_ID;

    overlay.innerHTML = `
      <model-viewer
        src="${MODEL_PATH}"
        alt="Œil en trois dimensions"
        auto-rotate
        rotation-per-second="18deg"
        interaction-prompt="none"
        disable-zoom
        camera-controls
        exposure="1"
        shadow-intensity="0.4">
      </model-viewer>
    `;

    document.body.appendChild(overlay);

    // Surveiller l'état du chargement MindAR
    const update = () => {
      const mindarLoader =
        document.getElementById("mindar-loading");

      const isLoading =
        !!mindarLoader &&
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

    // Charger le visualiseur 3D indépendamment
    if (customElements.get("model-viewer")) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

    script.onerror = () => {
      console.error("Impossible de charger le visualiseur 3D.");
    };

    document.head.appendChild(script);
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
