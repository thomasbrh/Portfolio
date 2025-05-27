const html = document.documentElement; // <html>

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
}); /* cette partie viens de L'IA (avec les classes scs*/

/* cursor */
const cursors = document.querySelectorAll(".cursor");
const links = document.querySelectorAll(".link");

window.addEventListener("mousemove", (e) => {
    cursors.forEach(el => {
        el.style.left = `${e.pageX}px`;
        el.style.top = `${e.pageY}px`;
    });

    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            cursors.forEach(el => el.classList.add("hover"));
        });

        link.addEventListener("mouseleave", () => {
            cursors.forEach(el => el.classList.remove("hover"));
        });
    });
});
