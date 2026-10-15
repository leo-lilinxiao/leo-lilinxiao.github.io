---
layout: page
permalink: /publications/
title: Publications
description: Publications in chronological order, followed by public talks.
nav: true
nav_order: 3
---

<!-- _pages/publications.md -->

<nav class="page-section-links" aria-label="Publication sections">
  <a href="#papers">Papers</a>
  <a href="#public-talks">Public Talks <span aria-hidden="true">&darr;</span></a>
</nav>

<div id="papers" class="publications">

{% bibliography %}

</div>

<section id="public-talks" class="public-talks" aria-labelledby="public-talks-title">
  <h2 id="public-talks-title">Public Talks</h2>

  <div class="public-talk-list">
    <article class="public-talk-card public-talk-featured">
      <div class="public-talk-meta">
        <span class="public-talk-date">Jun 2026</span>
        <span class="public-talk-type">Academic Seminar</span>
      </div>
      <div class="public-talk-content">
        <h3>
          <a href="{{ '/talks/communication-aware-moe-training/' | relative_url }}">Communication-Aware Scheduling Optimization for Large-Scale MoE Model Training on Ascend NPUs</a>
        </h3>
        <div class="public-talk-context">
          <span>Frontiers Series</span>
          <span>Guangming Laboratory</span>
        </div>
        <p>Academic seminar on communication-aware scheduling optimization for large-scale MoE model training on Ascend NPUs.</p>
        <div class="reading-links">
          <a href="{{ '/talks/communication-aware-moe-training/' | relative_url }}">English overview</a>
          <a href="https://mp.weixin.qq.com/s/tvtTHvvBlF8Kzuc21OJSKw" hreflang="zh" target="_blank" rel="noopener noreferrer">Chinese original <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        </div>
      </div>
    </article>

    <article class="public-talk-card">
      <div class="public-talk-meta">
        <span class="public-talk-date">Apr 2026</span>
        <span class="public-talk-type">Technical Talk</span>
      </div>
      <div class="public-talk-content">
        <h3>
          <a href="https://www.bilibili.com/video/BV1sCoLBtE3f?t=1256.3" target="_blank" rel="noopener noreferrer">DeepSeek-V4 Mechanism Deep Dive</a>
        </h3>
        <div class="public-talk-context">
          <span>Internal Technical Sharing</span>
          <span>AIGCode</span>
        </div>
        <p>Company technical interpretation and discussion of DeepSeek-V4 mechanism details.</p>
      </div>
    </article>

    <article class="public-talk-card">
      <div class="public-talk-meta">
        <span class="public-talk-date">Dec 2025</span>
        <span class="public-talk-type">Invited Talk</span>
      </div>
      <div class="public-talk-content">
        <h3>
          <a href="https://www.gml.ac.cn/" target="_blank" rel="noopener noreferrer">Research Methodology, Internship Planning, and Career Development</a>
        </h3>
        <div class="public-talk-context">
          <span>Graduate Career Workshop</span>
          <span>Guangming Laboratory</span>
        </div>
        <p>Invited talk for graduate students on research methodology, internship planning, and career development.</p>
      </div>
    </article>
  </div>
</section>
