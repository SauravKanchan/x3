function loadScript(scriptName, callback) {
  var scriptEl = document.createElement("script");
  scriptEl.src = chrome.runtime.getURL("dist/" + scriptName + ".js");
  scriptEl.addEventListener("load", callback, false);
  document.head.appendChild(scriptEl);
}
loadScript("index.bundle", function () {
  console.log("Loaded index.bundle.js");
});
