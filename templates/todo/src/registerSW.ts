if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
  window.addEventListener("load", () => {
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      // if (confirm("New version is available, press OK to refresh.")) {
      //   window.location.reload();
      // }
    });
  });
}
