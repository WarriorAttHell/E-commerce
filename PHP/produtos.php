<?php
require_once("conexao.php");

$sql = "SELECT imagem, nome, descricao, precoProduto, codigo FROM produtos WHERE (codigo, categoria) IN ( SELECT MIN(codigo), categoria
                                                                                                            FROM produtos
                                                                                                        GROUP BY categoria
                                                                                                                            )
                                                                                                ORDER BY codigo ASC";

$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    error_log(json_encode($data));
    echo json_encode($data);
} else {
    echo "0 results";
}

$mysqli->close();
?>
