/* Importation des scripts */
import './breakpoints.js';
import './navigation.js';
import './cursor.js';
import './animations.js';


// Import conditionnel du slider uniquement sur prux.html
if (window.location.pathname.includes('prux.html')) {
    import('./slider.js');
}