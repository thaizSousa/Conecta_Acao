/* === ARQUIVO PRINCIPAL === */

// 1. Importa a função de inicialização da SPA
import { initSpa } from './spa.js';

// 2. Garante que o DOM esteja carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // 3. Inicia a SPA
    initSpa();

});