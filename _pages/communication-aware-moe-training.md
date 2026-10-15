---
layout: reading
permalink: /talks/communication-aware-moe-training/
title: Communication-Aware Scheduling Optimization for Large-Scale MoE Model Training on Ascend NPUs
description: Frontiers Series · Guangming Laboratory · 3 June 2026
nav: false
back_link:
  label: Back to Public Talks
  url: /publications/#public-talks
nav_parent: /publications/
feature:
  kind: talk
  eyebrow: Inside the training system
  value: CARD
  title: Communication-aware MoE training
  caption: Scheduling the work of a training step.
  image: /assets/img/reading/card-ribbons.webp
---

<div class="reading-overview">
  <div class="reading-intro">
    <p class="reading-eyebrow">The idea, in brief</p>
    <p class="reading-lead">In this talk, I describe <strong>CARD</strong>, our approach to improving MoE training on Ascend NPU clusters. We use <mark>training logs and profiling</mark> to find where waiting and repeated computation slow a training step.</p>
  </div>
  <aside class="reading-note" aria-labelledby="seminar-note-title">
    <span class="reading-note-icon" aria-hidden="true"><i class="fa-solid fa-microphone"></i></span>
    <h2 id="seminar-note-title">From a public talk</h2>
    <p><strong>Linxiao Li</strong> · AIGCode<br>Frontiers Series<br>Guangming Laboratory</p>
  </aside>
</div>

<section class="reading-section" aria-labelledby="topics-heading">
  <p class="reading-eyebrow">A closer look</p>
  <h2 id="topics-heading">Four optimization areas</h2>
  <ol class="reading-paths reading-paths-grid">
    <li>
      <span class="reading-path-number" aria-hidden="true">01</span>
      <div>
        <p class="reading-path-label">Communication</p>
        <h3>Coordinate communication and computation</h3>
        <p>CARD schedules the full MoE layer in one framework, covering token dispatch, expert computation, the return of expert outputs, shared experts, and the backward pass. This reduces communication exposed on the <mark>critical path</mark>.</p>
      </div>
    </li>
    <li>
      <span class="reading-path-number" aria-hidden="true">02</span>
      <div>
        <p class="reading-path-label">Expert computation</p>
        <h3>Streamline expert computation and backpropagation</h3>
        <p>For grouped matrix multiplication, activations, and routing probability calculations inside MoE experts, CARD reduces the intermediate tensors saved by standard autograd and its backward scheduling overhead. <mark>Selected paths use direct gradient computation and accumulation</mark> to reduce redundant computation and device memory use.</p>
      </div>
    </li>
    <li>
      <span class="reading-path-number" aria-hidden="true">03</span>
      <div>
        <p class="reading-path-label">Output &amp; loss</p>
        <h3>Optimize the output layer and loss</h3>
        <p>For the LM head and loss, CARD combines <mark>chunked loss computation</mark>, output-layer gradient accumulation, and matrix accumulation on the NPU. Together, they preserve the loss result and reduce intermediate buffers and repeated matrix multiplications in the backward pass of large matrix operations.</p>
      </div>
    </li>
    <li>
      <span class="reading-path-number" aria-hidden="true">04</span>
      <div>
        <p class="reading-path-label">Pipeline &amp; memory</p>
        <h3>Balance memory and recomputation</h3>
        <p>CARD chooses activation storage and recomputation policies for each pipeline stage to <mark>balance memory use and recomputation</mark>. Automatic policy generation reduces manual configuration and makes the policies easier to adapt to different layer counts and parallelism configurations.</p>
      </div>
    </li>
  </ol>
</section>

<section class="reading-section reading-announcement" aria-labelledby="announcement-heading">
  <div>
    <p class="reading-eyebrow">The original talk</p>
    <h2 id="announcement-heading">Seminar announcement</h2>
    <p>This English overview is based on Guangming Laboratory’s Chinese announcement and abstract for <em>Communication-Aware Scheduling Optimization for Large-Scale MoE Model Training on Ascend NPUs</em>. The original includes the event poster and speaker biography.</p>
  </div>
  <div class="reading-links">
    <a href="https://mp.weixin.qq.com/s/tvtTHvvBlF8Kzuc21OJSKw" hreflang="zh" target="_blank" rel="noopener noreferrer" aria-label="Read original Chinese seminar announcement in a new tab">Read original <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
  </div>
</section>
