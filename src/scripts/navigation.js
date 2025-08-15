/* Classe active pour la navigation */ //la classe active a été aidé de l'ia par après car ne fonctionnait plus sur l'hébergeur
(() => {
    const currentPath = window.location.pathname.replace(/\/$/, "");

    /* Amélioration à l'aide de L'IA car celui que j'ai fais moi même ne fonctionnais plus sur l'hébergeur */
    const isHomePage =
        currentPath === "" ||
        currentPath === "/" ||
        currentPath.endsWith("index.html") ||
        currentPath.endsWith("/portfolio") ||
        currentPath.endsWith("/portfolio/"); /* cette partie viens de L'IA */

    const setActiveClass = (links, activeClass) => {
        const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
        links.forEach(link => {
        const href = link.getAttribute('href');
        const linkPath = `${basePath}/${href.replace(/^\//, '')}`;

        if (
            isHomePage &&
            (linkPath.endsWith("index.html") ||
            linkPath === "/" ||
            linkPath.endsWith("/portfolio/index.html")) /* cette partie viens de L'IA */
        ) {
            link.classList.add(activeClass);
            return;
        }

        if (!isHomePage && currentPath === linkPath) {
            link.classList.add(activeClass);
            return;
        }

        link.classList.remove(activeClass);
        });
    };

    const mobileLinks = document.querySelectorAll('.page-mobile');
    const desktopLinks = document.querySelectorAll('.page');

    setActiveClass(mobileLinks, 'page-mobile--active');
    setActiveClass(desktopLinks, 'page--active');

    // Sécurité : réexécution après le chargement complet
    window.addEventListener("load", () => {
        setTimeout(() => {
        setActiveClass(mobileLinks, 'page-mobile--active');
        setActiveClass(desktopLinks, 'page--active');
        }, 10); /* cette partie a été conseillé par l'IA */
    });

    
    // Liste des projets
    const projects = [
        { slug: "dataplay", name: "DataPlay", file: "dataplay.html" },
        { slug: "prux", name: "Prux", file: "prux.html" },
        { slug: "credits", name: "Crédits", file: "credits.html" },
    ];

    // Projet actif
    const currentPathLower = window.location.pathname.toLowerCase();
    const currentProject = projects.find(p => currentPathLower.includes(p.slug));

    // Fonction d’ajout de lien projet
    const addProjectLink = (navId, className, activeClass) => {
        const nav = document.getElementById(navId);
        if (!nav || !currentProject) return;

        const exists = Array.from(nav.children).some(el => el.textContent === currentProject.name);
        if (exists) return;

        const link = document.createElement("a");
        link.href = currentProject.file;
        link.textContent = currentProject.name;
        link.className = className;

        if (activeClass) {
            link.classList.add(activeClass);
        }

        // insère juste après Accueil
        const accueilLink = Array.from(nav.children).find(el => el.textContent.toLowerCase() === "accueil");
        if (accueilLink) {
            nav.insertBefore(link, accueilLink.nextSibling);
        } else {
            nav.appendChild(link);
        }
    };

    // Ajout aux navigations
    addProjectLink("navigation-desktop", "page link", "page--active");
    addProjectLink("navigation-mobile", "page-mobile nav-title", "page-mobile--active");

})();