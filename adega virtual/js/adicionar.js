document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".add-to-cart");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const produtoNome = botao.getAttribute("data-name");
            const precoString = botao.getAttribute("data-price");
            const produtoPreco = parseFloat(precoString);

            const produtoCard = botao.closest('.card');
            if (!produtoCard) return;

            const quantidadeInput = produtoCard.querySelector(".quantidade");
            if (!quantidadeInput) return;

            const quantidade = parseInt(quantidadeInput.value);

            if (isNaN(produtoPreco) || isNaN(quantidade) || quantidade < 1) return;

            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            const itemExistente = carrinho.find(item => item.name === produtoNome);
            if (itemExistente) {
                itemExistente.quantity += quantidade;
            } else {
                carrinho.push({ name: produtoNome, price: produtoPreco, quantity: quantidade });
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            alert(produtoNome + " adicionado ao carrinho!");
        });
    });
});
