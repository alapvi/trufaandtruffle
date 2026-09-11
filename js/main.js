(function () {
  const STORAGE_KEY = 'tt-lang';
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  function getValue(object, path) {
    return path.split('.').reduce((value, key) => (value && value[key] !== undefined ? value[key] : null), object);
  }

  function applyLanguage(lang) {
    const dictionary = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = getValue(dictionary, element.dataset.i18n);
      if (value) element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((element) => element.dataset.i18nAttr.split(',').forEach((rule) => {
      const [attribute, path] = rule.split(':');
      const value = getValue(dictionary, path);
      if (value) element.setAttribute(attribute, value);
    }));
    document.querySelectorAll('.lang-btn').forEach((button) => button.classList.toggle('active', button.dataset.lang === lang));
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function closeNavigation() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function closeMenus() {
    document.querySelectorAll('.nav-menu[open]').forEach((menu) => menu.removeAttribute('open'));
  }

  document.querySelectorAll('.lang-btn').forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
  const savedLanguage = localStorage.getItem(STORAGE_KEY);
  const browserLanguage = navigator.language && navigator.language.startsWith('fr') ? 'fr' : navigator.language && navigator.language.startsWith('en') ? 'en' : 'es';
  applyLanguage(savedLanguage || browserLanguage);

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      closeMenus();
      closeNavigation();
    }));
    mainNav.querySelectorAll('summary').forEach((summary) => summary.addEventListener('click', () => {
      mainNav.querySelectorAll('details').forEach((item) => {
        if (item !== summary.parentElement) item.removeAttribute('open');
      });
    }));
  }

  document.addEventListener('click', (event) => {
    if (mainNav && !mainNav.contains(event.target)) closeMenus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNavigation();
      closeMenus();
    }
  });
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    document.querySelectorAll(`a[href="#${entry.target.id}"]`).forEach((link) => link.classList.toggle('is-active', entry.isIntersecting));
  }), { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('[data-carousel-dot]');
    let currentIndex = 0;
    let timer;

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === currentIndex));
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    }

    function startAutoPlay() {
      clearInterval(timer);
      timer = setInterval(() => showSlide(currentIndex + 1), 5000);
    }

    carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoPlay();
    });
    carousel.querySelector('[data-carousel-next]').addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoPlay();
    });
    dots.forEach((dot) => dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.carouselDot));
      startAutoPlay();
    }));
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', () => clearInterval(timer));
    carousel.addEventListener('focusout', (event) => {
      if (!carousel.contains(event.relatedTarget)) startAutoPlay();
    });
    startAutoPlay();
  });

  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Truffle enquiry - ${data.get('company') || data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company')}\nCountry: ${data.get('country')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n\nMessage:\n${data.get('message')}`);
    window.location.href = `mailto:administration@trufaandtruffle.com?subject=${subject}&body=${body}`;
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
