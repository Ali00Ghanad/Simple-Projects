const content = document.querySelectorAll('.q-box');

content.forEach((element) => {
  element.addEventListener("click", () => {
    const dropDown = element.nextElementSibling;
    const isDropDownVisible = window.getComputedStyle(dropDown).display != 'none';

    dropDown.style.display = isDropDownVisible ? 'none' : 'block';
  });
});

