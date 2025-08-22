import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { breakpoints } from './breakpoints.js';

gsap.registerPlugin(ScrollTrigger);


function getBreakpoint() {
const width = window.innerWidth;
if (width <= breakpoints.tabletMax) return "mobile";
if (width <= breakpoints.tabletLandscapeMax) return "tablet-landscape";
return "desktop";
}

let currentBreakpoint = getBreakpoint();

// la fonction applyImagePinScrollTriggers vient de l'ia et a été utilisée selon mes besoins 
function applyImagePinScrollTriggers() {
const screenWidth = window.innerWidth;
const isMobileOrTablet = screenWidth <= breakpoints.tabletMax;

if (isMobileOrTablet) return;

document.querySelectorAll(".img-sections").forEach((image) => {
    const section = image.closest("section");
    const texte = section.querySelector(".paragraph-center");

    if (!texte || !section) return;

    const texteTop = texte.getBoundingClientRect().top + window.scrollY;
    const texteHeight = texte.offsetHeight;
    const imageTop = image.getBoundingClientRect().top + window.scrollY;
    const imageHeight = image.offsetHeight;

    const distanceToEnd = (texteTop + texteHeight) - (imageTop + imageHeight);

    if (distanceToEnd > 0) {
    ScrollTrigger.create({
        trigger: section,
        start: "top 10%",
        end: "+=" + distanceToEnd,
        pin: image,
        pinSpacing: true,
        scrub: true,
        markers: false
    });
    }
});
}

function resetAndUpdatePinTriggers() {
// Supprime uniquement les triggers liés au pin d'image
ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars && trigger.vars.pin && trigger.vars.pin.classList?.contains("img-sections")) {
    trigger.kill();
    }
});

applyImagePinScrollTriggers();
}

// Initial setup
applyImagePinScrollTriggers();

// Recalcul au resize OU orientation change si le breakpoint a changé
window.addEventListener("resize", () => {
const newBreakpoint = getBreakpoint();
if (newBreakpoint !== currentBreakpoint) {
    currentBreakpoint = newBreakpoint;
    resetAndUpdatePinTriggers();
}
});

window.addEventListener("orientationchange", () => {
setTimeout(() => {
    currentBreakpoint = getBreakpoint();
    resetAndUpdatePinTriggers();
}, 300);
});


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
    { x: -75, opacity: 0 },
    { x: 0, opacity: 1, ease: "power3.out", duration: 0.8 }
);


// Titres
animateScrollSync(
    '.title-section',
    { x: 200, opacity: 0 },
    { x: 0, opacity: 1, ease: "power3.out", duration: 0.8 }
);


// Paragraphes
animateScrollSync(
    '.paragraph',
    { x: -200, opacity: 0 },
    { x: 0, opacity: 1, ease: "power3.out", duration: 0.8 }
);


// Header
gsap.from('.animHeader', {
    opacity: 0,
    y: 600,
    duration: 1.0,
    ease: 'power3.out',
    delay: 0.2
});


// Footer - Animation d'apparition compatible avec hover scale
function animateFooterScroll() {
  const width = window.innerWidth;
  const footerElements = document.querySelectorAll('.animFooter');

  let fromVars, toVars;

  if (width <= breakpoints.tabletMax) {
    //Mobile ou tablet
    fromVars = { y: 100, opacity: 0 };
    toVars = { y: 0, opacity: 1 };
  } else {
    // Desktop ou tablet-landscape
    fromVars = { x: -100, opacity: 0 };
    toVars = { x: 0, opacity: 1 };
  }

  footerElements.forEach(el => {
    gsap.fromTo(el, fromVars, {
      ...toVars,
      ease: "power3.out",
      duration: 0.8,
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        end: "top 85%",
        markers: false,
        scrub: true,
        onComplete: function() {
          // Nettoie seulement les propriétés d'animation, pas les transforms de hover
          gsap.set(el, { clearProps: "x,y,opacity" });
        }
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", animateFooterScroll);


function animateCards() {
const width = window.innerWidth;
const cards = document.querySelectorAll('.card');

const isMobileOrTablet = width <= breakpoints.tabletLandscapeMax;

cards.forEach((card, index) => {
    let fromY;

    if (isMobileOrTablet) {
    // Mobile et tablette : tous les cards glissent vers le haut depuis le bas
    fromY = 150;
    } else {
    // Desktop seulement : 2 vers le bas, celle du milieu vers le haut
    const isMiddle = index % 3 === 1;
    fromY = isMiddle ? -150 : 150;
    }

    gsap.fromTo(card,
    { y: fromY, opacity: 0 },

    {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.8,
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
}
document.addEventListener("DOMContentLoaded", animateCards);


// Animation de pulsation pour le bouton back-to-safe
function animateBackToSafe() {
    const backToSafeButton = document.querySelector('.back-to-safe');
    
    if (backToSafeButton) {
        gsap.to(backToSafeButton, {
            scale: 1.2,
            duration: 1.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
    }
}

// Initialiser l'animation du bouton back-to-safe
document.addEventListener("DOMContentLoaded", animateBackToSafe);
