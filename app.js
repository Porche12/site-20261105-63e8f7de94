/* JS integrated in HTML script tags */

// Auto-extracted inline JS:

    import PhotoSwipeLightbox from './assets/vendor/photoswipe/photoswipe-lightbox.esm.js';
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.gallery-grid',
      children: 'a, .gallery-item',
      pswpModule: () => import('./assets/vendor/photoswipe/photoswipe.esm.js')
    });
    lightbox.init();
  

    lucide.createIcons();
    window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      setTimeout(() => { preloader.classList.add('loaded'); }, 400);
    });
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-content > *', { y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5 });
    gsap.from('.hero-image-wrapper', { scale: 0.95, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.7 });
    gsap.utils.toArray('section').forEach(section => {
      const header = section.querySelector('.section-header');
      if (header) {
        gsap.from(header, {
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
      }
    });
    gsap.from('.feature-card, .pricing-card, .routine-item, .gallery-item', {
      scrollTrigger: { trigger: '.features-grid, .pricing-grid, .routine-layout, .gallery-grid', start: 'top 85%', toggleActions: 'play none none none' },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
    });
  

// Dismiss preloader smoothly on window load
window.addEventListener('load', () => {
    const loader = document.getElementById('site-loader') || document.querySelector('.site-preloader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('is-hidden');
            setTimeout(() => { loader.style.display = 'none'; }, 600);
        }, 300);
    }
});
if (typeof lucide !== 'undefined' && lucide.createIcons) {
    document.addEventListener('DOMContentLoaded', () => { lucide.createIcons(); });
}
