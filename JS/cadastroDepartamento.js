$(document).ready(function () {

    $(".btn-primary").click(function (event) {
        event.preventDefault();

        var descricaoDepartamento = $("input[name='descricaoDepartamento']").val();

        cadastrarDepartamento(descricaoDepartamento);
    });

    function cadastrarDepartamento(descricaoDepartamento) {
        $.ajax({
            type: "POST",
            url: "../PHP/cadastroDepartamento.php",
            data: {

                descricaoDepartamento : descricaoDepartamento,

            },
            success: function (response) {
                if (response === "1") {
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = "cadastroDepartamento.html";
                } else {
                    alert("Erro ao cadastrar departamento.");
                }
            }
        });
    }

        });

