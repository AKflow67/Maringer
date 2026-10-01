<?php
// Formulaire de contact - Metallerie Maringer (recette OVH validee FannyDefoort/AK)
// 2026-10-01 : ajout de la verification Cloudflare Turnstile (honeypot conserve).

// Anti-spam honeypot
if (!empty($_POST['bot-field'])) {
    http_response_code(403);
    exit;
}

// --- Cloudflare Turnstile (meme recette qu'agencementklein.fr, 2026-10-01) ---
// La cle secrete n'est JAMAIS dans le repo : le deploiement GitHub Actions ecrit
// turnstile-secret.php a cote de ce fichier a partir du secret TURNSTILE_SECRET.
$turnstileSecret = '';
$secretFile = __DIR__ . '/turnstile-secret.php';
if (is_file($secretFile)) {
    $turnstileSecret = (string) include $secretFile;
}

// Turnstile n'est exige QUE si la cle secrete est presente sur le serveur
// (secret GitHub TURNSTILE_SECRET renseigne). Sans cle : honeypot seul, comme avant.
// IMPORTANT : poser la cle de site dans contact.html AVANT de renseigner le secret GitHub.
$token = trim($_POST['cf-turnstile-response'] ?? '');
if ($turnstileSecret !== '') {
    if ($token === '') {
        http_response_code(403);
        echo 'Vérification anti-robot manquante. Revenez au formulaire, cochez la case puis renvoyez votre demande.';
        exit;
    }
    $payload = http_build_query([
        'secret'   => $turnstileSecret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);
    $verify = null;
    if (function_exists('curl_init')) {
        $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
        ]);
        $verify = curl_exec($ch);
        curl_close($ch);
    } else {
        $ctx = stream_context_create(['http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 8,
        ]]);
        $verify = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $ctx);
    }
    $result = $verify ? json_decode($verify, true) : null;
    if (empty($result['success'])) {
        http_response_code(403);
        echo 'Vérification anti-robot échouée. Revenez au formulaire, rechargez la page et réessayez.';
        exit;
    }
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
