<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $phone = strip_tags(trim($_POST["phone"]));
                $phone = str_replace(array("\r","\n"),array(" "," "),$phone);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $subject = strip_tags(trim($_POST["subject"]));
				$subject = str_replace(array("\r","\n"),array(" "," "),$subject);
        $message = trim($_POST["text"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($subject) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            // echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            echo "Oops! Es gab ein Problem mit Ihren Eingaben. Bitte vervollständigen Sie das Formular und versuchen es erneut.";
            exit;
        }

        // Set the recipient email address.
        $recipient = "mail@kramer-immobilien.de";

        // Set the email subject.
        // $subject2 = "New contact from $name";
        $subject2 = "[Webmailer] von $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content = "Telefon: $phone\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Betreff: $subject\n\n";
        $email_content .= "Nachricht:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        if(isset($_POST['url']) && $_POST['url'] == ''){
        // Send the email.
            if (mail($recipient, $subject2, $email_content, $email_headers)) {
                // Set a 200 (okay) response code.
                http_response_code(200);
                // echo "Thank You! Your message has been sent.";
                echo "Ihre Nachricht wurde verschickt.";
            } else {
                // Set a 500 (internal server error) response code.
                http_response_code(500);
                // echo "Oops! Something went wrong and we couldn't send your message.";
                echo "Oops! Es ist etwas schief gelaufen. Wir konnten Ihre Nachricht nicht verschicken.";
            }
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        // echo "There was a problem with your submission, please try again.";
        echo "Es hat ein Problem mit Ihrer Eingabe gegeben. Bitte versuchen Sie es erneut.";
    }

?>
