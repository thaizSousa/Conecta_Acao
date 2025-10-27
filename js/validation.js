/* === MÓDULO DE VALIDAÇÃO === */

// Função principal que será exportada
export function initFormValidation() {
    
    // 1. Encontrar o formulário na página
    const form = document.getElementById('cadastro-form');
    
    // 2. Se não houver formulário nesta página, não faça nada
    if (!form) {
        return;
    }

    // 3. Adicionar um "ouvinte" para o evento de "submit" (envio)
    form.addEventListener('submit', function(event) {
        
        // 4. Prevenir o envio padrão do formulário (que recarrega a página)
        event.preventDefault();
        
        // 5. Limpar erros antigos
        clearErrors(form);

        // 6. Validar os campos
        let isValid = validateFields(form);

        // 7. Mostrar resultado
        if (isValid) {
            // Requisito: Aviso ao usuário
            alert('Cadastro enviado com sucesso!');
            form.reset(); // Limpa o formulário
        } else {
            // Requisito: Aviso de preenchimento incorreto
            alert('Formulário com erros. Por favor, corrija os campos em vermelho.');
        }
    });
}

// Função que valida os campos
function validateFields(form) {
    let allValid = true; // Começa assumindo que tudo está válido
    
    // Pegar todos os campos que têm "required" (obrigatório)
    const fields = form.querySelectorAll('[required]');

    for (const field of fields) {
        // Usamos a própria validação do HTML5
        if (!field.validity.valid) {
            allValid = false;
            showError(field);
        }
    }
    
    return allValid;
}

// Função para MOSTRAR o erro
function showError(field) {
    // Requisito: Aviso ao usuário de preenchimento incorreto
    
    // Adiciona uma classe de erro no campo (para o CSS pegar)
    field.classList.add('field-error');

    // Pega o <label> do campo
    const label = field.previousElementSibling;
    let message = `O campo "${label.textContent.replace(':', '')}" é obrigatório.`;

    // Mensagem customizada para o pattern (CPF, CEP, etc)
    if (field.validity.patternMismatch) {
        message = `O formato do campo "${label.textContent.replace(':', '')}" está incorreto.`;
    }

    // Cria um <span> para a mensagem de erro
    const errorText = document.createElement('span');
    errorText.className = 'form-error-text';
    errorText.textContent = message;

    // Insere a mensagem de erro logo abaixo do campo
    field.parentElement.appendChild(errorText);
}

// Função para LIMPAR erros antigos
function clearErrors(form) {
    // Remove todas as mensagens de erro
    const errorMessages = form.querySelectorAll('.form-error-text');
    for (const msg of errorMessages) {
        msg.remove();
    }
    
    // Remove todas as classes de erro dos campos
    const errorFields = form.querySelectorAll('.field-error');
    for (const field of errorFields) {
        field.classList.remove('field-error');
    }
}