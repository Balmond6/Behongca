Folder Unduhan Lokal BEHONGCA (In-Web Download)
================================================

Taruh file installer aplikasi dan game Anda di dalam folder ini (`public/assets/download/`):

1. Aplikasi Pendeteksi Plak:
   public/assets/download/behongca-smart-detection.apk

2. Game Edukasi Dental Guardian:
   public/assets/download/super-behongca-bros.apk

Catatan:
- Jika Anda menggunakan nama file yang berbeda (misalnya `app-release.apk` atau `game.zip`),
  cukup sesuaikan nilainya di file `behongca.settings.json` pada bagian `"downloads"`:
  {
    "downloads": {
      "detectorFile": "public/assets/download/nama-file-aplikasi.apk",
      "gameFile": "public/assets/download/nama-file-game.apk"
    }
  }
- Selama file fisik belum diletakkan di folder ini, halaman web akan otomatis menampilkan
  status "File belum diletakkan di folder" agar pengunjung tidak terkena galat 404.
