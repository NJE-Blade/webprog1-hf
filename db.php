<?php
$host = "localhost";
$db   = "biglanne_webprog";
$user = "root";
$pass = "";
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=UTF8",$user,$pass,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
} catch (PDOException $e) {
    die("Database connection failed");
}
