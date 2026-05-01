<<<<<<< HEAD
<?php
require_once 'config.php';

$sql = "SELECT * FROM transactions ORDER BY date DESC, id DESC";
$result = $conn->query($sql);

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = [
        'id' => (int)$row['id'],
        'description' => $row['description'],
        'amount' => (float)$row['amount'],
        'type' => $row['type'],
        'date' => $row['date']
    ];
}

echo json_encode([
    'success' => true,
    'data' => $transactions
]);

$conn->close();
=======
<?php
require_once 'config.php';

$sql = "SELECT * FROM transactions ORDER BY date DESC, id DESC";
$result = $conn->query($sql);

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = [
        'id' => (int)$row['id'],
        'description' => $row['description'],
        'amount' => (float)$row['amount'],
        'type' => $row['type'],
        'date' => $row['date']
    ];
}

echo json_encode([
    'success' => true,
    'data' => $transactions
]);

$conn->close();
>>>>>>> a206b8979b8b16cd7c8a933c98035cbe5625695e
?>