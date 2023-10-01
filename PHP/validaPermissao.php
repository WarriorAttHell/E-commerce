<?php
session_start();

if (isset($_SESSION['login']) && $_SESSION['login'] !== "" && isset($_SESSION['permissao']) && $_SESSION['permissao'] === "2") {
    echo json_encode(array('permissao' => true));
} else {
    echo json_encode(array('permissao' => false));
}
?>
