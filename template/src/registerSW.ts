if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      confirm("New version is available, press OK to refresh.");
      window.location.reload();
    });
  });
}
