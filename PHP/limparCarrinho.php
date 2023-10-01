<?php
require_once("conexao.php");

session_start();

$usuario = $_SESSION['id'];

if (isset($usuario)) {
    

    error_log($usuario);
    // Query para deletar o produto do carrinho
    $sql = "DELETE FROM carrinho WHERE idUsuario = $usuario";

    if ($mysqli->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Carrinho limpo com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao limpar carrinho: ' . $mysqli->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'ID do usuário não recebido.']);
}


?>