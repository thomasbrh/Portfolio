const html = document.documentElement;

const isMouse = window.matchMedia("(pointer: fine)").matches;
const isTouch = window.matchMedia("(pointer: coarse)").matches;

if (isMouse) {
    html.classList.add("has-mouse");
} else if (isTouch) {
    html.classList.add("has-touch");
}

window.matchMedia("(pointer: fine)").addEventListener("change", (e) => {
    html.classList.toggle("has-mouse", e.matches);
    html.classList.toggle("has-touch", !e.matches);
});

/* cursor */
const cursors = document.querySelectorAll(".cursor");
const links = document.querySelectorAll(".link");

let mouseX = 0, mouseY = 0, rafId = null;
let lastUpdate = 0;
const throttleDelay = 16; // +- 60fps

function updateCursor() {
    cursors.forEach(el => {
        el.style.left = `${mouseX}px`;
        el.style.top = `${mouseY}px`;
    });
    rafId = null;
}

window.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastUpdate < throttleDelay) return;
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastUpdate = now;
    
    if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
    }
});

// Cache le curseur custom quand la souris quitte la fenêtre
window.addEventListener("mouseleave", () => {
    cursors.forEach(el => el.style.opacity = "0");
});
window.addEventListener("mouseenter", () => {
    cursors.forEach(el => el.style.opacity = "1");
});

// Ajoute les listeners UNE SEULE FOIS
links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        cursors.forEach(el => el.classList.add("hover"));
    });

    link.addEventListener("mouseleave", () => {
        cursors.forEach(el => el.classList.remove("hover"));
    });
});

// Rafraîchit l'état hover lors du scroll
window.addEventListener("scroll", () => {
    // Obtient l'élément sous le curseur après le scroll
    const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
    
    // Trouve le lien le plus proche (l'élément ou un parent avec la classe "link")
    const linkElement = elementUnderCursor && elementUnderCursor.closest(".link");
    
    if (linkElement) {
        cursors.forEach(el => el.classList.add("hover"));
    } else {
        cursors.forEach(el => el.classList.remove("hover"));
    }
});
