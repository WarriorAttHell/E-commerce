<?php
require_once("conexao.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $total = $_POST['total'];

    $query = "SELECT MAX(numeroPedido) AS maxNumeroPedido FROM pedidos";
    $result = $mysqli->query($query);
    $row = $result->fetch_assoc();
    $nextNumeroPedido = $row['maxNumeroPedido'] + 1;
    error_log($nextNumeroPedido);

    $query = "INSERT INTO pedidos (numeroPedido, usuario, valorTotal) VALUES ($nextNumeroPedido, '{$_SESSION['id']}', $total)";
    $result = $mysqli->query($query);

    foreach ($_SESSION['cart'] as $produto) {
        $query = "INSERT INTO itensPedidos (numeroPedido, codigoProduto, precoProduto) VALUES ($nextNumeroPedido, {$produto['codigoProduto']}, {$produto['precoProduto']})";
        $result = $mysqli->query($query);
    }

    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false, "message" => "Método inválido"));
}
?>