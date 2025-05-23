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


/* Classe active pour la navigation */
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.replace(/\/$/, ""); // Supprime le slash final si présent
    const isHomePage = currentPath === "" || currentPath === "/" || currentPath === "/index.html";

    console.log("Chemin actuel :", currentPath);
    console.log("Est-ce la page d'accueil ?", isHomePage);

    // Fonction pour gérer les classes actives
    const setActiveClass = (links, activeClass) => {
        links.forEach(link => {
            const linkPath = link.getAttribute('href').replace(/\/$/, ""); // Supprime le slash final si présent
            console.log("Lien vérifié :", linkPath);

            // Ajout de la classe active pour la page d'accueil
            if (isHomePage && (linkPath === "/index.html" || linkPath === "" || linkPath === "/")) {
                console.log("Ajout de la classe active pour la page d'accueil :", link);
                link.classList.add(activeClass);
                return; // Empêche toute suppression accidentelle
            }

            // Ajout de la classe active pour les autres pages
            if (!isHomePage && currentPath.includes(linkPath)) {
                console.log("Ajout de la classe active pour une autre page :", link);
                link.classList.add(activeClass);
                return; // Empêche toute suppression accidentelle
            }

            // Suppression de la classe active uniquement si elle n'est pas nécessaire
            console.log("Suppression de la classe active :", link);
            link.classList.remove(activeClass);
        });
    };

    // Gestion des liens pour la version mobile
    const mobileLinks = document.querySelectorAll('.page-mobile');
    setActiveClass(mobileLinks, 'page-mobile--active');

    // Gestion des liens pour la version desktop
    const desktopLinks = document.querySelectorAll('.page');
    setActiveClass(desktopLinks, 'page--active');
});


/* cursor */
const cursor = document.querySelectorAll(".cursor");
const links = document.querySelectorAll(".link");

window.addEventListener("mousemove", (e) => {
  
    let x = e.pageX;
    let y = e.pageY;
  
    cursor.forEach(el => {
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    
    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
        el.classList.add("hover");
    })

        link.addEventListener("mouseleave", () => {
        el.classList.remove("hover");
    })})
  })
})


/* load projects */
document.addEventListener("DOMContentLoaded", async function () {
    const loader = document.getElementById("loader");
    const websiteContainer = document.querySelector(".website-projects");
    const allProjectsContainer = document.querySelector(".all-projects");

    if (!loader || !websiteContainer || !allProjectsContainer) {
        console.error("Éléments requis manquants.");
        return;
    }

    try {
        loader.style.display = "block";

        const [listResponse, metaResponse] = await Promise.all([
            fetch("/projets/list-projects.php"),
            fetch("/portfolio/assets/data/projects.json")
        ]);

        const projects = await listResponse.json();
        const meta = await metaResponse.json();

        if (!projects || projects.length === 0 || projects.error) {
            loader.textContent = "Aucun projet trouvé.";
            return;
        }

        // Tri alphabétique
        projects.sort((a, b) => a.localeCompare(b));

        projects.forEach((project) => {
            const { year, type } = meta[project] || { year: "????", type: "project" };
            const isWebsite = type?.toLowerCase().includes("website");

            const card = document.createElement("div");
            card.classList.add("project-item");

            card.innerHTML = `
              <div class="card">
                <a href="/projets/${project}" class="link">
                  <img 
                    src="https://image.thum.io/get/width/600/https://thomasbruch.be/projets/${project}" 
                    alt="${project}" 
                    class="img-card"
                  >
                </a>
                <div class="grid-flex">
                  <p class="title-card">${project}</p>
                  <div>
                    <p class="text-card">${type}</p>
                    <p class="text-card text-card-thin">${year}</p>
                  </div>
                </div>
              </div>
            `;

            // Ajoute dans les deux si c'est un website
            if (isWebsite) {
                websiteContainer.appendChild(card.cloneNode(true));
            }

            allProjectsContainer.appendChild(card);
        });

        loader.style.display = "none";
    } catch (error) {
        loader.textContent = "Erreur de chargement.";
        console.error("Erreur lors du chargement des projets:", error);
    }
});