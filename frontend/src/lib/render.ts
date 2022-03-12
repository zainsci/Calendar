(function () {
  const { remote } = require("electron");

  function init() {
    document
      .getElementById("minimizeWindow")
      .addEventListener("click", function (e) {
        var window = remote.getCurrentWindow();
        window.minimize();
      });

    document
      .getElementById("closeWindow")
      .addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.close();
      });
  }

  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      init();
    }
  };
})();
