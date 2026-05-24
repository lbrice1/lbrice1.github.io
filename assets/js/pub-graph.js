/* pub-graph.js — D3 v7 force-directed publications graph */
(function () {

  var TOPIC_LABELS = {
    "machine-learning":        "Machine Learning",
    "hybrid-modeling":         "Hybrid & Physics-Informed Modeling",
    "electrochemical-systems": "Electrochemical Systems",
    "ionic-separations":       "Ionic Separations",
    "process-monitoring":      "Process Monitoring",
    "formulated-products":     "Formulated Products",
    "ai-in-industry":          "AI in Industry",
    "environmental-engineering":"Environmental Engineering",
    "bioanalytical":           "Bioanalytical Methods"
  };

  // Ordered so the legend and color mapping is deterministic
  var TOPIC_ORDER = Object.keys(TOPIC_LABELS);

  var COLOR = d3.scaleOrdinal()
    .domain(TOPIC_ORDER)
    .range(d3.schemeTableau10);

  window.initPubGraph = function (containerSel, pubsData) {
    var container = document.querySelector(containerSel);
    if (!container) return;

    var W = container.clientWidth || 900;
    var H = Math.max(560, Math.round(W * 0.65));

    // ── Build nodes & links ────────────────────────────────────────────────
    var topicSet = new Set();
    pubsData.forEach(function (p) {
      (p.topics || []).forEach(function (t) { topicSet.add(t); });
    });

    var nodes = [];
    var topicNodes = {};

    // Topic nodes first so they render behind pubs
    topicSet.forEach(function (tid) {
      var node = { id: "t_" + tid, kind: "topic", tid: tid,
                   label: TOPIC_LABELS[tid] || tid };
      nodes.push(node);
      topicNodes[tid] = node;
    });

    // Publication nodes
    var pubNodes = pubsData.map(function (p, i) {
      var primaryTopic = (p.topics && p.topics[0]) || null;
      return { id: "p_" + i, kind: "pub", data: p, primaryTopic: primaryTopic };
    });
    nodes = nodes.concat(pubNodes);

    // Links
    var links = [];
    pubNodes.forEach(function (pn) {
      (pn.data.topics || []).forEach(function (tid) {
        if (topicNodes[tid]) {
          links.push({ source: pn.id, target: "t_" + tid });
        }
      });
    });

    // ── SVG setup ─────────────────────────────────────────────────────────
    d3.select(containerSel).select("svg").remove();

    var svg = d3.select(containerSel).append("svg")
      .attr("width", "100%")
      .attr("height", H)
      .style("font-family", "inherit");

    var g = svg.append("g");

    svg.call(d3.zoom()
      .scaleExtent([0.3, 4])
      .on("zoom", function (event) { g.attr("transform", event.transform); }));

    // ── Force simulation ───────────────────────────────────────────────────
    var nodeMap = {};
    nodes.forEach(function (n) { nodeMap[n.id] = n; });

    var sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links)
        .id(function (d) { return d.id; })
        .distance(function (d) {
          return d.source.kind === "topic" || d.target.kind === "topic" ? 100 : 60;
        })
        .strength(0.6))
      .force("charge", d3.forceManyBody().strength(function (d) {
        return d.kind === "topic" ? -900 : -120;
      }))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius(function (d) {
        return d.kind === "topic" ? 50 : 12;
      }))
      .alphaDecay(0.025);

    // ── Links ──────────────────────────────────────────────────────────────
    var linkSel = g.append("g").attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", function (d) {
        var tid = (d.target.tid || (d.target.id && d.target.id.replace("t_", "")));
        return COLOR(tid);
      })
      .attr("stroke-opacity", 0.35)
      .attr("stroke-width", 1.2);

    // ── Topic nodes ────────────────────────────────────────────────────────
    var topicSel = g.append("g").attr("class", "topic-nodes")
      .selectAll("g")
      .data(nodes.filter(function (d) { return d.kind === "topic"; }))
      .join("g")
      .attr("class", "topic-node")
      .style("cursor", "default");

    topicSel.append("circle")
      .attr("r", 22)
      .attr("fill", function (d) { return COLOR(d.tid); })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("fill-opacity", 0.9);

    topicSel.append("text")
      .text(function (d) { return d.label; })
      .attr("text-anchor", "middle")
      .attr("dy", "2.8em")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("fill", "#333")
      .style("pointer-events", "none");

    // ── Publication nodes ──────────────────────────────────────────────────
    var pubSel = g.append("g").attr("class", "pub-nodes")
      .selectAll("circle")
      .data(pubNodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", function (d) {
        return d.primaryTopic ? COLOR(d.primaryTopic) : "#aaa";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("fill-opacity", 0.85)
      .style("cursor", "pointer");

    // ── Tooltip ────────────────────────────────────────────────────────────
    var tooltip = d3.select("body").append("div")
      .attr("id", "pub-graph-tooltip")
      .style("position", "absolute")
      .style("background", "rgba(255,255,255,0.97)")
      .style("border", "1px solid #ccc")
      .style("border-radius", "6px")
      .style("padding", "8px 12px")
      .style("font-size", "12px")
      .style("line-height", "1.5")
      .style("max-width", "280px")
      .style("box-shadow", "0 2px 8px rgba(0,0,0,0.15)")
      .style("pointer-events", "none")
      .style("display", "none")
      .style("z-index", "9999");

    pubSel
      .on("mouseover", function (event, d) {
        d3.select(this).attr("r", 11).attr("stroke-width", 2.5);
        var year = d.data.year || "";
        var venue = d.data.venue || "";
        tooltip
          .style("display", "block")
          .html("<strong>" + d.data.title + "</strong><br/>"
              + (year ? year + " &middot; " : "")
              + "<em>" + venue + "</em>");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", (event.pageX + 14) + "px")
          .style("top",  (event.pageY - 28) + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 8).attr("stroke-width", 1.5);
        tooltip.style("display", "none");
      })
      .on("click", function (event, d) {
        if (d.data.url) window.location.href = d.data.url;
      });

    // ── Drag ──────────────────────────────────────────────────────────────
    function dragged(event, d) {
      d.fx = event.x; d.fy = event.y;
    }
    function dragStarted(event, d) {
      if (!event.active) sim.alphaTarget(0.3).restart();
      d.fx = d.x; d.fy = d.y;
    }
    function dragEnded(event, d) {
      if (!event.active) sim.alphaTarget(0);
      d.fx = null; d.fy = null;
    }

    pubSel.call(d3.drag()
      .on("start", dragStarted)
      .on("drag",  dragged)
      .on("end",   dragEnded));

    topicSel.call(d3.drag()
      .on("start", dragStarted)
      .on("drag",  dragged)
      .on("end",   dragEnded));

    // ── Tick ──────────────────────────────────────────────────────────────
    sim.on("tick", function () {
      linkSel
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

      topicSel.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

      pubSel
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
    });

    // ── Legend ─────────────────────────────────────────────────────────────
    var presentTopics = Array.from(topicSet);
    var lgd = svg.append("g")
      .attr("class", "pub-legend")
      .attr("transform", "translate(14, 14)");

    lgd.append("rect")
      .attr("x", -6).attr("y", -6)
      .attr("width", 210).attr("height", presentTopics.length * 20 + 10)
      .attr("rx", 6)
      .attr("fill", "rgba(255,255,255,0.88)")
      .attr("stroke", "#ddd");

    presentTopics.forEach(function (tid, i) {
      var row = lgd.append("g").attr("transform", "translate(0," + (i * 20) + ")");
      row.append("circle").attr("r", 7).attr("cx", 7).attr("cy", 7)
        .attr("fill", COLOR(tid));
      row.append("text")
        .attr("x", 20).attr("y", 11.5)
        .attr("font-size", "11px")
        .attr("fill", "#444")
        .text(TOPIC_LABELS[tid] || tid);
    });

    // ── Hint text ─────────────────────────────────────────────────────────
    svg.append("text")
      .attr("x", W - 10).attr("y", H - 8)
      .attr("text-anchor", "end")
      .attr("font-size", "10px")
      .attr("fill", "#999")
      .text("Scroll to zoom · Drag to pan or move nodes · Click a node to open publication");
  };

})();
