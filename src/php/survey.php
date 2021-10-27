<?php
if (isset($_POST)) {
  $message = $_POST['option_8'];
  $message = htmlspecialchars($message);
  $message = urldecode($message);
  $message = trim($message);

  $user_message = "Allgemeine Prävention für das psychische Wohlbefinden: ".$_POST['option_1']
                    ."\r\nPsychisch belastete Eltern: ".$_POST['option_2']
                    ."\r\nMobbing in der Schule: ".$_POST['option_3']
                    ."\r\nEigene Sexualität: ".$_POST['option_4']
                    ."\r\nRassismus-Erfahrung: ".$_POST['option_5']
                    ."\r\nScheidungskinder: ".$_POST['option_6']
                    ."\r\nEigene Angabe: ".$message;

  $to = "info@yin-young-you.com";

  $mailSent = mail($to, "Umfrage: Neue Nachricht", $user_message);

  if ($mailSent) {
      echo "200";
    };
};
?>
