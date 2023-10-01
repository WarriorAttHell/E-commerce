function removeFromCart(codigoProduto) {
    var url = `./PHP/removerDoCarrinho.php?codigoProduto=${codigoProduto}`;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.success) {
                loadCartProducts();
            } else {
                console.error('Erro ao remover o produto do carrinho:', data.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro ao remover o produto do carrinho:', error);
        }
    });
}

function limparCarrinho() {
    var url = `./PHP/limparCarrinho.php`;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.success) {
            } else {
                console.error('Erro ao limpar carrinho: ', data.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro ao limpar carrinho: ', error);
        }
    });
}


function loadCartProducts() {
    $.ajax({
        url: "./PHP/itensCarrinho.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var cartProductsDiv = $("#cart-products");
            cartProductsDiv.empty();

            data.forEach(function (product) {
                var productCart = $("<div class='product-cart'></div>");

                var img = $("<img>");
                img.attr("src", product.imagem);
                img.attr("alt", product.nomeProduto);
                productCart.append(img);

                var h3 = $("<h3>").text(product.nomeProduto);
                productCart.append(h3);

                var pPrice = $("<p class='product-price'></p>").text("R$ " + parseFloat(product.precoProduto).toFixed(2));
                productCart.append(pPrice);

                var button = $("<button class='remove-from-cart'>Remover do Carrinho</button>");
                productCart.append(button);

                // Obtém o código do produto corretamente
                var codigoProduto = product.codigoProduto;

                // Configura o atributo data com o código do produto
                productCart.attr("data-codigoProduto", codigoProduto);

                button.on("click", function () {
                    // Obtém o código do produto a partir dos dados do produto clicado
                    var codigoProdutoClicado = $(this).closest('.product-cart').attr("data-codigoProduto");
                    removeFromCart(codigoProdutoClicado);
                });

                cartProductsDiv.append(productCart);
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao obter os produtos do carrinho:', error);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const paymentRadios = document.querySelectorAll('input[type="radio"][name="payment"]');
    const paymentDescriptions = document.querySelectorAll(".payment-description");
    const finalizarCompraButton = document.getElementById("finalizar-compra");

    paymentRadios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            const selectedPayment = document.querySelector('input[type="radio"][name="payment"]:checked').value;

            paymentDescriptions.forEach(function (description) {
                description.style.display = "none";
            });

            const selectedDescription = document.querySelector(`#${selectedPayment}-description`);
            if (selectedDescription) {
                selectedDescription.style.display = "block";
                finalizarCompraButton.style.display = "block";
            } else {
                finalizarCompraButton.style.display = "none";
            }
        });
    });
});

$(document).ready(function () {
    loadCartProducts();
    $(document).on('click', '.remove-from-cart', function () {
        var codigoProduto = $(this).closest('.product-cart').data('product-id');
        removeFromCart(codigoProduto);
    });    

    // Manipulador de envio do formulário
    $("#finalizar-compra").on('click', function (e) {       
        
        e.preventDefault(); // Evitar o comportamento padrão de um formulário

        // Obtém o valor total dos itens
        var total = 0;
        var products = document.querySelectorAll(".product-cart");
        products.forEach(function (product) {
            var price = parseFloat(product.querySelector(".product-price").innerText.replace("R$ ", ""));
            total += price;
        });

        // Use AJAX para enviar os dados ao PHP para inserção
        $.ajax({            
            url: "./PHP/finalizarCompra.php",
            type: "POST", // Alterado para POST
            dataType: "json",
            data: { total: total },
            success: function (data) {
                if (data.success) {
                    alert("Compra realizada com sucesso!");
                    limparCarrinho()
                    window.location.href = "index.html";
                } else {
                    alert("Erro ao finalizar a compra: " + data.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('Erro ao finalizar a compra:', error);
            }
        });
    });
});


