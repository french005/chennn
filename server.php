<?php
$file = 'books.txt';
$books = [];

if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        preg_match('/Title:\s*(.*?)\s*\|\s*Author:\s*(.*)/', $line, $matches);
        if ($matches) {
            $books[] = ['title' => $matches[1], 'author' => $matches[2]];
        }
    }
}

header('Content-Type: application/json');
echo json_encode($books);
?>
