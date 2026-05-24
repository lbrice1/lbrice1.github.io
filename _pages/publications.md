---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

<style>
.pub-tag {
  display:inline-block; padding:2px 10px; margin:2px 4px 2px 0;
  border-radius:12px; font-size:0.72em; font-weight:600; color:#fff;
  white-space:nowrap;
}
.pub-tag--machine-learning         { background:#4e79a7; }
.pub-tag--hybrid-modeling          { background:#f28e2b; }
.pub-tag--electrochemical-systems  { background:#e15759; }
.pub-tag--ionic-separations        { background:#76b7b2; }
.pub-tag--process-monitoring       { background:#59a14f; }
.pub-tag--formulated-products      { background:#edc948; color:#555; }
.pub-tag--ai-in-industry           { background:#b07aa1; }
.pub-tag--environmental-engineering{ background:#ff9da7; color:#555; }
.pub-tag--bioanalytical            { background:#9c755f; }
.pub-filter-btn {
  border:none; cursor:pointer; opacity:0.75; transition:opacity .15s;
}
.pub-filter-btn:hover { opacity:1; }
.pub-filter-btn.active { opacity:1; outline:2px solid #333; outline-offset:2px; }
</style>

<!-- View toggle -->
<div class="pub-view-toggle" style="margin: 1em 0 1.5em;">
  <button id="btn-pub-list"
    onclick="setPubView('list')"
    style="padding:6px 16px;margin-right:6px;border:1px solid #aaa;border-radius:4px;cursor:pointer;background:#fff;font-size:0.9em;">
    ☰ List
  </button>
  <button id="btn-pub-graph"
    onclick="setPubView('graph')"
    style="padding:6px 16px;border:1px solid #aaa;border-radius:4px;cursor:pointer;background:#fff;font-size:0.9em;">
    ⬡ Graph
  </button>
</div>

<!-- Topic filter -->
<div id="pub-filter-row" style="margin:0 0 1.2em; display:flex; flex-wrap:wrap; gap:6px; align-items:center;">
  <span style="font-size:0.82em;color:#666;margin-right:4px;">Filter:</span>
  <button class="pub-tag pub-filter-btn active" data-filter="all" style="background:#666;">All</button>
  <button class="pub-tag pub-filter-btn pub-tag--machine-learning"         data-filter="machine-learning">Machine Learning</button>
  <button class="pub-tag pub-filter-btn pub-tag--hybrid-modeling"          data-filter="hybrid-modeling">Hybrid Modeling</button>
  <button class="pub-tag pub-filter-btn pub-tag--electrochemical-systems"  data-filter="electrochemical-systems">Electrochemical Systems</button>
  <button class="pub-tag pub-filter-btn pub-tag--ionic-separations"        data-filter="ionic-separations">Ionic Separations</button>
  <button class="pub-tag pub-filter-btn pub-tag--process-monitoring"       data-filter="process-monitoring">Process Monitoring</button>
  <button class="pub-tag pub-filter-btn pub-tag--formulated-products"      data-filter="formulated-products">Formulated Products</button>
  <button class="pub-tag pub-filter-btn pub-tag--ai-in-industry"           data-filter="ai-in-industry">AI in Industry</button>
  <button class="pub-tag pub-filter-btn pub-tag--environmental-engineering" data-filter="environmental-engineering">Environmental Engineering</button>
  <button class="pub-tag pub-filter-btn pub-tag--bioanalytical"            data-filter="bioanalytical">Bioanalytical</button>
</div>

<!-- List view -->
<div id="pub-list-view">
{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
</div>

<!-- Graph view -->
<div id="pub-graph-view" style="display:none;">
  <p style="font-size:0.85em;color:#666;margin-bottom:0.5em;">
    Publications (circles) linked to research areas (labeled nodes).
    Hover for details &middot; click to open &middot; scroll to zoom &middot; drag to pan.
  </p>
  <div id="pub-graph-container" style="border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;"></div>
</div>

<!-- Publication data for graph -->
<script>
window.pubsData = [
  {% for post in site.publications reversed %}
  {
    "title": {{ post.title | jsonify }},
    "year": "{{ post.date | default: '' | date: '%Y' }}",
    "venue": {{ post.venue | default: '' | jsonify }},
    "url": "{{ post.url }}",
    "topics": {{ post.topics | default: '' | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];
</script>

<!-- D3 + graph -->
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="{{ base_path }}/assets/js/pub-graph.js"></script>
<script>
var _graphInitialized = false;
function setPubView(view) {
  var listEl  = document.getElementById('pub-list-view');
  var graphEl = document.getElementById('pub-graph-view');
  var btnList  = document.getElementById('btn-pub-list');
  var btnGraph = document.getElementById('btn-pub-graph');
  if (view === 'graph') {
    listEl.style.display  = 'none';
    graphEl.style.display = 'block';
    btnList.style.background  = '#fff';
    btnList.style.fontWeight  = 'normal';
    btnGraph.style.background = '#e8f0fe';
    btnGraph.style.fontWeight = '600';
    if (!_graphInitialized && window.initPubGraph && window.pubsData) {
      initPubGraph('#pub-graph-container', window.pubsData);
      _graphInitialized = true;
    }
  } else {
    listEl.style.display  = 'block';
    graphEl.style.display = 'none';
    btnList.style.background  = '#e8f0fe';
    btnList.style.fontWeight  = '600';
    btnGraph.style.background = '#fff';
    btnGraph.style.fontWeight = 'normal';
  }
}
// Default: highlight List button
setPubView('list');

// Topic filter
document.querySelectorAll('.pub-filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var filter = this.dataset.filter;
    document.querySelectorAll('.pub-filter-btn')
      .forEach(function(b) { b.classList.remove('active'); });
    this.classList.add('active');
    document.querySelectorAll('#pub-list-view .list__item').forEach(function(item) {
      if (filter === 'all') {
        item.style.display = '';
      } else {
        var topics = (item.dataset.topics || '').split(' ');
        item.style.display = topics.indexOf(filter) !== -1 ? '' : 'none';
      }
    });
  });
});
</script>
