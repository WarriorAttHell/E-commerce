<?php
require_once("conexao.php");

session_start();

$sql = "SELECT * FROM carrinho";
$result = $mysqli->query($sql);

$products = array();

// Se houver resultados, monta o array com os produtos
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = array(
            'codigoProduto' => $row['codigoProduto'],
            'nomeProduto' => $row['nomeProduto'],
            'precoProduto' => $row['precoProduto'],
            'imagem' => $row['imagem']           
        );
    }
    $_SESSION['cart'] = $products;
}

// Retorna os produtos em formato JSON
header('Content-Type: application/json');
echo json_encode($products);

$mysqli->close();
?>
