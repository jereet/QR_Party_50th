document.addEventListener('DOMContentLoaded', function () {
  var galleryCards = document.querySelectorAll('.gallery-card');
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');

  if (!galleryCards.length || !lightbox || !lightboxImage || !lightboxCaption || !lightboxClose) {
    return;
  }

  function openLightbox(image) {
    var fullImageSource = image.getAttribute('data-full') || image.currentSrc || image.src;
    var caption = image.getAttribute('alt') || image.closest('.gallery-card').getAttribute('data-caption') || 'Momento de la celebración';

    lightboxImage.src = fullImageSource;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  galleryCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var image = card.querySelector('img');

      if (!image) {
        return;
      }

      openLightbox(image);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
});