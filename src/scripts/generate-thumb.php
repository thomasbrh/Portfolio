<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$project = basename($_GET['project'] ?? '');
if (!$project) {
    http_response_code(400);
    exit('Nom du projet manquant.');
}

// Dossier de destination
$previewDir = $_SERVER['DOCUMENT_ROOT'] . '/portfolio/assets/images/previews';
$previewPath = "$previewDir/$project.webp";

// Créer le dossier s'il n'existe pas
if (!file_exists($previewDir)) {
    if (!mkdir($previewDir, 0755, true)) {
        http_response_code(500);
        exit("Erreur : impossible de créer le dossier previews.");
    }
}

// Si l'image existe déjà, on la renvoie
if (file_exists($previewPath)) {
    header('Content-Type: image/webp');
    readfile($previewPath);
    exit;
}

// Générer via thum.io
$thumbnailUrl = "https://image.thum.io/get/width/600/https://thomasbruch.be/projets/$project";

// Récupérer l'image distante (cURL)
$ch = curl_init($thumbnailUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$imageData = curl_exec($ch);
curl_close($ch);

if (!$imageData) {
    http_response_code(500);
    exit('Erreur lors du téléchargement de la miniature.');
}

// Convertir l'image reçue en ressource GD
$image = @imagecreatefromstring($imageData);
if (!$image) {
    http_response_code(500);
    exit("Erreur lors de la lecture de l'image.");
}

// Enregistrer au format .webp
if (!imagewebp($image, $previewPath, 80)) {
    imagedestroy($image);
    http_response_code(500);
    exit("Erreur lors de l'enregistrement de l'image .webp");
}

imagedestroy($image);

// Vérifie que le fichier a bien été créé
if (!file_exists($previewPath) || filesize($previewPath) === 0) {
    http_response_code(500);
    exit("Fichier .webp non créé ou vide.");
}

// Retourner l'image .webp au navigateur
header('Content-Type: image/webp');
readfile($previewPath);
