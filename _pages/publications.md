---
layout: page
permalink: /publications/
title: Publications
description: Talks, media coverage, and research papers.
nav: true
nav_order: 2
scholar:
  bibliography_group_tag: h3
---

<!-- _pages/publications.md -->

<nav class="page-section-links" aria-label="Publication sections">
  <a href="#public-talks">Talks &amp; Media</a>
  <a href="#papers">Papers <span aria-hidden="true">&darr;</span></a>
</nav>

<section id="public-talks" class="public-talks" aria-labelledby="public-talks-title">
  <h2 id="public-talks-title">Talks &amp; Media</h2>

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
        <div class="reading-links">
          <a href="{{ '/talks/communication-aware-moe-training/' | relative_url }}">English overview</a>
          <a href="https://mp.weixin.qq.com/s/tvtTHvvBlF8Kzuc21OJSKw" hreflang="zh" target="_blank" rel="noopener noreferrer">Chinese original <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        </div>
      </div>
    </article>

    <article id="mfu-65-media" class="public-talk-card">
      <div class="public-talk-meta">
        <span class="public-talk-date">May 2026</span>
        <span class="public-talk-type">Media Coverage</span>
      </div>
      <div class="public-talk-content">
        <h3>
          <a href="{{ '/highlights/mfu-65-ascend/' | relative_url }}">65% MFU on Ascend</a>
        </h3>
        <div class="public-talk-context">
          <span>AIGCode</span>
          <span>MoE pre-training on Ascend NPUs</span>
        </div>
        <div class="reading-links">
          <a href="{{ '/highlights/mfu-65-ascend/' | relative_url }}">English overview</a>
          <a href="{{ '/highlights/mfu-65-ascend/#media-coverage' | relative_url }}">3 media reports</a>
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

    <article id="hdc-2025-showcase" class="public-talk-card">
      <div class="public-talk-meta">
        <span class="public-talk-date">Jun 2025</span>
        <span class="public-talk-type">Conference Showcase</span>
      </div>
      <div class="public-talk-content">
        <h3>
          <a href="https://live.huawei.com/hdc2025/meeting/cn/15569.html" hreflang="zh" target="_blank" rel="noopener noreferrer">Ascend NPU User-Space Virtualization and MoE Memory Offloading</a>
        </h3>
        <div class="public-talk-context">
          <span>Huawei Developer Conference 2025</span>
          <span>Huawei Cloud</span>
        </div>
        <p>Featured in Huawei Cloud's product launch session. See around 50 minutes into the recording.</p>
        <div class="reading-links">
          <a href="https://live.huawei.com/hdc2025/meeting/cn/15569.html" hreflang="zh" target="_blank" rel="noopener noreferrer">Watch recording (Chinese) <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        </div>
      </div>
    </article>
  </div>
</section>

<section id="papers" class="publications" aria-labelledby="papers-title">
  <h2 id="papers-title">Research papers</h2>

{% bibliography %}

</section>
