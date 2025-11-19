document.addEventListener("DOMContentLoaded", () => {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("total");
    const limparBtn = document.getElementById("limpar");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = 0;

    carrinho.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.name} - ${item.quantity} x R$ ${item.price.toFixed(2)}`;
        listaCarrinho.appendChild(div);

        total += item.price * item.quantity;
    });

    totalSpan.textContent = total.toFixed(2);

    limparBtn.addEventListener("click", () => {
        localStorage.removeItem("carrinho");
        listaCarrinho.innerHTML = "";
        totalSpan.textContent = "0.00";
        alert("Carrinho limpo!");
    });
});

// CÓDIGO DE LÓGICA DE PAGAMENTO PARA carrinho.js

// Função para processar a finalização da compra (simulação)
function processarCompra(metodo) {
    if (localStorage.getItem("carrinho") === null || JSON.parse(localStorage.getItem("carrinho")).length === 0) {
        alert("Seu carrinho está vazio! Adicione produtos antes de finalizar.");
        return;
    }

    let mensagem = "";
    if (metodo === 'pix') {
        mensagem = "Pedido Finalizado! (Simulação) Favor realizar o pagamento via Pix. Você receberá um e-mail com as instruções.";
    } else if (metodo === 'boleto') {
        mensagem = "Pedido Finalizado! (Simulação) Boleto gerado com sucesso. Você receberá o boleto por e-mail.";
    } else { // Cartão de Crédito
        mensagem = "Pagamento com Cartão aprovado! Obrigado pela sua compra (Simulação).";
    }
    
    // Limpa o carrinho
    localStorage.removeItem("carrinho");

    // Exibe a mensagem de sucesso (opcional, pode ser um alerta também)
    const msgEl = document.getElementById('mensagem-pagamento');
    msgEl.textContent = mensagem;
    msgEl.style.display = 'block';
    
    // Oculta todas as seções de pagamento
    document.querySelectorAll('.secao-pagamento').forEach(sec => sec.style.display = 'none');
    document.querySelector('.botoes-metodo-pagamento').style.display = 'none'; // Oculta os botões de escolha
    
    // Recarrega a visualização do carrinho para mostrar "vazio"
    if (typeof carregarCarrinho === 'function') {
        carregarCarrinho();
    } else {
        // Fallback caso carregarCarrinho não esteja no escopo global
        window.location.reload(); 
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DE ALTERNÂNCIA (Mostrar/Esconder campos) ---
    const botoesMetodo = document.querySelectorAll('.btn-metodo');
    const secaoCartao = document.getElementById('secao-cartao');
    const secaoPix = document.getElementById('secao-pix');
    const secaoBoleto = document.getElementById('secao-boleto');
    const todasSecoesPagamento = document.querySelectorAll('.secao-pagamento');
    const mensagemPagamento = document.getElementById('mensagem-pagamento');

    botoesMetodo.forEach(botao => {
        botao.addEventListener('click', function() {
            // Oculta todas as seções primeiro
            todasSecoesPagamento.forEach(sec => sec.style.display = 'none');
            mensagemPagamento.style.display = 'none'; // Oculta mensagens antigas

            const metodoSelecionado = this.getAttribute('data-metodo');

            if (metodoSelecionado === 'cartao') {
                secaoCartao.style.display = 'block';
            } else if (metodoSelecionado === 'pix') {
                secaoPix.style.display = 'block';
            } else if (metodoSelecionado === 'boleto') {
                secaoBoleto.style.display = 'block';
            }
        });
    });

    // --- LÓGICA DE SUBMISSÃO ---
    
    // 1. Pagamento com Cartão
    const formCartao = document.getElementById('form-cartao');
    if (formCartao) { // Verifica se o formulário existe
        formCartao.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            // Simples validação de campos
            const nomeCartao = document.getElementById('nome-cartao').value;
            const numeroCartao = document.getElementById('numero-cartao').value;
            const validade = document.getElementById('validade').value;
            const cvv = document.getElementById('cvv').value;

            if (nomeCartao.trim() === "" || numeroCartao.length < 16 || validade.length < 5 || cvv.length < 3) {
                alert("Por favor, preencha todos os dados do cartão corretamente.");
                return;
            }

            processarCompra('cartao'); // Chama a função de processamento
            formCartao.reset(); // Limpa o formulário
        });
    }

    // 2. Pagamento via Pix
    const btnFinalizarPix = document.getElementById('btn-finalizar-pix');
    if (btnFinalizarPix) { // Verifica se o botão existe
        btnFinalizarPix.addEventListener('click', () => {
            processarCompra('pix'); // Chama a função de processamento
        });
    }

    // 3. Pagamento via Boleto
    const btnFinalizarBoleto = document.getElementById('btn-finalizar-boleto');
    if (btnFinalizarBoleto) { // Verifica se o botão existe
        btnFinalizarBoleto.addEventListener('click', () => {
            processarCompra('boleto'); // Chama a função de processamento
        });
    }

    // Chama a função para carregar o carrinho quando a página é aberta
    // (Certifique-se que carregarCarrinho() está definida globalmente ou antes deste DOMContentLoaded)
    if (typeof carregarCarrinho === 'function') {
        carregarCarrinho();
    }
});
// Edite/Substitua a sua função processarCompra em carrinho.js

function processarCompra(metodo) {
    // 1. Verifica se o carrinho está vazio antes de processar
    if (localStorage.getItem("carrinho") === null || JSON.parse(localStorage.getItem("carrinho")).length === 0) {
        alert("Seu carrinho está vazio! Adicione produtos antes de finalizar.");
        return;
    }

    // 2. Limpa o carrinho
    localStorage.removeItem("carrinho");

    // 3. Oculta todos os elementos de pagamento
    const opcoesPagamento = document.querySelector('.checkout-opcoes');
    if (opcoesPagamento) {
        opcoesPagamento.style.display = 'none';
    }
    
    // Oculta o botão de limpar carrinho, se ele estiver visível
    const btnLimpar = document.getElementById('limpar');
    if (btnLimpar) {
        btnLimpar.style.display = 'none';
    }

    // 4. Mostra a mensagem de sucesso
    const statusCompra = document.getElementById('status-compra');
    if (statusCompra) {
        statusCompra.style.display = 'block';
    } else {
        // Se a div não for encontrada, usa um alerta simples como fallback
        alert("🎉 Parabéns! Sua compra foi aprovada! 🎉");
    }

    // 5. Recarrega a visualização do carrinho para mostrar o total R$ 0.00
    if (typeof carregarCarrinho === 'function') {
        carregarCarrinho();
    }
}