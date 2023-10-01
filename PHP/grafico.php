<?php
// Conexão com o banco de dados
require_once('conexao.php');

// Consulta para obter os dados do gráfico, incluindo o valor de faturamento
$sql = "SELECT DATE_FORMAT(emissao, '%M') AS mes, COUNT(*) AS quantidadePedidos, SUM(valorTotal) AS valorFaturamento FROM pedidos GROUP BY mes ORDER BY MONTH(emissao)";

$result = $mysqli->query($sql);

// Verifica se a consulta teve sucesso
if ($result) {
    $dadosGrafico = array(
        "labels" => [],
        "datasets" => [
            [
                "label" => "Número de Pedidos",
                "backgroundColor" => "rgba(75, 192, 192, 0.2)",
                "borderColor" => "rgba(75, 192, 192, 1)",
                "borderWidth" => 1,
                "data" => []
            ],
            [
                "label" => "Faturamento",
                "backgroundColor" => [], // Cor da barra de faturamento
                "borderColor" => [], // Cor da borda da barra de faturamento
                "borderWidth" => 1,
                "data" => []
            ]
        ]
    );

    while ($row = $result->fetch_assoc()) {
        // Preencha os dados do gráfico
        $dadosGrafico["labels"][] = $row["mes"];
        $dadosGrafico["datasets"][0]["data"][] = $row["quantidadePedidos"];

        // Preencha os dados de faturamento
        $dadosGrafico["datasets"][1]["data"][] = $row["valorFaturamento"];
    }

    // Defina a meta de faturamento (100.000) - substitua pelo valor desejado
    $metaDeFaturamento = 100.000;

    // Calcule as cores das barras de faturamento com base na proximidade da meta
    $coresBarrasFaturamento = calcularCoresBarrasFaturamento($dadosGrafico["datasets"][1]["data"], $metaDeFaturamento);

    $dadosGrafico["datasets"][1]["backgroundColor"] = $coresBarrasFaturamento["backgroundColors"];
    $dadosGrafico["datasets"][1]["borderColor"] = $coresBarrasFaturamento["borderColors"];

    // Retorna os dados do gráfico como JSON
    echo json_encode($dadosGrafico);
} else {
    // Se houve um erro na consulta
    echo json_encode(array('error' => 'Erro na consulta ao banco de dados.'));
}

$mysqli->close();  // Fecha a conexão com o banco de dados

// Função para calcular as cores das barras de faturamento com base na proximidade da meta
function calcularCoresBarrasFaturamento($valoresDeFaturamento, $metaDeFaturamento) {
    $backgroundColors = [];
    $borderColors = [];
    
    foreach ($valoresDeFaturamento as $valor) {
        $diferencaDaMeta = $metaDeFaturamento - $valor;
        $corBarra = "";
        
        // Defina uma cor padrão, por exemplo, verde
        $corPadrao = "rgba(0, 255, 0, 0.2)";
        
        // Verifique se o valor está abaixo da meta
        if ($diferencaDaMeta > 0) {
            // Calcule uma cor mais vermelha com base na proximidade
            $vermelho = 255 - ($diferencaDaMeta / $metaDeFaturamento) * 255;
            $corBarra = "rgba($vermelho, 0, 0, 0.2)";
        } else {
            // O valor está acima ou igual à meta, use a cor padrão (verde)
            $corBarra = $corPadrao;
        }

        $backgroundColors[] = $corBarra;
        $borderColors[] = $corBarra;
    }

    return array("backgroundColors" => $backgroundColors, "borderColors" => $borderColors);
}
?>
