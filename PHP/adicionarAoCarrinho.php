<?php
require_once("conexao.php");

session_start();

$codigoProduto = $_GET['codigoProduto'];
$nomeProduto = urldecode($_GET['nomeProduto']);
$precoProduto = $_GET['precoProduto'];
$imagemProduto = urldecode($_GET['imagemProduto']);
$usuario = $_SESSION['id'];

$sql = "INSERT INTO carrinho (codigoProduto, nomeProduto, precoProduto, imagem, idUsuario) VALUES ('$codigoProduto', '$nomeProduto', '$precoProduto', '$imagemProduto', '$usuario')";

if ($mysqli->query($sql) === TRUE) {
    $response = array('success' => true);
} else {
    $response = array('success' => false);
}

echo json_encode($response);
?>
