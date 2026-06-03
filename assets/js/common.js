$(document).ready(function () {
  const publicationToggles = "a.abstract, a.award, a.bibtex";
  $(publicationToggles).attr({ "aria-expanded": "false", tabindex: "0" });

  function setPublicationPanel(button, panelClass) {
    const $button = $(button);
    const $entry = $button.closest("li");
    const $targetPanels = $entry.find(`div.${panelClass}.hidden`);
    const willOpen = !$targetPanels.first().hasClass("open");

    $entry.find("div.abstract.hidden.open, div.award.hidden.open, div.bibtex.hidden.open").removeClass("open");
    $entry.find(publicationToggles).removeClass("is-active").attr("aria-expanded", "false");

    if (willOpen) {
      $targetPanels.addClass("open");
      $button.addClass("is-active").attr("aria-expanded", "true");
    }
  }

  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function (event) {
    event.preventDefault();
    setPublicationPanel(this, "abstract");
  });
  $("a.award").click(function (event) {
    event.preventDefault();
    setPublicationPanel(this, "award");
  });
  $("a.bibtex").click(function (event) {
    event.preventDefault();
    setPublicationPanel(this, "bibtex");
  });
  $(publicationToggles).keydown(function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      $(this).trigger("click");
    }
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

  function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll(".page-gallery [data-gallery-lightbox]");
    if (!galleryImages.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Gallery image viewer");
    lightbox.setAttribute("aria-describedby", "gallery-lightbox-caption");
    lightbox.setAttribute("tabindex", "-1");
    lightbox.innerHTML = `
      <div class="gallery-lightbox-stage">
        <img class="gallery-lightbox-image" alt="">
      </div>
      <p class="gallery-lightbox-caption" id="gallery-lightbox-caption"></p>
    `;
    document.body.appendChild(lightbox);

    const image = lightbox.querySelector(".gallery-lightbox-image");
    const caption = lightbox.querySelector(".gallery-lightbox-caption");
    let lastFocusedElement = null;
    let activeGalleryImage = null;
    let activeImageAnimation = null;
    let closeTimer = null;
    let animationToken = 0;

    function captionFor(galleryImage) {
      const figureCaption = galleryImage.closest("figure")?.querySelector("figcaption");
      if (figureCaption?.textContent.trim()) return figureCaption.textContent.trim();

      const collectionTitle = galleryImage.closest(".gallery-collection")?.querySelector(".gallery-collection-title");
      if (collectionTitle?.textContent.trim()) return collectionTitle.textContent.trim();

      return galleryImage.getAttribute("alt") || "";
    }

    function prefersReducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function imageReady() {
      if (image.complete && image.naturalWidth) return Promise.resolve();
      return new Promise((resolve) => {
        let settled = false;
        let fallbackTimer = null;

        const cleanup = () => {
          image.removeEventListener("load", settle);
          image.removeEventListener("error", settle);
          window.clearTimeout(fallbackTimer);
        };

        const settle = () => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve();
        };

        const checkLoaded = () => {
          if (image.complete && image.naturalWidth) settle();
        };

        image.addEventListener("load", settle, { once: true });
        image.addEventListener("error", settle, { once: true });
        window.requestAnimationFrame(checkLoaded);
        fallbackTimer = window.setTimeout(checkLoaded, 120);
      });
    }

    function cancelLightboxAnimations() {
      activeImageAnimation?.cancel();
      activeImageAnimation = null;
    }

    function animateImageFromTo(fromRect, toRect, direction = "open") {
      if (prefersReducedMotion() || !fromRect || !toRect || !toRect.width || !toRect.height) return null;

      const deltaX = fromRect.left + fromRect.width / 2 - (toRect.left + toRect.width / 2);
      const deltaY = fromRect.top + fromRect.height / 2 - (toRect.top + toRect.height / 2);
      const scaleX = Math.max(0.02, fromRect.width / toRect.width);
      const scaleY = Math.max(0.02, fromRect.height / toRect.height);
      const thumbnailState = {
        opacity: direction === "close" ? 0.72 : 0.9,
        transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
      };
      const fullState = {
        opacity: 1,
        transform: "translate(0, 0) scale(1, 1)",
      };

      activeImageAnimation = image.animate(
        direction === "open" ? [thumbnailState, fullState] : [fullState, thumbnailState],
        {
          duration: direction === "open" ? 390 : 300,
          easing: direction === "open" ? "cubic-bezier(0.16, 1, 0.3, 1)" : "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: direction === "close" ? "forwards" : "none",
        },
      );
      return activeImageAnimation;
    }

    function finishAnimationWhenSettled(animation, token, callback) {
      if (!animation) {
        callback();
        return;
      }

      animation.finished
        .then(() => {
          if (animationToken === token) callback();
        })
        .catch(() => {});
    }

    function openLightbox(galleryImage) {
      const source = new URL(galleryImage.dataset.gallerySrc || galleryImage.currentSrc || galleryImage.src, window.location.href).href;
      const fromRect = galleryImage.getBoundingClientRect();
      cancelLightboxAnimations();
      window.clearTimeout(closeTimer);
      const token = ++animationToken;
      activeGalleryImage = galleryImage;
      lastFocusedElement = document.activeElement;
      image.style.visibility = "hidden";
      caption.style.visibility = "hidden";
      image.src = source;
      image.alt = galleryImage.getAttribute("alt") || "";
      caption.textContent = captionFor(galleryImage);
      document.body.classList.add("gallery-lightbox-open");
      lightbox.setAttribute("aria-hidden", "false");
      lightbox.classList.remove("is-caption-visible");
      lightbox.classList.add("is-open", "is-animating");

      imageReady().then(() => {
        if (!lightbox.classList.contains("is-open") || animationToken !== token) return;
        image.style.visibility = "";
        caption.style.visibility = "";
        const toRect = image.getBoundingClientRect();
        const animation = animateImageFromTo(fromRect, toRect, "open");
        window.requestAnimationFrame(() => {
          if (lightbox.classList.contains("is-open") && animationToken === token) {
            lightbox.classList.add("is-caption-visible");
          }
        });
        finishAnimationWhenSettled(animation, token, () => {
          lightbox.classList.remove("is-animating");
        });
      });

      window.requestAnimationFrame(() => {
        lightbox.classList.add("is-open");
      });
      lightbox.focus({ preventScroll: true });
    }

    function closeLightbox() {
      if (!lightbox.classList.contains("is-open")) return;
      cancelLightboxAnimations();
      const token = ++animationToken;
      const imageRect = image.getBoundingClientRect();
      const targetRect = activeGalleryImage?.getBoundingClientRect();
      lightbox.classList.add("is-animating");
      const animation = animateImageFromTo(targetRect, imageRect, "close");
      lightbox.classList.remove("is-caption-visible");
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      window.clearTimeout(closeTimer);
      let cleanedUp = false;
      const cleanup = () => {
        if (cleanedUp || animationToken !== token) return;
        cleanedUp = true;
        lightbox.classList.remove("is-animating");
        document.body.classList.remove("gallery-lightbox-open");
        image.removeAttribute("src");
        caption.style.visibility = "";
        caption.textContent = "";
        activeGalleryImage = null;
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
          lastFocusedElement.focus({ preventScroll: true });
        }
      };
      finishAnimationWhenSettled(animation, token, cleanup);
      closeTimer = window.setTimeout(cleanup, 360);
    }

    galleryImages.forEach((galleryImage) => {
      const trigger = galleryImage.closest(".gallery-card") || galleryImage;
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-label", `Open original image: ${captionFor(galleryImage)}`);
      trigger.addEventListener("click", () => openLightbox(galleryImage));
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(galleryImage);
        }
      });
    });

    lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") closeLightbox();
    });
  }

  initGalleryLightbox();

  const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (motionAllowed && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-ready");
    const revealTargets = [...document.querySelectorAll(
      ".post-header, article > .about-hero, article > hr, .news .table-responsive, .publications ol.bibliography > li, .public-talk-list, .projects > .card, .page-gallery .gallery-card, .page-gallery .gallery-collection-title, .cv > .card",
    )].filter((element) => !element.matches(".about-hero .post-header"));

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 38, 190)}ms`);
    });

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

    revealTargets.forEach((element) => revealObserver.observe(element));

    const spotlightTargets = document.querySelectorAll(".card, .publications ol.bibliography > li, .public-talk-card, .page-gallery .gallery-card");
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
