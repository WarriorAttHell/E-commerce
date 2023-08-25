<!-- produtos.php -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos - E-commerce de Eletrônicos</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <header>
        <nav class="navbar">
            <ul>
                <li><a href="index.php">Home</a></li>
            </ul>
        </nav>
    </header>

    <section class="products">
        <h2>Produtos</h2>
        <div class="product-grid">
            <?php
            // Aqui você pode incluir a lógica para buscar e exibir os produtos do banco de dados
            // Exemplo simplificado:
            $products = [
                ["name" => "Produto 1", "price" => "R$ 999,99", "image" => "product1.jpg", "description" => "Descrição do Produto 1."],
                ["name" => "Produto 2", "price" => "R$ 1499,99", "image" => "product2.jpg", "description" => "Descrição do Produto 2."],
                // Adicione mais produtos aqui
            ];

            foreach ($products as $product) {
                echo '<div class="product-card">';
                echo '<img src="' . $product["image"] . '" alt="' . $product["name"] . '">';
                echo '<h3>' . $product["name"] . '</h3>';
                echo '<p>' . $product["description"] . '</p>';
                echo '<p class="price">' . $product["price"] . '</p>';
                echo '<button class="add-to-cart">Adicionar ao Carrinho</button>';
                echo '</div>';
            }
            ?>
        </div>
    </section>

    <!-- Adicione a paginação aqui, se necessário -->

    <footer>
        <p>&copy; 2023 E-commerce de Eletrônicos</p>
    </footer>
</body>

</html>