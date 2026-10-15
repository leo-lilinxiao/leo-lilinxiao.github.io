$(document).ready(function () {
  const publicationToggles = "button.publication-toggle";

  function setPublicationPanel(button) {
    const $button = $(button);
    const $entry = $button.closest("li");
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    if (!panel || !$entry[0]?.contains(panel)) {
      throw new Error(`Publication toggle has no matching panel: ${panelId}`);
    }
    const willOpen = button.getAttribute("aria-expanded") !== "true";

    $entry.find("div.hidden[aria-hidden]").removeClass("open").attr("aria-hidden", "true").prop("inert", true);
    $entry.find(publicationToggles).removeClass("is-active").attr("aria-expanded", "false");

    if (willOpen) {
      $(panel).addClass("open").attr("aria-hidden", "false").prop("inert", false);
      $button.addClass("is-active").attr("aria-expanded", "true");
    }
  }

  $(publicationToggles).click(function () {
    setPublicationPanel(this);
  });
  $("a").removeClass("waves-effect waves-light");

  const navbar = document.getElementById("navbar");
  if (navbar) {
    let navbarTicking = false;
    const updateNavbarState = () => {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 8);
      navbarTicking = false;
    };
    updateNavbarState();
    window.addEventListener(
      "scroll",
      () => {
        if (!navbarTicking) {
          window.requestAnimationFrame(updateNavbarState);
          navbarTicking = true;
        }
      },
      { passive: true },
    );
  }

  const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (motionAllowed && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-ready");
    const revealTargets = [...document.querySelectorAll(
      "article > hr, .news .table-responsive, .selected-research-highlights, .publications ol.bibliography > li, .public-talk-list, .projects > .card, .cv > .card",
    )];

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 38, 190)}ms`);
    });

    function markVisibleIfInViewport(element) {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        element.classList.add("is-visible");
        return true;
      }
      return false;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    revealTargets.forEach((element) => {
      if (!markVisibleIfInViewport(element)) {
        revealObserver.observe(element);
      }
    });

    const spotlightTargets = document.querySelectorAll(".card, .publications ol.bibliography > li, .public-talk-card, .page-opensource .patent-entry");
    spotlightTargets.forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      });
    });
  }

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });
    $("body").scrollspy("refresh");
    if (!$myNav.find(".nav-link.active").length) {
      $myNav.find(".nav-link").first().addClass("active");
    }
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
