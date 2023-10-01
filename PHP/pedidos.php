<?php
// Conexão com o banco de dados
require_once('conexao.php');

// Consulta para obter os pedidos
$sql = "SELECT * FROM pedidos";
$result = $mysqli->query($sql);
// Verifica se a consulta teve sucesso
if ($result) {
    $pedidos = array();
    while ($row = $result->fetch_assoc()) {
        // Buscar o nome do cliente com base no idUsuario
        $cliente = buscarNomeCliente($row['usuario'], $mysqli);

        // Monta o objeto de pedido
        $pedido = array(
            'numeroPedido' => $row['numeroPedido'],
            'cliente' => $cliente,
            'dataPedido' => $row['emissao'],
            'valorTotal' => $row['valorTotal']
        );

        // Adiciona o pedido ao array de pedidos
        $pedidos[] = $pedido;
    }

    // Retorna os pedidos como JSON
    echo json_encode($pedidos);
} else {
    // Se houve um erro na consulta
    echo json_encode(array('error' => 'Erro na consulta ao banco de dados.'));
}

// Função para buscar o nome do cliente a partir do id do usuário
function buscarNomeCliente($idUsuario, $mysqli) {
    // Consulta para obter o nome do cliente com base no idUsuario
    $sql = "SELECT login FROM usuarios WHERE id = $idUsuario";
    $result = $mysqli->query($sql);

    // Verifica se a consulta teve sucesso
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $nomeCliente = $row['login'];
        return $nomeCliente;
    } else {
        return 'Cliente Desconhecido';
    }
}

$mysqli->close();  // Fecha a conexão com o banco de dados
?>
