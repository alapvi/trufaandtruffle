// Lógica de idioma, menú móvil y formulario de contacto
(function () {
  const STORAGE_KEY = 'tt-lang';

  function getValue(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.es;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = getValue(dict, el.getAttribute('data-i18n'));
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.getAttribute('data-i18n-attr').split(',').forEach((rule) => {
        const [attr, path] = rule.split(':');
        const value = getValue(dict, path);
        if (value) el.setAttribute(attr, value);
      });
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  // Selector de idioma
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  const savedLang = localStorage.getItem(STORAGE_KEY);
  const browserLang = navigator.language && navigator.language.startsWith('en') ? 'en' : 'es';
  applyLanguage(savedLang || browserLang);

  // Menú móvil
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Botones "Consultar" de productos: llevan al formulario y preseleccionan el producto
  document.querySelectorAll('.product-inquiry').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productSelect = document.getElementById('product');
      if (productSelect) productSelect.value = btn.dataset.product;
      document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Formulario de contacto: sin backend, se envía como mailto
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const product = form.product.value;
      const message = form.message.value.trim();

      const subject = encodeURIComponent(`Consulta de trufa - ${name}`);
      const body = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nProducto de interés: ${product}\n\nMensaje:\n${message}`
      );

      window.location.href = `mailto:info@truffaandtruffle.com?subject=${subject}&body=${body}`;
    });
  }

  // Año actual en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
