(function() {
  const GITHUB_URL = "https://thejasenapps.github.io/embed_proto_version2/";

  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });

  const mountPoint = document.getElementById("widgetBox") || document.body;
  mountPoint.appendChild(host);

  shadow.innerHTML = `
    <style>
      :host { all: initial; } 
      #container {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        overflow: hidden;
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

  const target = shadow.getElementById('flutter-target');

  const script = document.createElement('script');
  script.src = GITHUB_URL + "flutter_embed.js";
  script.async = true;

  script.onload = () => {
      if (window.FlutterEmbed) {
      window.FlutterEmbed.init({
        container: target,
        appUrl: GITHUB_URL
      });
    }
  };

  document.head.appendChild(script);
})();
