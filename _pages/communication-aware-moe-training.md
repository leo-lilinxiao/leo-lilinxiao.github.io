---
layout: page
permalink: /talks/communication-aware-moe-training/
title: Communication-Aware Scheduling Optimization for Large-Scale MoE Model Training on Ascend NPUs
description: Frontiers Series · Guangming Laboratory · 3 June 2026
nav: false
back_link:
  label: Back to Public Talks
  url: /publications/#public-talks
nav_parent: /publications/
---

<div class="reading-summary" markdown="1">

<p class="reading-kicker">English overview · Academic seminar</p>

**Speaker:** Linxiao Li, AIGCode

This seminar introduces **CARD**, a system-level approach to improving large-scale mixture-of-experts (MoE) training on Ascend NPU clusters. Starting from real training logs and profiling, it examines waiting time and redundant computation across MoE layers, output and loss computation, and pipeline execution.

## Topics covered

- **Coordinating communication and computation.** CARD schedules token dispatch, expert computation, shared experts, and backward execution together to reduce communication exposed on the critical path.
- **Streamlining expert computation and backpropagation.** For grouped matrix multiplication, activations, and routing-probability computation, CARD reduces saved intermediate tensors and autograd scheduling overhead. Direct gradient computation and accumulation reduce redundant work and memory use.
- **Optimizing the output layer and loss.** Chunked loss computation, output-layer gradient accumulation, and NPU-side matrix accumulation reduce intermediate buffers and repeated matrix multiplications while preserving the loss result.
- **Balancing pipeline execution and memory.** Per-stage activation-storage and recomputation policies balance memory consumption against repeated work. Automatic policy generation reduces manual configuration across different model depths and parallelism settings.

## Seminar announcement

This overview is based on Guangming Laboratory's Chinese announcement and talk abstract. The original includes the event poster and speaker biography.

<div class="reading-links">
  <a href="https://mp.weixin.qq.com/s/tvtTHvvBlF8Kzuc21OJSKw" hreflang="zh" target="_blank" rel="noopener noreferrer" aria-label="Read original Chinese seminar announcement (opens in a new tab)">Read original <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
</div>

</div>
