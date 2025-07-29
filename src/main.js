import 'swiper/css/bundle';

import './js/header.js';

const dynamicImport = path =>
  import(path).catch(err => {
    console.warn(`Failed to load ${path}:`, err);
  });

const initApp = async () => {
  await Promise.allSettled([
    dynamicImport('./js/hero.js'),
    dynamicImport('./js/books.js'),
  ]);

  Promise.allSettled([
    dynamicImport('./js/auto-hide-header.js'),
    dynamicImport('./js/scroll-to-top.js'),
  ]);

  const loadInteractive = () =>
    Promise.allSettled([
      dynamicImport('./js/book-modal.js'),
      dynamicImport('./js/contact-modal.js'),
      dynamicImport('./js/feedbacks.js'),
      dynamicImport('./js/footer.js'),
      dynamicImport('./js/events.js'),
    ]);

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadInteractive, { timeout: 2000 });
  } else {
    setTimeout(loadInteractive, 100);
  }
};

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', initApp)
  : initApp();
