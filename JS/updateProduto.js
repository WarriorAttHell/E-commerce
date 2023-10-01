$(document).ready(function () {
    listarProdutos();

    // Função para listar os produtos na grid
    function listarProdutos() {
        $.ajax({
            type: "GET",
            url: "../PHP/UpdateProdutos.php?action=listar",
            dataType: "json",
            success: function (data) {
                console.log(data);
                var productGrid = $("#product-list");
                productGrid.empty();
                console.log(data)

                $.each(data, function (index, product) {
                    var productRow = $("<tr>");

                    $("<td>").text(product.codigo).appendTo(productRow);
                    $("<td>").text(product.nome).appendTo(productRow);
                    $("<td>").text(product.descricao).appendTo(productRow);
                    $("<td>").text("R$ " + parseFloat(product.precoProduto).toFixed(2)).appendTo(productRow);
                    $("<td>").text(product.imagem).appendTo(productRow);
                    $("<td>").html('<button class="edit-button" data-id="' + product.codigo + '">Editar</button>' +
                        '<button class="delete-button" data-id="' + product.codigo + '">Excluir</button>').appendTo(productRow);

                    productRow.appendTo("#product-list");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Erro na solicitação AJAX: " + textStatus, errorThrown);
            }
        });
    }

    // Evento de clique no botão Editar
    $("#product-list").on("click", ".edit-button", function () {
        var id = $(this).data("id");
        var row = $(this).closest("tr");
        var nome = row.find("td:eq(1)").text();
        var descricao = row.find("td:eq(2)").text();
        var precoProduto = row.find("td:eq(3)").text();
        precoProduto = parseFloat(precoProduto.replace("R$ ", "").replace(",", ".")); // Converter para número
        var imagem = row.find("td:eq(4)").text();

        // Salvar os dados originais em variáveis de data-
        row.data("original-nome", nome);
        row.data("original-descricao", descricao);
        row.data("original-precoProduto", precoProduto);
        row.data("original-imagem", imagem);

        // Substituir elementos de texto por campos de edição
        row.find("td:eq(1)").html('<input type="text" class="edit-input" id="edit-nome" value="' + nome + '">');
        row.find("td:eq(2)").html('<input type="text" class="edit-input" id="edit-descricao" value="' + descricao + '">');
        row.find("td:eq(3)").html('<input type="text" class="edit-input" id="edit-precoProduto" value="' + precoProduto + '">');
        row.find("td:eq(4)").html('<input type="text" class="edit-input" id="edit-imagem" value="' + imagem + '">');

        // Substituir botão "Editar" por botões "Salvar" e "Cancelar"
        row.find("td:eq(5)").html('<button class="save-button" data-id="' + id + '">Salvar</button>' +
            '<button class="cancel-button">Cancelar</button>');

        // Ocultar o botão "Editar" atual
        $(this).hide();
    });

    // Evento de clique no botão Excluir
    $("#product-list").on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Deseja realmente excluir este produto?")) {
            excluirProduto(id);
        }
    });

    // Evento de clique no botão Cancelar
    $("#product-list").on("click", ".cancel-button", function () {
        var row = $(this).closest("tr");
        row.find("td:eq(1)").html(row.data("original-nome"));
        row.find("td:eq(2)").html(row.data("original-descricao"));
        row.find("td:eq(3)").html("R$ " + parseFloat(row.data("original-precoProduto")).toFixed(2));
        row.find("td:eq(4)").html(row.data("original-imagem"));
        row.find("td:eq(5)").html('<button class="edit-button" data-id="' + row.find(".save-button").data("id") + '">Editar</button>' +
            '<button class="delete-button" data-id="' + row.find(".save-button").data("id") + '">Excluir</button>');

        // Exibir o botão "Editar" novamente
        row.find(".edit-button").show();
    });

    // Função para atualizar um produto
    function atualizarProduto(id, nome, descricao, precoProduto, imagem) {
        $.ajax({
            type: "GET",
            url: "../PHP/UpdateProdutos.php?action=atualizar",
            data: { id: id, nome: nome, descricao: descricao, precoProduto: precoProduto, imagem: imagem },
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    listarProdutos(); // Atualizar a lista após a edição
                } else {
                    alert("Erro ao atualizar o produto.");
                }
            }
        });
    }

    // Função para excluir um produto
    function excluirProduto(id) {
        $.ajax({
            type: "GET",
            url: "../PHP/UpdateProdutos.php?action=excluir&id=" + id,
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    listarProdutos(); // Atualizar a lista após a exclusão
                } else {
                    alert("Erro ao excluir o produto.");
                }
            }
        });
    }
    // Evento de clique no botão Salvar (adicionado dinamicamente)
    $("#product-list").on("click", ".save-button", function () {
        var id = $(this).data("id");
        var row = $(this).closest("tr");
        var nome = row.find("#edit-nome").val();
        var descricao = row.find("#edit-descricao").val();
        var precoProduto = row.find("#edit-precoProduto").val();
        var imagem = row.find("#edit-imagem").val();

        // Chamar a função para atualizar o produto
        atualizarProduto(id, nome, descricao, precoProduto, imagem);
    });
});