// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-gallery",
          title: "Gallery",
          description: "Photos from awards, conferences, and professional activities.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/gallery/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Publications and public talks in reverse chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-open-source",
          title: "Open Source",
          description: "Open source projects, contributions, and patents.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/opensource/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Education, experience, awards, skills, and patents.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-received-huawei-rising-star-明日之星-award-top-5",
          title: 'Received Huawei “Rising Star” (明日之星) Award (Top 5%).',
          description: "",
          section: "News",},{id: "news-received-huawei-rising-star-明日之星-award-again-top-5",
          title: 'Received Huawei “Rising Star” (明日之星) Award again (Top 5%).',
          description: "",
          section: "News",},{id: "news-awarded-golden-cloud-award-金代码-top-2-and-hcs-cloud-summit-star-云巅之星-top-5-by-huawei-cloud",
          title: 'Awarded Golden Cloud Award (金代码, Top 2%) and HCS Cloud Summit Star (云巅之星,...',
          description: "",
          section: "News",},{id: "news-ascend-npu-user-space-virtualization-and-moe-memory-offloading-solutions-announced-at-huawei-hdc-2025-50-min-mark-industry-leading-with-amp-lt-3-performance-overhead",
          title: 'Ascend NPU User-Space Virtualization and MoE Memory Offloading solutions announced at Huawei HDC...',
          description: "",
          section: "News",},{id: "news-ranked-14th-out-of-5200-in-the-huawei-ict-software-competition-top-3-in-huawei-cloud-1st-in-chengdu-research-institute",
          title: 'Ranked 14th out of 5200+ in the Huawei ICT Software Competition (Top 3...',
          description: "",
          section: "News",},{id: "news-joined-aigcode-蔻町科技-as-large-model-algorithm-ai-infra-tech-leader-leading-model-pretraining-optimization",
          title: 'Joined AIGCode (蔻町科技) as Large Model Algorithm AI Infra Tech Leader, leading model...',
          description: "",
          section: "News",},{id: "news-invited-to-give-a-talk-at-guangming-laboratory-on-research-methodology-internship-planning-and-career-development-for-graduate-students",
          title: 'Invited to give a talk at Guangming Laboratory on research methodology, internship planning,...',
          description: "",
          section: "News",},{id: "news-paper-ecothink-accepted-to-the-web-conference-2026-www-26-as-first-author-average-40-4-energy-savings-for-llm-agents",
          title: 'Paper EcoThink accepted to The Web Conference 2026 (WWW’26) as first author! Average...',
          description: "",
          section: "News",},{id: "news-codex-autoresearch-my-open-source-project-a-self-directed-iterative-research-system-inspired-by-karpathy-s-autoresearch-concept-reached-1-000-github-stars",
          title: 'Codex AutoResearch — my open-source project, a self-directed iterative research system inspired by...',
          description: "",
          section: "News",},{id: "news-released-a-technical-talk-on-deepseek-v4-mechanism-details-at-aigcode",
          title: 'Released a technical talk on DeepSeek-V4 mechanism details at AIGCode.',
          description: "",
          section: "News",},{id: "news-paper-deterministic-component-mining-for-multi-framework-ui2code-generation-accepted-to-icml-2026-as-co-first-author-acceptance-rate-26-6",
          title: 'Paper Deterministic Component Mining for Multi-framework UI2Code Generation accepted to ICML 2026 as...',
          description: "",
          section: "News",},{id: "news-gave-an-academic-seminar-at-guangming-laboratory-on-communication-aware-scheduling-optimization-for-large-scale-moe-model-training-on-ascend-npus",
          title: 'Gave an academic seminar at Guangming Laboratory on communication-aware scheduling optimization for large-scale...',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
