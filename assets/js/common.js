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

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    // CV navigation is rendered with its section headings at build time.
    if (!$myNav.is("[data-toc-static]")) Toc.init($myNav);
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
