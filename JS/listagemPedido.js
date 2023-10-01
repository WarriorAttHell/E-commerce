// Declare a variável 'pedidos' como um array vazio antes de usá-la
var pedidos = [];

$(document).ready(function () {
    // Fazer uma requisição AJAX para buscar os pedidos da tabela
    $.ajax({
        url: '../PHP/pedidos.php', 
        dataType: 'json',
        success: function (data) {
            console.log('Dados recebidos:', data);
            // Iterar sobre os dados e preencher o array de pedidos
            data.forEach(function (pedidoData) {
                // Preencher o objeto de pedido
                var pedido = {
                    numeroPedido: pedidoData.numeroPedido,
                    cliente: pedidoData.cliente,
                    dataPedido: pedidoData.dataPedido,
                    valorTotal: pedidoData.valorTotal
                };

                // Adicionar o pedido ao array de pedidos
                pedidos.push(pedido);
                // Chamar a função para atualizar a lista de pedidos
                atualizarListaPedidos();
            });

            // Agora o array 'pedidos' está preenchido com os dados da tabela
            console.log(pedidos);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao obter os pedidos:', error);
        }
    });
});

// Função para atualizar a lista de pedidos
function atualizarListaPedidos() {
    const listaPedidos = document.getElementById("pedidoList");

    // Limpar a lista existente
    listaPedidos.innerHTML = "";

    // Iterar sobre os pedidos e criar elementos tr e td
    pedidos.forEach((pedido) => {
        const tr = document.createElement("tr");

        const numeroPedidoTd = document.createElement("td");
        numeroPedidoTd.textContent = pedido.numeroPedido;

        const clienteTd = document.createElement("td");
        clienteTd.textContent = pedido.cliente;

        const dataPedidoTd = document.createElement("td");
        dataPedidoTd.textContent = pedido.dataPedido;

        const valorTotalTd = document.createElement("td");
        valorTotalTd.textContent = `R$ ${pedido.valorTotal}`;

        // Adicionar as células (td) à linha (tr)
        tr.appendChild(numeroPedidoTd);
        tr.appendChild(clienteTd);
        tr.appendChild(dataPedidoTd);
        tr.appendChild(valorTotalTd);

        // Adicionar a linha (tr) à lista de pedidos (tbody)
        listaPedidos.appendChild(tr);
    });
}

var dadosGrafico = {
    labels: [],
    datasets: [
        {
            label: "Número de Pedidos",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: []
        },
        {
            label: "Faturamento",
            backgroundColor: [], // Cor de base para a barra de faturamento
            borderColor: [], // Cor de base para a borda da barra de faturamento
            borderWidth: 1,
            data: []
        }
    ]
};

// Variáveis para armazenar os gráficos
var graficoBarrasPedidos;
var graficoBarrasFaturamento;

// Opções de configuração dos gráficos
const opcoesGrafico = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Função para buscar os dados do gráfico no PHP
function buscarDadosGrafico() {
    $.ajax({
        url: '../PHP/grafico.php', // Substitua pelo caminho correto
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('Dados do gráfico recebidos:', data);

            // Ordenar os dados do gráfico pelo número do mês
            data.labels.sort(function (a, b) {
                const meses = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                const mesA = meses.indexOf(a);
                const mesB = meses.indexOf(b);

                return mesA - mesB;
            });

            // Calcular o valor máximo total de pedidos durante o período
            const valorMaximoPedidos = Math.max(...data.datasets[0].data);

            // Atualizar as cores da coluna de faturamento nos dados do gráfico
            const coresBarrasFaturamento = calcularCoresBarrasFaturamento(data.datasets[0].data, valorMaximoPedidos);
            dadosGrafico.datasets[1].backgroundColor = coresBarrasFaturamento.backgroundColors;
            dadosGrafico.datasets[1].borderColor = coresBarrasFaturamento.borderColors;

            // Atualize os dados dos gráficos com os dados recebidos do PHP
            dadosGrafico.labels = data.labels;
            dadosGrafico.datasets[0].data = data.datasets[0].data;
            dadosGrafico.datasets[1].data = data.datasets[1].data;

            // Chame as funções para criar os gráficos após receber os dados
            criarGraficoPedidos();
            criarGraficoFaturamento();
        },
        error: function (xhr, status, error) {
            console.error('Erro ao obter os dados do gráfico:', error);
        }
    });
}

// Função para criar o gráfico de pedidos
function criarGraficoPedidos() {
    // Se o gráfico de pedidos já existe, destrua-o primeiro
    if (graficoBarrasPedidos) {
        graficoBarrasPedidos.destroy();
    }

    // Obter o contexto do elemento canvas do gráfico de pedidos
    const contextoGraficoPedidos = document.getElementById("barChartPedidos").getContext("2d");

    // Criar o gráfico de barras de pedidos com os novos dados
    graficoBarrasPedidos = new Chart(contextoGraficoPedidos, {
        type: "bar",
        data: {
            labels: dadosGrafico.labels,
            datasets: [dadosGrafico.datasets[0]]
        },
        options: opcoesGrafico
    });
}

// Função para criar o gráfico de faturamento
function criarGraficoFaturamento() {
    // Se o gráfico de faturamento já existe, destrua-o primeiro
    if (graficoBarrasFaturamento) {
        graficoBarrasFaturamento.destroy();
    }

    // Obter o contexto do elemento canvas do gráfico de faturamento
    const contextoGraficoFaturamento = document.getElementById("barChartFaturamento").getContext("2d");

    // Criar o gráfico de barras de faturamento com os novos dados
    graficoBarrasFaturamento = new Chart(contextoGraficoFaturamento, {
        type: "bar",
        data: {
            labels: dadosGrafico.labels,
            datasets: [dadosGrafico.datasets[1]]
        },
        options: opcoesGrafico
    });
}

// Função para calcular as cores das barras de faturamento com base no valor total de pedidos
function calcularCoresBarrasFaturamento(valoresDePedidos, valorMaximoPedidos) {
    const backgroundColors = [];
    const borderColors = [];

    valoresDePedidos.forEach(function (valor) {
        const escalaVerde = valor / valorMaximoPedidos * 255;
        const escalaVermelha = (valorMaximoPedidos - valor) / valorMaximoPedidos * 255;

        const corBarra = `rgba(${escalaVermelha}, ${escalaVerde}, 0, 0.2)`;
        
        backgroundColors.push(corBarra);
        borderColors.push(corBarra);
    });

    return { backgroundColors, borderColors };
}

// Chame a função para buscar os dados dos gráficos assim que o documento estiver pronto
$(document).ready(function () {
    buscarDadosGrafico();
});

