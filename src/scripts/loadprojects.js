(async function () {
  if (!window.location.pathname.endsWith('/projets.html') && !window.location.pathname.endsWith('projets.html')) return;

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
            <a href="/projets/${project}" class="link"><p class="title-card">${project}</p></a>
            <div>
              <p class="text-card">${type}</p>
              <p class="text-card text-card-thin">${year}</p>
            </div>
          </div>
        </div>
      `;

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
})();
