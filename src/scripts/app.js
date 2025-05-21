'use strict';
/* Importation de GSAP */
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé !");
    console.log(typeof gsap !== "undefined" ? "GSAP est bien chargé" : "GSAP ne fonctionne pas");
});

/* Barre de progression */
window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
 
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
}

/* Etat actif de la barre de navigation mobile */
document.querySelectorAll('.page').forEach(element => {
    element.addEventListener('click', (event) => {
        // Supprimer la classe 'page--active' de tous les éléments avec la classe 'page'
        document.querySelectorAll('.page').forEach(el => {
            el.classList.remove('page--active');
        });

        // Ajouter la classe 'page--active' à l'élément cliqué
        event.currentTarget.classList.add('page--active');
    });
});