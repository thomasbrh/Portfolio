/* chargement des projets */ /* Code réalisé par ChatGPT et adapté selon mes besoins (classes scss et chemin d'accès) */

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

        //fetch des projets depuis le serveur et le fichier JSON pour les informations de la carte (type et année)
        const [listResponse, metaResponse] = await Promise.all([
        fetch("/projets/list-projects.php"), /* ce fichier php a été réalisé par ChatGPT et est automatiquement mis à jour */
        fetch("/portfolio/assets/data/projects.json") /* ce fichier json a bien été fais a la main mais il faut le mettre à jour */
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

        /* cette partie à été adapté à mes besoins */
        card.innerHTML = ` 
            <div class="card">
                <a href="/projets/${project}" class="link">
                    <img 
                        src="/portfolio/scripts/generate-thumb.php?project=${project}"
                        alt="${project}" 
                        class="img-card"
                        loading="lazy"
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

        document.querySelectorAll(".title-section").forEach(title => {
            title.style.display = "block";
          });
          loader.style.display = "none";

    } catch (error) {
        loader.textContent = "Erreur de chargement.";
        console.error("Erreur lors du chargement des projets:", error);
    }
})();
