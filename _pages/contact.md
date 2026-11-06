---
layout: wide
permalink: /contact/
title: "Contact"
---
<div class="contact">
  <div>
    <h2>Email</h2>
    <p class="contact__email">{% include icons/email.svg %} {% include email.html %}</p>
    <h2>Affiliation</h2>
    <p><a href="https://dais.princeton.edu">{{ site.author.affiliation }}</a><br>{{ site.author.institution }}<br>{{ site.author.location }}</p>
  </div>
  <div>
    <h2>Profiles</h2>
    {% include profile-links.html %}
  </div>
</div>
