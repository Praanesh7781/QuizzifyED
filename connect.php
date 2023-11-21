<?php

$db = new mysqli('3306', 'root', 'MYsql@123', 'userinfo');

if ($db->connect_error) {
    die('Connection failed: ' . $db->connect_error);
}

$name = $_POST['Name:'];
$email = $_POST['Email:'];
$preferences=$_POST['Preferences:'];
$scores=$_POST['your scores'];

$sql = "INSERT INTO user_data (name, email,preferences,scores) VALUES (?, ?)";
$stmt = $db->prepare($sql);
$stmt->bind_param('ss', $name, $email,$preferences,$scores);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $response = ['message' => 'Data stored successfully.'];
} else {
    $response = ['message' => 'Error storing data.'];
}

$stmt->close();
$db->close();

echo json_encode($response);
