<?php
// Formulaire de contact - Metallerie Maringer (recette OVH validee FannyDefoort/AK)

// Anti-spam honeypot
if (!empty($_POST['bot-field'])) {
    http_response_code(403);
    exit;
}

// Validation
$nom = htmlspecialchars(trim($_POST['nom'] ?? ''));
$prenom = htmlspecialchars(trim($_POST['prenom'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$telephone = htmlspecialchars(trim($_POST['telephone'] ?? ''));
$projet = htmlspecialchars(trim($_POST['projet'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (!$nom || !$prenom || !$email || !$telephone || !$message) {
    http_response_code(400);
    echo 'Champs obligatoires manquants.';
    exit;
}

// Configuration
$destinataire = 'contact@metalleriemaringer.com';
$objet = 'Nouvelle demande depuis le site - ' . $prenom . ' ' . $nom;

// Corps du mail
$corps = "Nom : $nom\n";
$corps .= "Prenom : $prenom\n";
$corps .= "Email : $email\n";
$corps .= "Telephone : $telephone\n";
if ($projet) $corps .= "Type de projet : $projet\n";
$corps .= "\nMessage :\n$message\n";

// En-tetes
$headers = "From: noreply@metalleriemaringer.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoi
$sent = mail($destinataire, $objet, $corps, $headers);

if ($sent) {
    header('Location: /merci.html');
    exit;
} else {
    http_response_code(500);
    echo 'Erreur lors de l\'envoi. Veuillez reessayer ou nous appeler au 06 32 39 96 42.';
}
?>
