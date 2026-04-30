<?php
require_once 'config.php';

// Only accept POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON data
$input = json_decode(file_get_contents('php://input'), true);

$description = $input['description'] ?? '';
$amount = $input['amount'] ?? 0;
$type = $input['type'] ?? '';
$date = $input['date'] ?? date('Y-m-d');

// Validation
if (empty($description) || $amount <= 0 || !in_array($type, ['income', 'expense'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid input. Description, amount (>0), and type (income/expense) are required'
    ]);
    exit();
}

// Insert into database
$stmt = $conn->prepare("INSERT INTO transactions (description, amount, type, date) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sdss", $description, $amount, $type, $date);

if ($stmt->execute()) {
    $id = $conn->insert_id;
    
    // Return the created transaction
    echo json_encode([
        'success' => true,
        'data' => [
            'id' => $id,
            'description' => $description,
            'amount' => (float)$amount,
            'type' => $type,
            'date' => $date
        ],
        'message' => 'Transaction added successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to add transaction: ' . $conn->error
    ]);
}

$stmt->close();
$conn->close();
?>