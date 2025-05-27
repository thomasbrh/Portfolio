import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* La fonction animateScrollSync a été proposée pr chatGPT dans un but d'optimisation */
// Fonction pour animer chaque élément indépendamment
function animateScrollSync(selector, fromVars, toVars) {
const elements = document.querySelectorAll(selector);
elements.forEach(el => {
        gsap.fromTo(el, fromVars,
            {
                ...toVars,
                scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 70%",
                scrub: true,
                }
            }
        );
    });
}


// Images 
animateScrollSync(
    '.img-sections',
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, ease: "power3.out", duration: 1.2 }
);


// Titres
animateScrollSync(
    '.title-section',
    { x: 200, opacity: 0 },
    { x: 0, opacity: 1, ease: "power3.out", duration: 1.2 }
);


// Paragraphes
animateScrollSync(
    '.paragraph',
    { x: -200, opacity: 0 },
    { x: 0, opacity: 1, ease: "power3.out", duration: 1.2 }
);


// Header
gsap.from('.animHeader', {
    opacity: 0,
    y: 400,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.2
});


// Footer
animateScrollSync(
    '.animFooter',
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, ease: "power3.out", duration: 1.2 }
);


// Cards 
const cards = document.querySelectorAll('.card');

/* les 3 lignes suivantes sont de chatGPT */
cards.forEach((card, index) => {
const isMiddle = (index % 3 === 1);

const fromY = isMiddle ? -150 : 150;

gsap.fromTo(card,
    { 
        y: fromY, 
        opacity: 0 
    },

    {
    y: 0,
    opacity: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 10%",
        scrub: true,
        markers: false
    }
    }
);
});
