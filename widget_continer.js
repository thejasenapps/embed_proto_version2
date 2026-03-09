(function() {
  const GITHUB_URL = "https://thejasenapps.github.io/embed_proto_version2/";

  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });
  document.body.appendChild(host);

  shadow.innerHTML = `
    <style>
      :host { all: initial; } 
      #container {
        position: fixed; width: 350px; height: 550px;
        background: white; border-radius: 15px; display: none;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 2147483647; overflow: hidden;
      }
      #flutter-target { width: 100%; height: 100%; }
    </style>

    <div id="container">
      <div id="flutter-target"></div>
    </div>
  `;

  const container = shadow.getElementById('container');
  const target = shadow.getElementById('flutter-target');

  const script = document.createElement('script');
  script.src = GITHUB_URL + "flutter_embed.js";
  document.head.appendChild(script);

    if ( && window.FlutterEmbed) {
        window.FlutterEmbed.init({
          container: target, 
          appUrl: GITHUB_URL
        });
      }
})();
