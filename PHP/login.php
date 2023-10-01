<?php
require_once("conexao.php");
	
session_start();

$login = $mysqli->real_escape_string($_GET['login']);
$senha = $mysqli->real_escape_string($_GET['senha']);
$senha = md5($senha);

$sql_code = "SELECT * FROM usuarios WHERE login = '$login' AND senha = '$senha'";		
$sql_query = $mysqli->query($sql_code);
if ($sql_query) {
    $quantidade = $sql_query->num_rows;
    if ($quantidade == 1) {
        $row = $sql_query->fetch_assoc();
        $_SESSION["id"] =  $row["id"];
        $_SESSION["login"] =  $row["login"];
        $_SESSION["permissao"] = $row["permissao"];
        echo "1";
    } else {
        echo $quantidade;
    }
} else {
    echo "Erro na consulta SQL: ";
}
?>