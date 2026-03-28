document.addEventListener('DOMContentLoaded', function () {
  var uploadLink = document.getElementById('upload-link');
  var copyButton = document.getElementById('copy-upload-link');

  if (!uploadLink || !copyButton) {
    return;
  }

  var defaultButtonText = copyButton.textContent;

  function setButtonText(message) {
    copyButton.textContent = message;

    window.setTimeout(function () {
      copyButton.textContent = defaultButtonText;
    }, 2000);
  }

  function fallbackCopyText(text) {
    var tempInput = document.createElement('input');
    tempInput.type = 'text';
    tempInput.value = text;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';

    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, tempInput.value.length);

    var successful = false;

    try {
      successful = document.execCommand('copy');
    } catch (error) {
      successful = false;
    }

    document.body.removeChild(tempInput);
    return successful;
  }

  function copyUploadLink() {
    var linkToCopy = uploadLink.href;

    if (!linkToCopy) {
      setButtonText('Enlace no disponible');
      return;
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(linkToCopy).then(function () {
        setButtonText('Enlace copiado');
      }).catch(function () {
        var copied = fallbackCopyText(linkToCopy);
        setButtonText(copied ? 'Enlace copiado' : 'No se pudo copiar');
      });

      return;
    }

    var copied = fallbackCopyText(linkToCopy);
    setButtonText(copied ? 'Enlace copiado' : 'No se pudo copiar');
  }

  copyButton.addEventListener('click', copyUploadLink);
});