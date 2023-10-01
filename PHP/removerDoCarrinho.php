<?php
require_once("conexao.php");

if (isset($_GET['codigoProduto'])) {
    $codigoProduto = $_GET['codigoProduto'];
    error_log($codigoProduto);
    // Query para deletar o produto do carrinho
    $sql = "DELETE FROM carrinho WHERE codigoProduto = $codigoProduto";

    if ($mysqli->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Produto removido do carrinho com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao remover produto do carrinho: ' . $mysqli->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'ID do produto não recebido.']);
}


?>