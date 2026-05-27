// Initialize medium zoom.
$(document).ready(function () {
  medium_zoom = mediumZoom("[data-zoomable]", {
    background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee", // + 'ee' for trasparency.
  });

  function promoteOriginalSource(image) {
    if (!image) return;
    const zoomSrc = image.getAttribute("data-zoom-src");
    if (!zoomSrc) return;

    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.src = new URL(zoomSrc, window.location.href).href;
  }

  medium_zoom.on("open", function (event) {
    const promoteOpenedImages = () => {
      promoteOriginalSource(event.target);
      promoteOriginalSource(medium_zoom.getZoomedImage());
      document.querySelectorAll(".medium-zoom-image--opened[data-zoom-src]").forEach(promoteOriginalSource);
    };

    promoteOpenedImages();
    window.requestAnimationFrame(promoteOpenedImages);
    window.setTimeout(promoteOpenedImages, 120);
  });
});
