<?php
session_start();

// Limpar todas as variáveis de sessão
$_SESSION = array();

// Encerrar a sessão
session_destroy();
if (isset($_SESSION['login']) && $_SESSION['login'] !== "") {
    echo json_encode(array('permissao' => false));
} else {
    echo json_encode(array('permissao' => true));
}
?>