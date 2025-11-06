<?php
// index.php – Galleria immagini con upload e cancellazione

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Cartella dove salvare le immagini
$upload_dir = __DIR__ . '/uploads/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// --- Upload immagine ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['foto'])) {
    $file = $_FILES['foto'];

    if ($file['error'] === UPLOAD_ERR_OK) {
        $tipo = mime_content_type($file['tmp_name']);
        if (in_array($tipo, ['image/jpeg', 'image/png', 'image/gif'])) {
            $estensione = pathinfo($file['name'], PATHINFO_EXTENSION);
            $nome_unico = uniqid('img_', true) . '.' . $estensione;
            move_uploaded_file($file['tmp_name'], $upload_dir . $nome_unico);
        } else {
            $errore = "Puoi caricare solo immagini (JPG, PNG o GIF).";
        }
    } else {
        $errore = "Errore durante l'upload.";
    }
}

// --- Cancellazione immagine ---
if (isset($_GET['delete'])) {
    $file_da_cancellare = basename($_GET['delete']);
    $path = $upload_dir . $file_da_cancellare;
    if (file_exists($path)) {
        unlink($path);
    }
    header("Location: index.php");
    exit;
}

// --- Elenco immagini salvate ---
$immagini = array_values(array_filter(scandir($upload_dir), fn($f) =>
    !in_array($f, ['.', '..'])
));
?>
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Galleria immagini PHP</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      margin: 2em;
    }
    .box {
      background: #fff;
      padding: 1em;
      border-radius: 10px;
      box-shadow: 0 0 5px #ccc;
      max-width: 700px;
    }
    img {
      display: inline-block;
      margin: 10px;
      max-width: 200px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 0 5px #999;
    }
    .item {
      position: relative;
      display: inline-block;
    }
    .delete-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      background: rgba(255, 0, 0, 0.8);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      font-weight: bold;
      cursor: pointer;
    }
    .delete-btn:hover {
      background: red;
    }
  </style>
</head>
<body>

  <div class="box">
    <h1>Galleria immagini PHP</h1>

    <form action="" method="post" enctype="multipart/form-data">
      <label for="foto">Scegli un’immagine da caricare:</label><br><br>
      <input type="file" name="foto" id="foto" accept="image/*" required>
      <button type="submit">Carica</button>
    </form>

    <?php if (!empty($errore)): ?>
      <p style="color:red;"><?= htmlspecialchars($errore) ?></p>
    <?php endif; ?>

    <hr>

    <h2>Le tue immagini:</h2>
    <?php if (empty($immagini)): ?>
      <p>Nessuna immagine caricata.</p>
    <?php else: ?>
      <?php foreach ($immagini as $img): ?>
        <div class="item">
          <img src="uploads/<?= htmlspecialchars($img) ?>" alt="">
          <a href="?delete=<?= urlencode($img) ?>" onclick="return confirm('Vuoi cancellare questa immagine?')">
            <button class="delete-btn">×</button>
          </a>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>

</body>
</html>
