(function() {
  const GITHUB_URL = "https://thejasenapps.github.io/embed_proto_version2/";

  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });
  document.body.appendChild(host);

  shadow.innerHTML = `
    <style>
      :host { all: initial; } 
      #btn {
        position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px;
        border-radius: 50%; background: #1976D2; color: white; cursor: pointer;
        font-size: 28px; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 2147483647; display: flex; align-items: center; justify-content: center;
        transition: transform 0.2s;
      }
      #btn:active { transform: scale(0.9); }

      #container {
        position: fixed; bottom: 100px; right: 30px; width: 350px; height: 550px;
        background: white; border-radius: 15px; display: none;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 2147483647; overflow: hidden;
        border: 1px solid #eee;
      }

      /* Mobile Fullscreen Logic */
      @media (max-width: 600px) {
        #container {
          bottom: 0; right: 0; width: 100%; height: 100%; border-radius: 0;
        }
        #btn { bottom: 20px; right: 20px; }
      }

      #close {
        position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5);
        color: white; border: none; border-radius: 50%; width: 30px; height: 30px;
        cursor: pointer; z-index: 10; font-size: 20px; line-height: 1;
      }

      iframe { border: none; width: 100%; height: 100%; }
    </style>

    <button id="btn" aria-label="Open Chat">💬</button>
    <div id="container">
      <button id="close" aria-label="Close Chat">×</button>
      <iframe id="flutter-frame" src="about:blank"></iframe>
    </div>
  `;

  const btn = shadow.getElementById('btn');
  const container = shadow.getElementById('container');
  const close = shadow.getElementById('close');
  const frame = shadow.getElementById('flutter-frame');
  let isLoaded = false;

  btn.onclick = () => {
    container.style.display = 'block';
    // Hide the toggle button when chat is open on mobile to save space
    if (window.innerWidth <= 600) btn.style.display = 'none';

    if (!isLoaded) {
      frame.src = GITHUB_URL;
      isLoaded = true;
    }
  };

  close.onclick = () => {
    container.style.display = 'none';
    btn.style.display = 'flex'; // Show button again
  };
})();
