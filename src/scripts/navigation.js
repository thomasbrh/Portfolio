/* Classe active pour la navigation */
(() => {
  const currentPath = window.location.pathname.replace(/\/$/, "");

  const isHomePage =
    currentPath === "" ||
    currentPath === "/" ||
    currentPath.endsWith("index.html") ||
    currentPath.endsWith("/portfolio") ||
    currentPath.endsWith("/portfolio/");

  const setActiveClass = (links, activeClass) => {
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
    links.forEach(link => {
      const href = link.getAttribute('href');
      const linkPath = `${basePath}/${href.replace(/^\//, '')}`;

      if (
        isHomePage &&
        (linkPath.endsWith("index.html") ||
         linkPath === "/" ||
         linkPath.endsWith("/portfolio/index.html"))
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
    }, 10);
  });
})();