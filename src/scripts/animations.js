import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

console.log("GSAP et ScrollTrigger sont bien chargés !");

// Animation uniquement si l'élément est présent
if (document.querySelector('.project-list')) {
  gsap.to(".project-list", {
    y: -20,
    duration: 1,
    scrollTrigger: {
      trigger: ".project-list",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true
    }
  });
}
