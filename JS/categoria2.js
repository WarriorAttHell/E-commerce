const productGrid = document.querySelector(".product-grid");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let productsPerPage = 6;
let currentPage = 0;

function updateProducts(products) {
    productGrid.innerHTML = "";
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];

        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.imagem;
        image.alt = product.name;

        const name = document.createElement("h3");
        name.textContent = product.nome;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = product.precoProduto;

        const addToCartButton = document.createElement("button");
        addToCartButton.className = "add-to-cart";
        addToCartButton.textContent = "Adicionar ao Carrinho";

        addToCartButton.addEventListener("click", () => {
            adicionarAoCarrinho(product.codigo, product.nome, product.precoProduto, product.imagem);
        });
        
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(addToCartButton);

        productGrid.appendChild(card);
    }
}

function fetchCategoryProducts() {
    $.ajax({
        url: './PHP/categoria2.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            updateProducts(data);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao obter os dados dos produtos:', error);
        }
    });
}

prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        fetchCategoryProducts();
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    fetchCategoryProducts();
});

fetchCategoryProducts();

function adicionarAoCarrinho(codigoProduto, nomeProduto, precoProduto, imagemProduto) {
    var url = `./PHP/adicionarAoCarrinho.php?codigoProduto=${codigoProduto}&nomeProduto=${encodeURIComponent(nomeProduto)}&precoProduto=${precoProduto}&imagemProduto=${encodeURIComponent(imagemProduto)}`;
    console.log('Produto adicionado ao carrinho:');
    console.log('Código: ' + codigoProduto);
    console.log('Nome: ' + nomeProduto);
    console.log('Preço: ' + precoProduto);
    console.log('Imagem: ' + imagemProduto);
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            if (response.success) {
                //alert("Produto adicionado ao carrinho com sucesso!");
                window.location.href = "carrinho.html"
            } else {
                alert("Erro ao adicionar produto ao carrinho.");
            }
        }
    });
}
