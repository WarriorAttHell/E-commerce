<?php
require_once("conexao.php");


$nomeProduto = $mysqli->real_escape_string($_GET['nomeProduto']);
$descricaoProduto = $mysqli->real_escape_string($_GET['descricaoProduto']);
$precoProduto = $mysqli->real_escape_string($_GET['precoProduto']);
$imagemProduto = $mysqli->real_escape_string($_GET['imagemProduto']);
$categoria = $mysqli->real_escape_string($_GET['categoria']);
$departamento = $mysqli->real_escape_string($_GET['idDepartamento']);



$sql_code = "INSERT INTO produtos (Nome, Descricao, precoProduto, Imagem, categoria, idDepartamento) VALUES ('$nomeProduto', '$descricaoProduto', '$precoProduto', '$imagemProduto', '$categoria', '$departamento')";		
$sql_query = $mysqli->query($sql_code);
error_log($sql_query);

if ($sql_query == 1 ){
	echo "1";
}else{	
	echo "0";
}
?>