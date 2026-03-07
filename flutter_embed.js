(function () {

  window.FlutterEmbed = {

    init: function (config) {

      const container = (typeof config.container === 'string') 
      ? document.getElementById(config.container) 
      : config.container;

      if (!container) {
        console.error("Container not found");
        return;
      }

      const appUrl = config.appUrl;

      const flutterScript = document.createElement("script");
      flutterScript.src = appUrl + "flutter.js";

      flutterScript.onload = function () {

        _flutter.loader.loadEntrypoint({
          entrypointUrl: appUrl + "main.dart.js",

          onEntrypointLoaded: async function (engineInitializer) {

            const appRunner = await engineInitializer.initializeEngine({
              hostElement: container
            });

            await appRunner.runApp();
          }
        });

      };

      document.body.appendChild(flutterScript);
    }

  };

})();
