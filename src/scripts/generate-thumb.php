<?php
$project = basename($_GET['project'] ?? '');
if (!$project) {
    http_response_code(400);
    exit('Nom du projet manquant.');
}

$previewDir = __DIR__ . '/../assets/images/previews';
$previewPath = "$previewDir/$project.jpg";

// Crée le dossier si nécessaire
if (!file_exists($previewDir)) {
    mkdir($previewDir, 0755, true);
}

// Si l'image existe déjà, on la sert
if (file_exists($previewPath)) {
    header('Content-Type: image/jpeg');
    readfile($previewPath);
    exit;
}

// Sinon, on génère via Thum.io
$thumbnailUrl = "https://image.thum.io/get/width/600/https://thomasbruch.be/projets/$project";
$imageData = @file_get_contents($thumbnailUrl);

if ($imageData === false) {
    http_response_code(500);
    exit('Erreur lors du téléchargement de la miniature.');
}

// Sauvegarde l'image
file_put_contents($previewPath, $imageData);

// Sert l’image
header('Content-Type: image/jpeg');
echo $imageData;