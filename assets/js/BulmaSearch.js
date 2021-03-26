//Mobile Styling

var burgerIcon = document.querySelector('#burger');
var searchMobile = document.querySelector('#searchCard');

burgerIcon.addEventListener("click", () => {
   searchMobile.classList.toggle('is-hidden');
   searchMobile.classList.toggle('is-active');
});



