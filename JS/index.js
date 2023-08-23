// Simulação de adicionar ao carrinho
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Produto adicionado ao carrinho!');
    });
});
