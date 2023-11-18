function loadScript(scriptName, callback) {
  var scriptEl = document.createElement("script");
  scriptEl.src = chrome.runtime.getURL("dist/" + scriptName + ".js");
  scriptEl.addEventListener("load", callback, false);
  document.head.appendChild(scriptEl);
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(request);
// if (request.message === "backgroundReady") {
loadScript("index.bundle", function () {
  console.log("Loaded index.bundle.js");
});
// }
// });
