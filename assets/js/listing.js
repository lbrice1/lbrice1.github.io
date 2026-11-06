/* listing.js: topic filter (synced with ?topic=) and list/graph switch for listing pages. */
(function () {
  "use strict";
  var controls = document.querySelector(".listing-controls");
  var listing = document.querySelector(".listing");
  if (!controls || !listing) return;
  var graph = document.querySelector(".graph");
  var empty = listing.querySelector(".listing__empty");
  var filterButtons = controls.querySelectorAll("[data-filter]");
  var viewButtons = controls.querySelectorAll("[data-view]");
  var graphReady = false;

  function applyFilter(topic, updateUrl) {
    var known = Array.prototype.some.call(filterButtons, function (b) { return b.dataset.filter === topic; });
    if (!known) topic = "all";
    filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === topic)); });
    var shown = 0;
    listing.querySelectorAll(".year-group").forEach(function (group) {
      var groupShown = 0;
      group.querySelectorAll(".entry").forEach(function (item) {
        var match = topic === "all" || (item.dataset.topics || "").split(" ").indexOf(topic) !== -1;
        item.hidden = !match;
        if (match) groupShown++;
      });
      group.hidden = groupShown === 0;
      shown += groupShown;
    });
    if (empty) empty.hidden = shown !== 0;
    if (updateUrl) {
      var url = new URL(window.location.href);
      if (topic === "all") url.searchParams.delete("topic"); else url.searchParams.set("topic", topic);
      history.replaceState(null, "", url);
    }
  }

  function setView(view) {
    viewButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.view === view)); });
    var isGraph = view === "graph";
    listing.hidden = isGraph;
    controls.querySelector(".filter").hidden = isGraph;
    if (graph) graph.hidden = !isGraph;
    if (isGraph && !graphReady && window.initPubGraph) {
      var data = JSON.parse(document.querySelector(".graph-data").textContent);
      window.initPubGraph(graph.querySelector(".graph__canvas"), data);
      graphReady = true;
    }
  }

  filterButtons.forEach(function (b) { b.addEventListener("click", function () { applyFilter(b.dataset.filter, true); }); });
  viewButtons.forEach(function (b) { b.addEventListener("click", function () { setView(b.dataset.view); }); });
  applyFilter(new URLSearchParams(window.location.search).get("topic") || "all", false);
})();
