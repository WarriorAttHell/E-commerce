$(document).ready(function () {
    // Aplicar a máscara de moeda BRL ao campo precoUnitario
    $("input[name='precoProduto']").maskMoney({
        prefix: 'R$ ',
        allowNegative: false,
        thousands: '.',
        decimal: ','
    });

    $(".btn-primary").click(function (event) {
        event.preventDefault();

        var nomeProduto = $("input[name='nomeProduto']").val();
        var descricaoProduto = $("textarea[name='descricaoProduto']").val();
        var precoProduto = $("input[name='precoProduto']").maskMoney('unmasked')[0]; // Obtém o valor não formatado
        var imagemProduto = $("input[name='imagemProduto']").val();
        var categoria = $("input[name='categoria']").val();

        cadastrarProduto(nomeProduto, descricaoProduto, precoProduto, imagemProduto, categoria);
    });

    function cadastrarProduto(nomeProduto, descricaoProduto, precoProduto, imagemProduto, categoria) {
        $.ajax({
            type: "GET",
            url: "../PHP/cadastroProduto.php",
            data: {
                nomeProduto : nomeProduto,
                descricaoProduto : descricaoProduto,
                precoProduto : precoProduto,
                imagemProduto : imagemProduto,
                categoria : categoria
            },
            success: function (response) {
                if (response === "1") {
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = "cadastroProduto.html";
                } else {
                    alert("Erro ao cadastrar produto.");
                }
            }
        });
    }

        });

