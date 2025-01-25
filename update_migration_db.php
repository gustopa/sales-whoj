<?php

// Script untuk mengganti nama database di file migration
$files = glob('database/migrations/*.php'); // Cari semua file migration di folder migrations

foreach ($files as $file) {
    $content = file_get_contents($file); // Baca isi file migration
    $content = str_replace(
        // Nama database lama yang akan diganti
        ['`u1128725_mahakarya`', '`u1128725_new-system-mahakarya`'], 
        // Ganti dengan format dinamis menggunakan environment variable
        ['`" . env(\'DB_DATABASE\') . "`', '`" . env(\'DB_DATABASE_SECOND\') . "`'],
        $content
    );
    file_put_contents($file, $content); // Tulis ulang file migration dengan perubahan
}

echo "Nama database di file migration telah diperbarui.\n";
