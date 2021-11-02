<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$mobile = $_POST['phone'];
$email = $_POST['email'];
$address = $_POST['country'];


// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>New Message</h2>
<b>Name:</b> $name<br>
<b>Phone:</b> $mobile<br>
<b>Email:</b> $email<br>
<b>Country:</b> $address<br>

";
 
// Валидация почты
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

// Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->IsSMTP();
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth   = true;
        $mail->SMTPDebug = 4;
        $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

        // Настройки вашей почты
        $mail->Host       = 'smtp.migadu.com'; // SMTP сервера вашей почты
        $mail->Username   = 'info@decovic.com'; // Логин на почте
        $mail->Password   = 'BHC2%NVxGEcwZT5AJ6'; // Пароль на почте
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('info@decovic.com'); // Адрес самой почты и имя отправителя

        // Получатель письма
        $mail->addAddress('info@decovic.com', 'info@decovic.com');

        // Отправка сообщения
        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $body;

        // Проверяем отравленность сообщения
        if ($mail->send()) {
            $result = "success";
        }
        else {$result = "error";}

    } catch (Exception $e) {
        $result = "error";
        $status = "Error: {$mail->ErrorInfo}";
    }
} else {
    $result = "email";

}
// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);