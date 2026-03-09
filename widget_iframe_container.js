(function () {

  const GITHUB_URL = "https://thejasenapps.github.io/embed_proto_version2/";
  const DEFAULT_HEIGHT = 550;
  const DEFAULT_WIDTH = 350;

  function createWidget(mountPoint) {

    const host = document.createElement("div");
    const shadow = host.attachShadow({ mode: "open" });

    host.style.display = "block";
    host.style.width = "100%";
    host.style.height = "100%";

    mountPoint.appendChild(host);

    shadow.innerHTML = `
      <style>
        :host {
          all: initial;
          display: block;
          width: 100%;
          height: 100%;
        }

        #container {
          width: 100%;
          height: 100%;
          min-height: ${DEFAULT_HEIGHT}px;
          min-width: ${DEFAULT_WIDTH}px;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: white;
        }

        #flutter-target {
          width: 100%;
          height: 100%;
        }
      </style>

      <div id="container">
        <div id="flutter-target"></div>
      </div>
    `;

    const target = shadow.getElementById("flutter-target");

    const script = document.createElement("script");
    script.src = GITHUB_URL + "flutter_embed.js";
    script.async = true;

    script.onload = function () {
      if (window.FlutterEmbed) {
        window.FlutterEmbed.init({
          container: target,
          appUrl: GITHUB_URL
        });
      }
    };

    document.head.appendChild(script);
  }

  function init() {

    const containers = document.querySelectorAll("[data-flutter-widget]");

    if (containers.length > 0) {
      containers.forEach(createWidget);
    } else {
      createWidget(document.body);
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
