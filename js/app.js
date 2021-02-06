"serviceWorker" in navigator && window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  });
  document.addEventListener("DOMContentLoaded", function() {
    pjax = new Pjax({selectors:["title", ".app-inner", ".pjax-header"], cacheBust:!1, switches:{".app-inner":Pjax.switches.sideBySide}, switchesOptions:{".app-inner":{classNames:{remove:"Animated Animated--reverse Animate--fast Animate--noDelay", add:"Animated", backward:"Animate--slideInRight", forward:"Animate--slideInLeft"}, callbacks:{removeElement:function(a) {
      a.style.marginLeft = "-" + a.getBoundingClientRect().width / 2 + "px";
    }}}}});
  });