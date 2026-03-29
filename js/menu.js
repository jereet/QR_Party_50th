document.addEventListener('DOMContentLoaded', function () {
  var filterButtons = document.querySelectorAll('.menu-filter__button');
  var menuItems = document.querySelectorAll('.menu-item');
  var menuGroups = document.querySelectorAll('.menu-group');

  if (!filterButtons.length || !menuItems.length || !menuGroups.length) {
    return;
  }

  function setActiveButton(selectedButton) {
    filterButtons.forEach(function (button) {
      var isSelected = button === selectedButton;
      button.classList.toggle('is-active', isSelected);
      button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  }

  function filterMenu(category) {
    menuItems.forEach(function (item) {
      var itemCategory = item.getAttribute('data-category');
      var shouldShow = category === 'all' || itemCategory === category;

      item.classList.toggle('is-hidden', !shouldShow);
    });

    menuGroups.forEach(function (group) {
      if (category === 'all') {
        group.classList.remove('is-hidden');
        return;
      }

      var hasVisibleItems = group.querySelector('.menu-item[data-category="' + category + '"]');
      group.classList.toggle('is-hidden', !hasVisibleItems);
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var category = button.getAttribute('data-category') || 'all';
      setActiveButton(button);
      filterMenu(category);
    });
  });

  var defaultButton = document.querySelector('.menu-filter__button.is-active') || document.querySelector('.menu-filter__button[data-category="all"]') || filterButtons[0];

  if (defaultButton) {
    setActiveButton(defaultButton);
    filterMenu(defaultButton.getAttribute('data-category') || 'all');
  }
});