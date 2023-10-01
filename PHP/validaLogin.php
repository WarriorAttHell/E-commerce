<?php
require_once("conexao.php");

$login = $mysqli->real_escape_string($_GET['login']);

$sql_code = "SELECT * FROM usuarios WHERE login = '$login'";      
$sql_query = $mysqli->query($sql_code);

$quantidade = $sql_query->num_rows;

if ($quantidade == 0) { 
    echo "valid"; // Nome de usuário é válido
} else {    
    echo "invalid"; // Nome de usuário já existe
}
?>