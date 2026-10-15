---
layout: page
permalink: /highlights/mfu-65-ascend/
title: 65% MFU on Ascend
description: Training-system optimization at AIGCode · 2026
nav: false
---

<div class="reading-summary" markdown="1">

<p class="reading-kicker">English overview</p>

At AIGCode, I led training-system optimization for mixture-of-experts (MoE) pre-training on Ascend NPUs. The team achieved **65% Model FLOPs Utilization (MFU)**, a result highlighted in 36Kr's coverage of China's AI computing ecosystem.

MFU measures how much of the available theoretical compute is used for model computation during training. In distributed MoE workloads, communication, synchronization, scheduling, and uneven expert workloads all affect that efficiency.

## The work behind the result

The coverage describes two complementary directions: coordinating communication and computation to reduce time spent waiting, and optimizing low-level kernels through tuning and fusion. These efforts draw on the Ascend CANN software stack and close collaboration across the hardware and software ecosystem.

The reported 65% was achieved for a specific customer workload, with its particular algorithm, model, and cluster configuration.

## Media coverage

The articles below discuss AIGCode's work and the wider Ascend ecosystem. The 36Kr interview features AIGCode co-founder and CTO **Qiuwu Chen**. Original articles are in Chinese; English titles are provided below.

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
    <h3>Behind DeepSeek V4's chip–model co-design: China's computing ecosystem gains momentum</h3>
    <div class="reading-links">
      <a href="https://mp.weixin.qq.com/s/ksXbco0s1zThgP_V3vr4lA" hreflang="zh" target="_blank" rel="noopener noreferrer">Chinese original <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    </div>
  </li>
</ol>

[Back to Milestones]({{ '/gallery/#mfu-65-2026' | relative_url }})

</div>
