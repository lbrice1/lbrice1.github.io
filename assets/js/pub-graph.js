/* pub-graph.js: force-directed graph of publications or talks linked to topics (d3 v7).
 * Colors come from the topic data (_data/topics.yml); strokes and text use CSS classes,
 * so the graph follows the light and dark themes. */
(function () {
  "use strict";

  window.initPubGraph = function (container, data) {
    if (!container || !window.d3) return;
    var topicInfo = {};
    data.topics.forEach(function (t) { topicInfo[t.key] = t; });
    var color = function (key) { return (topicInfo[key] && topicInfo[key].color) || "#8a8f98"; };

    var W = container.clientWidth || 900;
    var H = Math.max(480, Math.min(720, Math.round(W * 0.62)));

    // Nodes and links
    var used = new Set();
    data.items.forEach(function (p) { (p.topics || []).forEach(function (t) { used.add(t); }); });
    var topicNodes = Array.from(used).map(function (key) {
      return { id: "t_" + key, kind: "topic", key: key, label: (topicInfo[key] && topicInfo[key].label) || key };
    });
    var itemNodes = data.items.map(function (p, i) {
      return { id: "p_" + i, kind: "item", data: p, primary: (p.topics && p.topics[0]) || null };
    });
    var links = [];
    itemNodes.forEach(function (n) {
      (n.data.topics || []).forEach(function (key) { links.push({ source: n.id, target: "t_" + key, key: key }); });
    });
    var nodes = topicNodes.concat(itemNodes);

    d3.select(container).selectAll("*").remove();
    var svg = d3.select(container).append("svg")
      .attr("class", "graph__svg")
      .attr("viewBox", [0, 0, W, H])
      .attr("width", "100%")
      .attr("height", H)
      .attr("role", "img")
      .attr("aria-label", "Graph of " + data.items.length + " items linked to " + topicNodes.length + " topics");
    var g = svg.append("g");
    svg.call(d3.zoom().scaleExtent([0.4, 4]).on("zoom", function (event) { g.attr("transform", event.transform); }));

    var sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(function (d) { return d.id; }).distance(90).strength(0.55))
      .force("charge", d3.forceManyBody().strength(function (d) { return d.kind === "topic" ? -800 : -110; }))
      .force("center", d3.forceCenter(W / 2, H / 2))
      // Pull disconnected topics (one or two items) back toward the middle.
      .force("x", d3.forceX(W / 2).strength(0.07))
      .force("y", d3.forceY(H / 2).strength(0.09))
      .force("collide", d3.forceCollide().radius(function (d) { return d.kind === "topic" ? 46 : 11; }))
      .alphaDecay(0.03);

    var linkSel = g.append("g").attr("class", "graph__links").selectAll("line").data(links).join("line")
      .attr("stroke", function (d) { return color(d.key); });

    var topicSel = g.append("g").selectAll("g").data(topicNodes).join("g").attr("class", "graph__topic");
    topicSel.append("circle").attr("r", 18).attr("fill", function (d) { return color(d.key); });
    topicSel.append("text").attr("class", "graph__label").attr("text-anchor", "middle").attr("dy", "2.6em")
      .text(function (d) { return d.label; });

    var itemSel = g.append("g").selectAll("circle").data(itemNodes).join("circle")
      .attr("class", "graph__item")
      .attr("r", 7)
      .attr("tabindex", 0)
      .attr("role", "link")
      .attr("aria-label", function (d) { return d.data.title + ", " + d.data.year; })
      .attr("fill", function (d) { return color(d.primary); });

    // Tooltip, positioned inside the container
    var tip = d3.select(container).append("div").attr("class", "graph__tip").attr("hidden", true);
    function show(event, d) {
      tip.selectAll("*").remove();
      tip.append("strong").text(d.data.title);
      tip.append("span").text((d.data.year ? d.data.year + " · " : "") + (d.data.venue || ""));
      var box = container.getBoundingClientRect();
      var x = event.clientX !== undefined && event.clientX ? event.clientX - box.left : d.x;
      var y = event.clientY !== undefined && event.clientY ? event.clientY - box.top : d.y;
      tip.style("left", Math.min(x + 14, W - 280) + "px").style("top", Math.max(y - 12, 0) + "px").attr("hidden", null);
    }
    function hide() { tip.attr("hidden", true); }
    function open(d) { if (d.data.url) window.location.href = d.data.url; }
    itemSel
      .on("mouseenter", show).on("mousemove", show).on("mouseleave", hide)
      .on("focus", show).on("blur", hide)
      .on("click", function (event, d) { open(d); })
      .on("keydown", function (event, d) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(d); } });

    function drag() {
      return d3.drag()
        .on("start", function (event, d) { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", function (event, d) { d.fx = event.x; d.fy = event.y; })
        .on("end", function (event, d) { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; });
    }
    itemSel.call(drag());
    topicSel.call(drag());

    var pad = 40;
    sim.on("tick", function () {
      nodes.forEach(function (d) {
        d.x = Math.max(pad, Math.min(W - pad, d.x));
        d.y = Math.max(pad, Math.min(H - pad, d.y));
      });
      linkSel.attr("x1", function (d) { return d.source.x; }).attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; }).attr("y2", function (d) { return d.target.y; });
      topicSel.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
      itemSel.attr("cx", function (d) { return d.x; }).attr("cy", function (d) { return d.y; });
    });
  };
})();
