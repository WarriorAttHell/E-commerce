$(document).ready(function () {
    // Aplicar a máscara de moeda BRL ao campo precoUnitario
    $("input[name='precoProduto']").maskMoney({
        prefix: 'R$ ',
        allowNegative: false,
        thousands: '.',
        decimal: ','
    });

    // Preencher o campo de seleção de departamento com os dados do servidor
    fetchDepartments();

    $(".btn-primary").click(function (event) {
        event.preventDefault();

        var nomeProduto = $("input[name='nomeProduto']").val();
        var descricaoProduto = $("textarea[name='descricaoProduto']").val();
        var precoProduto = $("input[name='precoProduto']").maskMoney('unmasked')[0]; // Obtém o valor não formatado
        var imagemProduto = $("input[name='imagemProduto']").val();
        var categoria = $("input[name='categoria']").val();
        var idDepartamento = $("select[name='idDepartamento']").val(); // Obtém o ID do departamento selecionado

        cadastrarProduto(nomeProduto, descricaoProduto, precoProduto, imagemProduto, categoria, idDepartamento);
    });

    function cadastrarProduto(nomeProduto, descricaoProduto, precoProduto, imagemProduto, categoria, idDepartamento) {
        $.ajax({
            type: "GET",
            url: "../PHP/cadastroProduto.php",
            data: {
                nomeProduto: nomeProduto,
                descricaoProduto: descricaoProduto,
                precoProduto: precoProduto,
                imagemProduto: imagemProduto,
                categoria: categoria,
                idDepartamento: idDepartamento 
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

    // Função para buscar os departamentos e preencher o campo de seleção
    function fetchDepartments() {
        $.ajax({
            type: "GET",
            url: "../PHP/buscaDepartamento.php",
            dataType: "json",
            success: function (data) {
                if (data.length > 0) {
                    // Limpa o campo de seleção
                    $("select[name='idDepartamento']").empty();

                    // Preenche o campo de seleção com os departamentos recebidos
                    data.forEach(function (department) {
                        $("select[name='idDepartamento']").append(
                            $("<option></option>").attr("value", department.idDepartamento).text(department.descricao)
                        );
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Erro ao buscar departamentos:", error);
            }
        });
    }
});
