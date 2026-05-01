<<<<<<< HEAD
<?php
require_once 'config.php';

$sql = "SELECT 
            COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
            COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense
        FROM transactions";

$result = $conn->query($sql);
$row = $result->fetch_assoc();

$totalIncome = (float)$row['total_income'];
$totalExpense = (float)$row['total_expense'];
$balance = $totalIncome - $totalExpense;

echo json_encode([
    'success' => true,
    'data' => [
        'totalIncome' => $totalIncome,
        'totalExpense' => $totalExpense,
        'balance' => $balance
    ]
]);

$conn->close();
=======
<?php
require_once 'config.php';

$sql = "SELECT 
            COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
            COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense
        FROM transactions";

$result = $conn->query($sql);
$row = $result->fetch_assoc();

$totalIncome = (float)$row['total_income'];
$totalExpense = (float)$row['total_expense'];
$balance = $totalIncome - $totalExpense;

echo json_encode([
    'success' => true,
    'data' => [
        'totalIncome' => $totalIncome,
        'totalExpense' => $totalExpense,
        'balance' => $balance
    ]
]);

$conn->close();
>>>>>>> a206b8979b8b16cd7c8a933c98035cbe5625695e
?>