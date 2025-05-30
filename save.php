<?php 
require_once '../config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = isset($_POST['title']) && trim($_POST['title']) !== '' ? trim($_POST['title']) : 'Untitled';
    $author = isset($_POST['author']) && trim($_POST['author']) !== '' ? trim($_POST['author']) : 'Unknown Author';
    $cover_id = isset($_POST['cover_id']) ? trim($_POST['cover_id']) : null;

    $stmt = $conn->prepare("INSERT INTO books (title, author, cover_id) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $author, $cover_id);

    if ($stmt->execute()) {
        echo "<script>alert('Book saved successfully!'); window.history.back();</script>";
    } else {
        echo "<script>alert('Error saving book.'); window.history.back();</script>";
    }
} else {
    header("Location: ../index.php");
    exit();
}

$conn->close();
?>
