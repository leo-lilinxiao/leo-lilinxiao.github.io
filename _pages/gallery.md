---
layout: page
permalink: /gallery/
title: Gallery
description: Research milestones and memories along the way.
nav: true
nav_order: 4
gallery_timeline: true
---

<div class="gallery-tabs" role="tablist" aria-label="Gallery sections">
  <a id="tab-milestones" role="tab" href="#milestones" data-gallery-tab="milestones" aria-controls="gallery-milestones-panel" aria-selected="true">Milestones</a>
  <a id="tab-life" role="tab" href="#life" data-gallery-tab="life" aria-controls="gallery-life-panel" aria-selected="false" tabindex="-1">Along the way</a>
</div>

<section id="gallery-milestones-panel" data-gallery-section="milestones" class="gallery-section" role="tabpanel" aria-labelledby="tab-milestones">
<p class="gallery-guide">Newest first <span aria-hidden="true">·</span> Click photos to enlarge</p>
{% include gallery_river.liquid events=site.data.gallery label="Milestones, newest first" prioritize_first_row=true %}
</section>

<section id="gallery-life-panel" data-gallery-section="life" class="gallery-section" role="tabpanel" aria-labelledby="tab-life" hidden>
  <div class="gallery-life-intro">
    <p>Years later, I still remember the sunsets we shared and the kindness in ordinary days. To the teachers and friends who shared the journey: thank you.</p>
    <p lang="zh">多年以后，仍记得一起看过的晚霞，和平常日子里的善意。谨以这些片刻，感谢一路相逢的师友。</p>
  </div>
  <p class="gallery-guide">Newest first <span aria-hidden="true">·</span> Open an album</p>
  {% include gallery_river.liquid events=site.data.gallery_life label="Life albums, newest first" %}
</section>

<noscript><style>.gallery-tabs { display: none; } .gallery-section[hidden] { display: block; margin-top: 3rem; }</style></noscript>

<dialog class="gallery-lightbox" aria-label="Gallery image viewer">
  <div class="gallery-lightbox-toolbar">
    <span class="gallery-lightbox-counter" aria-live="polite"></span>
    <button class="gallery-lightbox-close" type="button" aria-label="Close image viewer"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
  </div>
  <div class="gallery-lightbox-stage">
    <button class="gallery-lightbox-prev" type="button" aria-label="Previous photo"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
    <div class="gallery-lightbox-viewport" tabindex="0" aria-label="Photo carousel. Use left and right arrow keys to browse."></div>
    <button class="gallery-lightbox-next" type="button" aria-label="Next photo"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
  </div>
  <div class="gallery-lightbox-footer">
    <p class="gallery-lightbox-hint">Swipe or use the arrows to browse</p>
    <div class="gallery-lightbox-thumbnails" aria-label="Choose a photo"></div>
    <p class="gallery-lightbox-caption"></p>
    <a class="gallery-lightbox-original" target="_blank" rel="noopener noreferrer">Open full-size photo <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
  </div>
</dialog>
