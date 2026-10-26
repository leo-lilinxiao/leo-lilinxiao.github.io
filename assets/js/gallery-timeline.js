// Gallery owns its sections, timeline and on-demand photo viewer.
(() => {
  // Keep failed asset URLs traceable in production when a cover stays blank.
  document.querySelectorAll('.gallery-cover img').forEach(image => {
    const reportCoverError = () => console.error('[gallery] Cover load failed.', {
      record: image.closest('[data-gallery-record]').id,
      source: image.currentSrc || image.src,
    });
    image.addEventListener('error', reportCoverError, { once: true });
    if (image.complete && image.currentSrc && image.naturalWidth === 0) reportCoverError();
  });

  const riverRoots = [...document.querySelectorAll('[data-gallery-river]')];
  if (!riverRoots.length) throw new Error('[gallery] River timelines are missing.');
  const rivers = riverRoots.map(root => {
    const groups = [...root.querySelectorAll('.gallery-year-group')];
    const layer = root.querySelector('.gallery-river-art');
    if (!groups.length || !layer || !root.dataset.riverTurn || !root.dataset.riverMobile) {
      throw new Error('[gallery] Incomplete river markup.');
    }
    const years = groups.map(group => Number(group.dataset.year));
    if (years.some((year, index) => !Number.isInteger(year) || (index > 0 && year > years[index - 1]))) {
      throw new Error('[gallery] Timeline years must be numeric and newest first.');
    }
    const segments = Array.from({ length: groups.length + 1 }, () => {
      const image = document.createElement('img');
      image.alt = '';
      image.draggable = false;
      image.decoding = 'async';
      image.fetchPriority = 'low';
      image.addEventListener('error', () => console.error(`[gallery] River artwork failed to load: ${image.src}`));
      layer.append(image);
      return image;
    });
    return { root, groups, segments };
  });

  // Endpoints measured from the generated raster art, not a hand-drawn replacement.
  const turnStart = 0.0608;
  const turnEnd = 0.9342;
  function placeRiverSegment(image, source, from, to, vertical, verticalWidth = 20) {
    const forward = to.x >= from.x;
    const start = forward ? turnStart : 1 - turnStart;
    const end = forward ? turnEnd : 1 - turnEnd;
    const width = vertical ? verticalWidth : (to.x - from.x) / (end - start);
    image.style.left = `${vertical ? from.x - width * 0.498 : from.x - width * start}px`;
    image.style.top = `${from.y}px`;
    image.style.width = `${width}px`;
    image.style.height = `${to.y - from.y}px`;
    image.style.transform = !vertical && !forward ? 'scaleX(-1)' : 'none';
    if (image.dataset.asset !== source) {
      image.dataset.asset = source;
      image.src = source;
    }
  }

  let drawFrame = 0;
  function drawRivers() {
    drawFrame = 0;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    rivers.forEach(({ root, groups, segments }) => {
      const box = root.getBoundingClientRect();
      if (!box.width || !box.height) return; // Hidden tabs do not request their artwork.
      const points = groups.map(group => {
        const marker = group.querySelector('.gallery-river-node').getBoundingClientRect();
        return { x: marker.left - box.left + marker.width / 2, y: marker.top - box.top + marker.height / 2 };
      });
      const source = mobile ? root.dataset.riverMobile : root.dataset.riverTurn;
      placeRiverSegment(segments[0], root.dataset.riverMobile, { x: points[0].x, y: -22 }, points[0], true, mobile ? 20 : 32);
      points.forEach((point, index) => {
        const next = points[index + 1] ?? { x: mobile ? point.x : box.width * (point.x < box.width / 2 ? 0.68 : 0.18), y: box.height };
        // One continuous generated bend crosses below the photos and captions.
        const vertical = mobile || Math.abs(next.x - point.x) < 1;
        placeRiverSegment(segments[index + 1], vertical ? root.dataset.riverMobile : source, point, next, vertical, mobile ? 20 : 32);
      });
    });
  }
  function queueDraw() {
    if (!drawFrame) drawFrame = requestAnimationFrame(drawRivers);
  }
  const resizeObserver = new ResizeObserver(queueDraw);
  rivers.forEach(({ root, groups }) => {
    resizeObserver.observe(root);
    groups.forEach(group => resizeObserver.observe(group));
  });
  new MutationObserver(queueDraw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener('resize', queueDraw);
  document.fonts.ready.then(queueDraw);

  const tabs = [...document.querySelectorAll('[data-gallery-tab]')];
  function activateSection(id) {
    tabs.forEach(tab => {
      const selected = tab.dataset.galleryTab === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    });
    // The first frame includes the selected section's artwork and marker geometry.
    drawRivers();
  }
  function sectionFromHash() {
    const target = document.getElementById(location.hash.slice(1));
    const section = target?.closest('.gallery-section');
    const selectedTab = tabs.find(tab => tab.hash === location.hash);
    activateSection(selectedTab ? selectedTab.dataset.galleryTab : section ? section.dataset.gallerySection : 'milestones');
    if (target?.hasAttribute('data-gallery-record')) requestAnimationFrame(() => target.scrollIntoView());
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      activateSection(tab.dataset.galleryTab);
      if (location.hash !== tab.hash) history.pushState(null, '', tab.hash);
    });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (event.key === ' ') next = index;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    });
  });
  window.addEventListener('hashchange', sectionFromHash);
  sectionFromHash();

  const dialog = document.querySelector('.gallery-lightbox');
  const viewport = dialog.querySelector('.gallery-lightbox-viewport');
  const thumbnails = dialog.querySelector('.gallery-lightbox-thumbnails');
  const hint = dialog.querySelector('.gallery-lightbox-hint');
  const caption = dialog.querySelector('.gallery-lightbox-caption');
  const counter = dialog.querySelector('.gallery-lightbox-counter');
  const previousButton = dialog.querySelector('.gallery-lightbox-prev');
  const nextButton = dialog.querySelector('.gallery-lightbox-next');
  const closeButton = dialog.querySelector('.gallery-lightbox-close');
  const originalLink = dialog.querySelector('.gallery-lightbox-original');
  let album = [];
  let photoIndex = 0;
  let trigger = null;
  let scrollFrame = 0;
  let settleTimer = 0;
  let navigationTarget = null;

  // Thumbnail requests are also limited to the visible horizontal strip.
  const thumbnailObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const image = entry.target;
      image.src = image.dataset.source;
      thumbnailObserver.unobserve(image);
    });
  }, { root: thumbnails });

  function loadPhotoWindow(index) {
    album.forEach((photo, i) => {
      if (Math.abs(i - index) > 1) {
        // Release distant decoded images; revisiting uses the browser's normal cache.
        photo.image?.remove();
        photo.image = null;
        photo.status.hidden = false;
        photo.status.textContent = `Photo ${i + 1}`;
        return;
      }
      if (photo.image) return;
      const image = document.createElement('img');
      photo.image = image;
      image.className = 'gallery-lightbox-image';
      image.alt = photo.caption;
      image.draggable = false;
      image.decoding = 'async';
      image.fetchPriority = i === index ? 'high' : 'low';
      image.hidden = true;
      photo.status.textContent = 'Loading photo…';
      photo.status.hidden = false;
      image.addEventListener('load', () => {
        if (photo.image !== image) return; // A completed request for a slide already left behind.
        image.hidden = false;
        photo.status.hidden = true;
      });
      image.addEventListener('error', () => {
        if (photo.image !== image) return;
        image.hidden = true;
        photo.status.hidden = false;
        photo.status.textContent = 'This photo could not be loaded. Use the full-size photo link below.';
        console.error('[gallery] Photo load failed.', { album: trigger.closest('[data-gallery-record]').id, index: i + 1, display: photo.display, fullSize: photo.source });
      });
      photo.slide.prepend(image);
      image.src = photo.display;
    });
  }

  function selectPhoto(index) {
    photoIndex = index;
    const photo = album[index];
    caption.textContent = photo.caption;
    counter.textContent = `${index + 1} / ${album.length}`;
    originalLink.href = photo.source;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === album.length - 1;
    [...thumbnails.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    album.forEach((item, i) => item.slide.setAttribute('aria-hidden', String(i !== index)));
    const selected = thumbnails.children[index];
    const strip = thumbnails.getBoundingClientRect();
    const thumb = selected.getBoundingClientRect();
    if (thumb.left < strip.left || thumb.right > strip.right) {
      thumbnails.scrollTo({ left: thumbnails.scrollLeft + thumb.left - strip.left - (strip.width - thumb.width) / 2, behavior: 'instant' });
    }
    if (document.activeElement?.disabled) viewport.focus({ preventScroll: true });
  }

  function scrollToPhoto(index, smooth = true) {
    if (!dialog.open || index < 0 || index >= album.length) return;
    // Distant thumbnail jumps are immediate, so they do not request every intervening photo.
    const animate = smooth && Math.abs(index - photoIndex) === 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    navigationTarget = index;
    selectPhoto(index);
    loadPhotoWindow(index);
    const slide = viewport.children[index];
    const frame = viewport.getBoundingClientRect();
    const rect = slide.getBoundingClientRect();
    const left = viewport.scrollLeft + rect.left - frame.left - (frame.width - rect.width) / 2;
    viewport.scrollTo({ left, behavior: animate ? 'smooth' : 'instant' });
    scheduleSettledPhoto();
  }

  function createSlides() {
    viewport.replaceChildren();
    thumbnails.replaceChildren();
    thumbnailObserver.disconnect();
    viewport.classList.toggle('is-single', album.length === 1);
    hint.hidden = thumbnails.hidden = previousButton.hidden = nextButton.hidden = album.length === 1;
    album.forEach((photo, index) => {
      const slide = document.createElement('figure');
      slide.className = 'gallery-lightbox-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `Photo ${index + 1} of ${album.length}`);
      const status = document.createElement('p');
      status.className = 'gallery-lightbox-status';
      status.setAttribute('role', 'status');
      status.textContent = `Photo ${index + 1}`;
      photo.slide = slide;
      photo.status = status;
      slide.append(status);
      viewport.append(slide);

      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Show photo ${index + 1} of ${album.length}`);
      button.setAttribute('aria-pressed', String(index === 0));
      const thumbnail = document.createElement('img');
      thumbnail.dataset.source = photo.thumbnail;
      thumbnail.alt = '';
      thumbnail.draggable = false;
      thumbnail.decoding = 'async';
      thumbnail.addEventListener('error', () => {
        button.textContent = String(index + 1);
        button.setAttribute('aria-label', `Show photo ${index + 1} of ${album.length}; thumbnail unavailable`);
        console.error(`[gallery] Thumbnail load failed: ${photo.thumbnail}`);
      });
      button.append(thumbnail);
      button.addEventListener('click', () => scrollToPhoto(index));
      thumbnails.append(button);
      thumbnailObserver.observe(thumbnail);
    });
  }

  function nearestPhoto() {
    const rect = viewport.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    let nearest = 0;
    let distance = Infinity;
    [...viewport.children].forEach((slide, index) => {
      const box = slide.getBoundingClientRect();
      const currentDistance = Math.abs(box.left + box.width / 2 - center);
      if (currentDistance < distance) { distance = currentDistance; nearest = index; }
    });
    return nearest;
  }

  function scheduleSettledPhoto() {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      navigationTarget = null;
      if (!dialog.open || !album.length) return;
      const index = nearestPhoto();
      selectPhoto(index);
      loadPhotoWindow(index);
    }, 150);
  }

  viewport.addEventListener('scroll', () => {
    scheduleSettledPhoto();
    if (scrollFrame || !dialog.open) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (!album.length) return;
      const index = nearestPhoto();
      selectPhoto(index);
      if (navigationTarget === null) loadPhotoWindow(index);
    });
  }, { passive: true });
  ['pointerdown', 'wheel'].forEach(type => viewport.addEventListener(type, () => { navigationTarget = null; }, { passive: true }));
  new ResizeObserver(() => { if (dialog.open) scrollToPhoto(photoIndex, false); }).observe(viewport);

  document.querySelectorAll('[data-gallery-open]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      const entry = link.closest('[data-gallery-record]');
      album = [...entry.querySelectorAll('[data-gallery-photo]')].map(photo => ({ source: photo.href, display: photo.dataset.display, thumbnail: photo.dataset.thumbnail, caption: photo.dataset.caption }));
      if (!album.length) throw new Error(`[gallery] No photos configured for ${entry.id}.`);
      if (album.some(photo => !photo.display || !photo.thumbnail || !photo.caption)) throw new Error(`[gallery] Incomplete photo metadata in ${entry.id}.`);
      trigger = link;
      photoIndex = 0;
      createSlides();
      document.body.classList.add('gallery-lightbox-open');
      dialog.showModal();
      closeButton.focus();
      scrollToPhoto(0, false);
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  previousButton.addEventListener('click', () => scrollToPhoto((navigationTarget ?? photoIndex) - 1));
  nextButton.addEventListener('click', () => scrollToPhoto((navigationTarget ?? photoIndex) + 1));
  dialog.addEventListener('click', event => {
    if (event.target === dialog || event.target.classList.contains('gallery-lightbox-stage')) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); scrollToPhoto((navigationTarget ?? photoIndex) - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); scrollToPhoto((navigationTarget ?? photoIndex) + 1); }
  });
  // Native dialog handles Escape and focus containment; close always restores the trigger.
  dialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-lightbox-open');
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    clearTimeout(settleTimer);
    navigationTarget = null;
    thumbnailObserver.disconnect();
    album.forEach(photo => { photo.image = null; });
    viewport.replaceChildren();
    thumbnails.replaceChildren();
    album = [];
    trigger?.focus({ preventScroll: true });
  });
})();
