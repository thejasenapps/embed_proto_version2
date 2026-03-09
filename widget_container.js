(function (window) {

  const CONFIG = {
    appUrl: "https://thejasenapps.github.io/embed_proto_version2/",
    script: "flutter_embed.js",
    defaultHeight: 550,
    defaultWidth: 350
  };

  let flutterRuntimeLoaded = false;
  let loadingPromise = null;

  function loadFlutterRuntime() {

    if (flutterRuntimeLoaded) {
      return Promise.resolve();
    }

    if (loadingPromise) {
      return loadingPromise;
    }

    loadingPromise = new Promise((resolve, reject) => {

      const script = document.createElement("script");
      script.src = CONFIG.appUrl + CONFIG.script;
      script.async = true;

      script.onload = () => {
        flutterRuntimeLoaded = true;
        resolve();
      };

      script.onerror = reject;

      document.head.appendChild(script);

    });

    return loadingPromise;
  }

  function createShadowContainer(mountPoint) {

    const host = document.createElement("div");
    host.style.width = "100%";
    host.style.height = "100%";
    host.style.display = "block";

    const shadow = host.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        :host {
          all: initial;
          display:block;
          width:100%;
          height:100%;
        }

        #container{
          width:100%;
          height:100%;
          min-height:${CONFIG.defaultHeight}px;
          min-width:${CONFIG.defaultWidth}px;
          position:relative;
          overflow:hidden;
          background:white;
          border-radius:12px;
        }

        #flutter-target{
          width:100%;
          height:100%;
        }
      </style>

      <div id="container">
        <div id="flutter-target"></div>
      </div>
    `;

    mountPoint.appendChild(host);

    return shadow.getElementById("flutter-target");
  }

  async function mountWidget(container) {

    const target = createShadowContainer(container);

    await loadFlutterRuntime();

    if (window.FlutterEmbed) {
      window.FlutterEmbed.init({
        container: target,
        appUrl: CONFIG.appUrl
      });
    }

  }

  function autoDiscover() {

    const elements = document.querySelectorAll("[data-flutter-widget]");

    elements.forEach(el => {
      mountWidget(el);
    });

  }

  function init() {

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoDiscover);
    } else {
      autoDiscover();
    }

  }

  /* Public API */

  window.FlutterWidget = {
    mount: mountWidget
  };

  init();

})(window);
