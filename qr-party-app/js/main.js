document.addEventListener('DOMContentLoaded', function () {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.site-nav__link');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');

    if (!href) {
      return;
    }

    if ((currentPage === '' || currentPage === 'index.html') && href === 'index.html') {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
      return;
    }

    if (href === currentPage) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  var anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (anchorLink) {
    anchorLink.addEventListener('click', function (event) {
      var targetSelector = anchorLink.getAttribute('href');

      if (!targetSelector || targetSelector === '#') {
        return;
      }

      var targetElement = document.querySelector(targetSelector);

      if (!targetElement) {
        return;
      }

      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});