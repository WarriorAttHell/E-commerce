<?php
require_once("conexao.php");

$descricaoDepartamento = $mysqli->real_escape_string($_POST['descricaoDepartamento']); // Alterado de $_GET para $_POST

$sql_code = "INSERT INTO departamento (descricao) VALUES ('$descricaoDepartamento')";		
$sql_query = $mysqli->query($sql_code);

if ($sql_query == 1 ){
	echo "1";
} else {	
	echo "0";
}
?>
