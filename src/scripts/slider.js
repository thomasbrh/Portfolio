// le script vient d'un ancient projet 
document.addEventListener("DOMContentLoaded", () => {

if (!window.location.pathname.includes("prux.html")) return; //j'ai rajouté ceci pour éviter une erreur console

const images = 
    ['assets/images/prux-dev1.webp',
    'assets/images/prux-dev2.webp',
    'assets/images/prux-dev3.webp'];
let currentIndex = 1;
const slider = document.getElementById('image-slider');


setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    slider.src = images[currentIndex];
}, 2000);
});
