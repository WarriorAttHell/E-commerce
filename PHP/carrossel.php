<?php
require_once("conexao.php");

$sql = "SELECT imagem, nome FROM produtos ORDER BY codigo DESC LIMIT 5";
$result = $mysqli->query($sql);

$products = array();
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>
