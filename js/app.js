"serviceWorker" in navigator && window.addEventListener("load", function() {
  navigator.serviceWorker.register("/service-worker.js");
});
document.addEventListener("DOMContentLoaded", function() {
  pjax = new Pjax({
      selectors: ["title", ".app-inner", ".pjax-header"],
      cacheBust: !1
  });
});