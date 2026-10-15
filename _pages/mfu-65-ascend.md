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

## Original coverage

36Kr's article features AIGCode co-founder and CTO **Qiuwu Chen**. This page summarizes the technical milestone and my role in the work.

<div class="reading-links">
  <a href="https://mp.weixin.qq.com/s/cOsJ_55UWvyR2l107xk02A" hreflang="zh" target="_blank" rel="noopener noreferrer">Chinese original · 36Kr <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
  <a href="https://www.36kr.com/p/3827372237394566" hreflang="zh" target="_blank" rel="noopener noreferrer">Read on 36Kr's website <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
</div>

[Back to Milestones]({{ '/gallery/#mfu-65-2026' | relative_url }})

</div>
