(function () {

  const CONFIG = {
    appUrl: "https://thejasenapps.github.io/embed_proto_version2/",
    defaultHeight: "550px",
    borderRadius: "12px"
  };

  function createWidget(mountPoint) {

    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = CONFIG.defaultHeight;
    container.style.position = "relative";
    container.style.borderRadius = CONFIG.borderRadius;
    container.style.overflow = "hidden";
    container.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
    container.style.background = "#fff";

    const iframe = document.createElement("iframe");
    iframe.src = CONFIG.appUrl;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.display = "block";

    iframe.allow = "camera; microphone; clipboard-read; clipboard-write";
    iframe.loading = "lazy";

    container.appendChild(iframe);
    mountPoint.appendChild(container);
  }

  function findMountPoint() {

    const explicit = document.querySelector("[data-reachx-widget]");
    if (explicit) return explicit;

    const script = document.currentScript;
    if (script && script.parentElement) return script.parentElement;

    return document.body;
  }

  function init() {
    const mountPoint = findMountPoint();
    createWidget(mountPoint);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
