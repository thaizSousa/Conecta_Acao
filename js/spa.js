/* === MÓDULO DE SPA (SINGLE PAGE APPLICATION) === */

// Importamos a validação para "ligá-la" quando a pág. de cadastro for carregada
import { initFormValidation } from './validation.js';

// Função principal de inicialização da SPA
export function initSpa() {
    
    // 1. Encontra a área de conteúdo principal
    const mainContent = document.getElementById('main-content');
    
    // 2. Encontra a navegação
    const nav = document.querySelector('.main-nav');
    if (!nav) return; // Se não houver nav, pare

    // 3. Adiciona um "ouvinte" de clique na navegação
    nav.addEventListener('click', function(event) {
        
        // 4. Verifica se o clique foi em um link <a>
        const link = event.target.closest('a');
        if (!link) return; // Se não foi em um link, ignore

        // 5. Previne o navegador de recarregar a página
        event.preventDefault();
        
        const path = link.getAttribute('href');

        // 6. Se for um link externo (http) ou âncora (#), deixe o navegador agir
        if (path.startsWith('http') || path.startsWith('#')) {
            window.location.href = path; // Navegação normal
            return;
        }

        // 7. Se for um link interno, carregue o conteúdo
        loadContent(path, mainContent);
        
        // 8. Atualiza a URL na barra do navegador
        history.pushState({}, '', path);
    });
}

// Requisito: Sistema de templates JavaScript
// Esta função busca o HTML, "parseia" (interpreta) e injeta no <main>
async function loadContent(path, mainContentElement) {
    try {
        // 1. Busca o arquivo HTML (ex: "pages/projetos.html")
        const response = await fetch(path);
        
        if (!response.ok) {
            throw new Error('Página não encontrada.');
        }

        // 2. Pega o conteúdo como texto
        const pageText = await response.text();

        // 3. "Parseia" o texto em um documento HTML temporário
        const parser = new DOMParser();
        const doc = parser.parseFromString(pageText, 'text/html');

        // 4. Encontra o <main> dentro do documento temporário
        const newMain = doc.querySelector('main'); // Nosso "template" é o <main>
        
        if (newMain) {
            // 5. Injeta o conteúdo no <main> da nossa página principal
            mainContentElement.innerHTML = newMain.innerHTML;
            
            // 6. [IMPORTANTE] Verifica se o formulário foi carregado
            if (path.includes('cadastro.html')) {
                // Se sim, "liga" a validação de formulário
                initFormValidation();
            }

        } else {
            mainContentElement.innerHTML = '<h1>Erro ao carregar conteúdo.</h1>';
        }

    } catch (error) {
        console.error('Erro ao carregar página:', error);
        mainContentElement.innerHTML = '<h1>Página não encontrada. (404)</h1>';
    }
}