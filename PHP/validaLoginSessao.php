<?php
session_start();

if (isset($_SESSION['login']) && $_SESSION['login'] !== "" ) {
    echo json_encode(array('permissao' => true));
} else {
    echo json_encode(array('permissao' => false));
}
?>
