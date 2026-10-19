(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const position = document.getElementById('position');
  const progress = document.getElementById('progress');
  const contents = document.querySelector('.contents');
  const fullscreen = document.querySelector('.fullscreen');
  const desktop = window.matchMedia('(min-width: 901px)');
  if (!slides.length || !previous || !next || !position || !progress) return;
  let current = 0;
  let observer;
  const indexFromHash = () => {
    const match = /^#slide-(\d+)$/.exec(location.hash);
    return match ? Math.min(slides.length - 1, Math.max(0, Number(match[1]) - 1)) : 0;
  };
  const replaceHash = (index) => {
    if (location.hash !== `#slide-${index + 1}`) {
      history.replaceState(null, '', `#slide-${index + 1}`);
    }
  };
  function render(index) {
    current = Math.min(slides.length - 1, Math.max(0, index));
    slides.forEach((slide, i) => { slide.hidden = desktop.matches && i !== current; });
    previous.href = `#slide-${Math.max(0, current - 1) + 1}`;
    next.href = `#slide-${Math.min(slides.length - 1, current + 1) + 1}`;
    previous.setAttribute('aria-disabled', String(current === 0));
    next.setAttribute('aria-disabled', String(current === slides.length - 1));
    position.innerHTML = `${String(current + 1).padStart(2, '0')} <span>/ ${slides.length}</span>`;
    progress.value = current + 1;
    document.querySelectorAll('.toc a').forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  function navigate(index, updateHistory = true) {
    const target = Math.min(slides.length - 1, Math.max(0, index));
    render(target);
    if (updateHistory && location.hash !== `#slide-${target + 1}`) {
      history.pushState(null, '', `#slide-${target + 1}`);
    }
    contents.open = false;
    if (desktop.matches) window.scrollTo({top: 0, behavior: 'instant'});
    else slides[target].scrollIntoView({block: 'start', behavior: 'instant'});
  }
  function observeReading() {
    if (observer) observer.disconnect();
    if (desktop.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver((entries) => {
      // A narrow band below the toolbar tracks the chapter currently being read.
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = slides.indexOf(entry.target);
          render(index);
          replaceHash(index);
        }
      });
    }, {rootMargin: '-20% 0px -70% 0px', threshold: 0});
    slides.forEach((slide) => observer.observe(slide));
  }
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#slide-"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const match = /^#slide-(\d+)$/.exec(link.getAttribute('href'));
    if (!match) return;
    event.preventDefault();
    navigate(Number(match[1]) - 1);
  });
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.defaultPrevented) return;
    if (event.target.closest('input, textarea, select, button, summary, [contenteditable="true"], [role="textbox"]')) return;
    let target;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') target = current + 1;
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') target = current - 1;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = slides.length - 1;
    if (target === undefined) return;
    event.preventDefault();
    navigate(target);
  });
  window.addEventListener('hashchange', () => navigate(indexFromHash(), false));
  desktop.addEventListener('change', () => { render(current); observeReading(); navigate(current, false); });
  document.addEventListener('click', (event) => {
    if (!contents.contains(event.target)) contents.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contents.open) {
      contents.open = false;
      contents.querySelector('summary').focus();
    }
  });
  if (document.fullscreenEnabled && document.documentElement.requestFullscreen) {
    fullscreen.hidden = false;
    fullscreen.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch {
        fullscreen.textContent = 'Toàn màn hình không khả dụng';
      }
    });
    document.addEventListener('fullscreenchange', () => {
      const active = Boolean(document.fullscreenElement);
      fullscreen.textContent = active ? 'Thoát toàn màn hình ↙' : 'Toàn màn hình ↗';
      fullscreen.setAttribute('aria-label', active ? 'Thoát toàn màn hình' : 'Bật toàn màn hình');
    });
  }
  // Apply hiding only after controls and handlers are ready. No-JS remains a complete document.
  document.documentElement.classList.add('enhanced');
  render(indexFromHash());
  observeReading();
  if (location.hash) requestAnimationFrame(() => navigate(indexFromHash(), false));
})();
