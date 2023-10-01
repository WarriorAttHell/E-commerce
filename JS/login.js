$(document).ready(function () {
    $(".login-button").click(function () {
        var login = $("input[name='login']").val();
        var senha = $("input[name='senha']").val();
        $.ajax({
            type: "GET",
            url: "./PHP/login.php",
            data: { login: login, senha: senha },
            success: function (response) {
                if (response === "1") {
                    //alert("Login bem-sucedido!");
                    window.location.href = "index.html";
                } else {
                    alert("Login falhou. Verifique suas credenciais.");
                }
            }
        });
    });
});
$(document).ready(function () {
    $(".register-button").click(function () {
        // Redireciona para a página de registro
        window.location.href = "registro.html";
    });
});