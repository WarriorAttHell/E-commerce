<?php
require_once("conexao.php");

$login = $mysqli->real_escape_string($_GET['login']);
$senha = $mysqli->real_escape_string($_GET['senha']);
$senha = md5($senha);

$sql_code = "INSERT INTO usuarios (login, senha) VALUES ('$login', '$senha')";		
$sql_query = $mysqli->query($sql_code);

if ($sql_query == 1 ){
	echo "1";
}else{	
	echo "0";
}
?>