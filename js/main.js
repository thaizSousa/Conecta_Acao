/* === ARQUIVO PRINCIPAL === */

// 1. Importa a função de inicialização da SPA
import { initSpa } from './spa.js';

// 2. Garante que o DOM esteja carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // 3. Inicia a SPA
    initSpa();


});
/* === ARQUIVO PRINCIPAL === */
import { initSpa } from './spa.js';
import { initThemeToggle } from './theme.js'; // <-- ADICIONE ESTA LINHA

document.addEventListener('DOMContentLoaded', () => {
    initSpa();
    initThemeToggle(); // <-- ADICIONE ESTA LINHA
});
