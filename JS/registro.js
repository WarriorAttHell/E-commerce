$(document).ready(function () {
    $(".register-button").click(function () {
        var login = $("input[name='login']").val();
        var senha = $("input[name='senha']").val();
        var confirmarSenha = $("input[name='confirmarSenha']").val();

        if (login === '' || senha === '' || confirmarSenha === '') {
            alert("Preencha todos os campos antes de registrar.");
            return;
        }
        if (senha !== confirmarSenha) {
            alert("As senhas digitadas não são iguais.");
            return;
        }

        $.ajax({
            type: "GET",
            url: "PHP/validaLogin.php",
            data: { login: login },
            success: function (response) {
                console.log("Validação do usuário:", response);
                if (response === "valid") {
                    // Nome de usuário disponível, realizar o cadastro
                    cadastrarUsuario(login, senha);
                } else {
                    alert("Nome de usuário já existe. Escolha outro.");
                }
            }
        });
    });

    function cadastrarUsuario(login, senha) {
        $.ajax({
            type: "GET",
            url: "PHP/registro.php",
            data: { login: login, senha: senha },
            success: function (response) {
                if (response === "1") {
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = "login.html";
                } else {
                    alert("Erro ao cadastrar usuário.");
                }
            }
        });
    }

    $(".login-button").click(function () {
        window.location.href = "login.html";
    });
});