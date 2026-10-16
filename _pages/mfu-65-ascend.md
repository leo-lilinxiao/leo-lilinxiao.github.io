---
layout: reading
permalink: /highlights/mfu-65-ascend/
title: 65% MFU on Ascend
description: Training-system optimization at AIGCode · 2026
nav: false
back_link:
  label: Back to Milestones
  url: /gallery/#mfu-65-2026
nav_parent: /gallery/
feature:
  kind: result
  eyebrow: A training milestone
  value: 65%
  title: MFU on Ascend
  caption: From communication scheduling to kernel tuning.
  image: /assets/img/reading/mfu-ribbons.webp
---

<div class="reading-overview">
  <div class="reading-intro">
    <p class="reading-eyebrow">The result, in brief</p>
    <p class="reading-lead">At AIGCode, I <mark>led our training optimization</mark> for a customer MoE pre-training workload on Ascend NPUs. Our team reached <strong>65% Model FLOPs Utilization</strong>. 36Kr and QbitAI reported the result in their coverage of the Ascend ecosystem.</p>
  </div>
  <aside class="reading-note" aria-labelledby="mfu-note-title">
    <span class="reading-note-icon" aria-hidden="true"><i class="fa-solid fa-lightbulb"></i></span>
    <h2 id="mfu-note-title">MFU, in a sentence</h2>
    <p>Achieved training throughput divided by the theoretical throughput for the model’s forward and backward passes at peak hardware FLOP/s.</p>
  </aside>
</div>

<section class="reading-section" aria-labelledby="optimization-heading">
  <p class="reading-eyebrow">Behind the number</p>
  <h2 id="optimization-heading">How we improved training</h2>
  <ol class="reading-paths">
    <li>
      <span class="reading-path-number" aria-hidden="true">01</span>
      <div>
        <h3>Less time waiting</h3>
        <p><mark>Coordinate communication and computation</mark> to reduce waiting across distributed MoE training. Synchronization, scheduling, and uneven expert workloads all affect efficiency.</p>
      </div>
    </li>
    <li>
      <span class="reading-path-number" aria-hidden="true">02</span>
      <div>
        <h3>Faster kernel execution</h3>
        <p>Improve low-level execution through <mark>kernel tuning and fusion</mark>, drawing on the Ascend CANN software stack and close collaboration across the hardware and software ecosystem.</p>
      </div>
    </li>
  </ol>
</section>

<section class="reading-section" aria-labelledby="media-coverage">
<p class="reading-eyebrow">Further reading</p>
<h2 id="media-coverage">In the press</h2>
<p>These three reports cover AIGCode and the Ascend ecosystem, including comments from co-founder and CTO <strong>Qiuwu Chen</strong> at a developer roundtable. English titles accompany the Chinese originals below.</p>

<ol class="reading-coverage">
  <li>
    <p class="reading-coverage-meta">TMTPost · <time datetime="2026-05-26">26 May 2026</time></p>
    <h3>The geeks committed to Kunpeng and Ascend have big plans</h3>
    <div class="reading-links">
      <a href="https://mp.weixin.qq.com/s/qBgRA64NbJiMru9dTlhS9g" hreflang="zh" target="_blank" rel="noopener noreferrer">Chinese original <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      <a href="https://www.tmtpost.com/8001466.html" hreflang="zh" target="_blank" rel="noopener noreferrer">Publisher website <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    </div>
  </li>
  <li>
    <p class="reading-coverage-meta">36Kr · <time datetime="2026-05-27">27 May 2026</time></p>
    <h3>From infancy to adolescence: China's computing ecosystem through four developers' eyes</h3>
    <div class="reading-links">
      <a href="https://mp.weixin.qq.com/s/cOsJ_55UWvyR2l107xk02A" hreflang="zh" target="_blank" rel="noopener noreferrer">Chinese original <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      <a href="https://www.36kr.com/p/3827372237394566" hreflang="zh" target="_blank" rel="noopener noreferrer">Publisher website <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    </div>
  </li>
  <li>
    <p class="reading-coverage-meta">QbitAI · <time datetime="2026-05-28">28 May 2026</time></p>
    <h3>Behind DeepSeek V4's joint chip and model design: China's computing ecosystem gains momentum</h3>
    <div class="reading-links">
      <a href="https://mp.weixin.qq.com/s/ksXbco0s1zThgP_V3vr4lA" hreflang="zh" target="_blank" rel="noopener noreferrer">Chinese original <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      <a href="https://www.qbitai.com/2026/05/426293.html" hreflang="zh" target="_blank" rel="noopener noreferrer">Publisher website <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    </div>
  </li>
</ol>

</section>
