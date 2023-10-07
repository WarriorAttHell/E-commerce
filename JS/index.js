$(document).ready(function () {
    $(".carrinho").click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "./PHP/validaLoginSessao.php",
            dataType: "json",
            success: function (response) {
                if (response.permissao === true) {
                    window.location.href = "carrinho.html"
                } else {
                    alert("Você precisa estar logado para acessar o carrinho");
                }
            }
        });
    });

    $(".Administracao").click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "./PHP/validaPermissao.php",
            dataType: "json",
            success: function (response) {
                if (response.permissao === true) {
                    window.location.href = "admin.html"
                } else {
                    alert("Você precisa estar logado como Administrador para acessar esta tela.");
                }
            }
        });
    });

    $(".login").click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "./PHP/validaLoginSessao.php",
            dataType: "json",
            success: function (response) {
                if (response.permissao === true) {
                    alert("Você já está logado.");
                } else {
                    window.location.href = "login.html"
                }
            }
        });
    });

    $(".logout").click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "./PHP/limpaSessao.php",
            dataType: "json",
            success: function (response) {
                if (response.permissao === true) {
                    alert("Desconectado.");
                } else {
                    alert("Sessão não limpou");
                }
            }
        });
    });

    $.ajax({
        url: "./PHP/produtos.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var productGrid = document.getElementById("product-grid");
            data.forEach(function (product) {
                var productCard = document.createElement("div");
                productCard.className = "product-card";

                var img = document.createElement("img");
                img.src = product.imagem;
                img.alt = "Produto";
                productCard.appendChild(img);

                var h3 = document.createElement("h3");
                h3.textContent = product.nome;
                productCard.appendChild(h3);

                var pDesc = document.createElement("p");
                pDesc.textContent = product.descricao;
                productCard.appendChild(pDesc);

                var pPrice = document.createElement("p");
                pPrice.className = "price";
                pPrice.textContent = "R$ " + parseFloat(product.precoProduto).toFixed(2);
                productCard.appendChild(pPrice);

                var button = document.createElement("button");
                button.className = "add-to-cart";
                button.textContent = "Adicionar ao Carrinho";
                productCard.appendChild(button);

                // Adicionar o código do produto como um atributo de dados
                productCard.setAttribute("data-codigoProduto", product.codigo);

                // Adicionar um ouvinte de evento de clique ao botão "Adicionar ao Carrinho"
                button.addEventListener('click', function () {
                    var codigoProduto = productCard.getAttribute("data-codigoProduto");
                    var nomeProduto = product.nome;
                    var precoProduto = parseFloat(product.precoProduto);
                    var imagemProduto = product.imagem;

                    // Chame sua função para adicionar ao carrinho aqui, passando as informações do produto
                    adicionarAoCarrinho(codigoProduto, nomeProduto, precoProduto, imagemProduto);
                });

                productGrid.appendChild(productCard);
            });
        }
    });


    function adicionarAoCarrinho(codigoProduto, nomeProduto, precoProduto, imagemProduto) {
        var url = `./PHP/adicionarAoCarrinho.php?codigoProduto=${codigoProduto}&nomeProduto=${encodeURIComponent(nomeProduto)}&precoProduto=${precoProduto}&imagemProduto=${encodeURIComponent(imagemProduto)}`;

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

    $(document).ready(function () {
        // Função para buscar os 5 últimos produtos e preencher o carrossel
        function fetchLatestProducts() {
            $.ajax({
                type: "GET",
                url: "./PHP/carrossel.php", // Altere o caminho para o seu arquivo PHP
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
                        // Limpa o carrossel
                        $(".product-carousel").empty();
    
                        // Preenche o carrossel com os produtos recebidos
                        data.forEach(function (product) {
                            var productSlide = $("<div class='product-slide'></div>");
                            var productImage = $("<img src='" + product.imagem + "' alt='" + product.nome + "'>");
                            var productName = $("<h3>" + product.nome + "</h3>");
    
                            productSlide.append(productImage);
                            productSlide.append(productName);
    
                            $(".product-carousel").append(productSlide);
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Erro ao buscar produtos:", error);
                }
            });
        }
    
        // Chama a função para buscar e preencher os produtos no carrossel
        fetchLatestProducts();
    });

});