"serviceWorker" in navigator && window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  });
  document.addEventListener("DOMContentLoaded", function() {
    pjax = new Pjax({selectors:["title", ".app-inner", ".pjax-header"], cacheBust:!1, switches:{".app-inner":Pjax.switches.sideBySide}, switchesOptions:{".app-inner":{classNames:{remove:"animate__animated Animated--reverse animate__faster Animate--noDelay", add:"animate__animated", backward:"animate__fadeInRight", forward:"animate__fadeInLeft"}, callbacks:{removeElement:function(a) {
      a.style.marginLeft = "-" + a.getBoundingClientRect().width / 2 + "px";
    }}}}});
  });