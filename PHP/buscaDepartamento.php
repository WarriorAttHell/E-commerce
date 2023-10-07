<?php
require_once("conexao.php");

// Consulta SQL para buscar os departamentos
$sql = "SELECT idDepartamento, descricao FROM departamento";

$result = $mysqli->query($sql);

if ($result === false) {
    die("Erro na consulta SQL: " . $mysqli->error);
}

// Criar um array para armazenar os resultados
$departments = array();

// Percorrer os resultados e adicionar ao array
while ($row = $result->fetch_assoc()) {
    $departments[] = $row;
}

// Fechar a conexão com o banco de dados
$mysqli->close();

// Converter o array em JSON e imprimir a resposta
header('Content-Type: application/json');
echo json_encode($departments);
?>
