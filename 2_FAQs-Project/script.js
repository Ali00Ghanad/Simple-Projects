const content = document.querySelectorAll('.q-box');
const plusIcon = document.querySelectorAll('.plus-icon');
const minusIcon = document.querySelectorAll('.minus-icon');

content.forEach((element , index) => {
  element.addEventListener("click", () => {
    const dropDown = element.nextElementSibling;
    const isDropDownVisible = window.getComputedStyle(dropDown).display == 'none';
    dropDown.style.display = isDropDownVisible ? 'block' : 'none';
  
    if (isDropDownVisible) {
      plusIcon[index].style.display = 'none';
      minusIcon[index].style.display = 'block';
    } else {
      plusIcon[index].style.display = 'block';
      minusIcon[index].style.display = 'none';
    }
  });
});

