<?php
header("Content-Type: application/json; charset=utf-8");
require "db.php";

$action = $_POST['action'] ?? '';

switch ($action) {

    case 'read':
        try {
            $stmt = $pdo->query("SELECT * FROM gep ORDER BY id");
            echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Read error']);
        }
        break;

    case 'read_processzor':
        try {
            $stmt = $pdo->query("SELECT * FROM processzor ORDER BY id");
            echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Read error']);
        }
        break;

    case 'read_oprendszer':
        try {
            $stmt = $pdo->query("SELECT * FROM oprendszer ORDER BY id");
            echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Read error']);
        }
        break;

    case 'create':
        try {
            $stmt = $pdo->prepare("INSERT INTO gep (gyarto, tipus, kijelzo, memoria, merevlemez, videovezerlo, ar, processzorid, oprendszerid, db) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $_POST['gyarto'],
                $_POST['tipus'],
                $_POST['kijelzo'],
                intval($_POST['memoria']),
                intval($_POST['merevlemez']),
                $_POST['videovezerlo'],
                intval($_POST['ar']),
                intval($_POST['processzorid']),
                intval($_POST['oprendszerid']),
                intval($_POST['db'])
            ]);
            echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Create error']);
        }
        break;

    case 'update':
        try {
            $stmt = $pdo->prepare("UPDATE gep SET gyarto=?, tipus=?, kijelzo=?, memoria=?, merevlemez=?, videovezerlo=?, ar=?, processzorid=?, oprendszerid=?, db=? WHERE id=?");
            $stmt->execute([
                $_POST['gyarto'],
                $_POST['tipus'],
                $_POST['kijelzo'],
                intval($_POST['memoria']),
                intval($_POST['merevlemez']),
                $_POST['videovezerlo'],
                intval($_POST['ar']),
                intval($_POST['processzorid']),
                intval($_POST['oprendszerid']),
                intval($_POST['db']),
                intval($_POST['id'])
            ]);
            echo json_encode(['status' => 'success']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Update error']);
        }
        break;

    case 'delete':
        try {
            $stmt = $pdo->prepare("DELETE FROM gep WHERE id=?");
            $stmt->execute([intval($_POST['id'])]);
            echo json_encode(['status' => 'success']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Delete error']);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Unknown action']);
}
