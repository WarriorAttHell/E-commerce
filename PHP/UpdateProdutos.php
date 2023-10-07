<?php
require_once("conexao.php");

// Função para buscar todos os produtos da tabela
function listarProdutos() {
    global $mysqli;

    $query = "SELECT codigo, nome, descricao, precoProduto, imagem, idDepartamento, categoria FROM produtos";
    $result = $mysqli->query($query);

    $produtos = array();

    while ($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
    
    return $produtos;
}

// Função para atualizar um produto
function atualizarProduto($id, $nome, $descricao, $precoProduto, $imagem, $idDepartamento, $categoria) {
    global $mysqli;

    $query = "UPDATE produtos SET nome='$nome', descricao='$descricao', precoProduto='$precoProduto', imagem = '$imagem', idDepartamento = '$idDepartamento', categoria = '$categoria' WHERE codigo=$id";
    $result = $mysqli->query($query);

    return $result;
}

// Função para excluir um produto
function excluirProduto($id) {
    global $mysqli;

    $query = "DELETE FROM produtos WHERE codigo=$id";
    $result = $mysqli->query($query);

    return $result;
}

// Verifica a ação a ser executada (listar, atualizar ou excluir)
if (isset($_GET['action'])) {
    if ($_GET['action'] === 'listar') {
        $produtos = listarProdutos();
        echo json_encode($produtos);
    } elseif ($_GET['action'] === 'atualizar') {
        $id = $_GET['id']; 
        $nome = $_GET['nome'];
        $descricao = $_GET['descricao'];
        $precoProduto = $_GET['precoProduto'];
        $imagem = $_GET['imagem'];
        $idDepartamento = $_GET['idDepartamento'];
        $categoria = $_GET['categoria'];

        $result = atualizarProduto($id, $nome, $descricao, $precoProduto, $imagem, $idDepartamento, $categoria);
        

        if ($result) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    } elseif ($_GET['action'] === 'excluir') {
        $id = $_GET['id'];

        $result = excluirProduto($id);

        if ($result) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    }
}
?>