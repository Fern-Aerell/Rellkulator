# RellKulator v1.0.0

RellKulator adalah aplikasi kalkulator berbasis web yang dibangun menggunakan HTML, CSS, dan JavaScript dengan fitur-fitur canggih dan desain responsif.

## Struktur File

### 1. **HTML**

- **`<head>`**: Menyertakan pengaturan dasar halaman, karakter encoding, dan link ke Bootstrap untuk styling.
  - **`<meta charset="UTF-8">`**: Menentukan karakter encoding sebagai UTF-8.
  - **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: Menentukan responsif halaman pada perangkat mobile.
  - **`<title>RellKulator</title>`**: Menampilkan judul aplikasi pada browser.

- **`<body>`**: Menyusun elemen-elemen yang terlihat oleh pengguna.
  - **`<div class="container">`**: Membungkus seluruh konten dalam container yang responsif.
  - **`<div class="row justify-content-center">`**: Mengatur layout menggunakan grid Bootstrap untuk penataan kolom.
  - **Kalkulator**: Div utama yang mengandung elemen-elemen tampilan kalkulator.
  - **Tampilan Output**: Menampilkan hasil perhitungan dan output sebelumnya.
  - **Tombol Kalkulator**: Menyusun tombol-tombol untuk operasi matematika, angka, dan kontrol lainnya.
  - **Tautan Eksternal**: Menyediakan link ke repositori Github, desain Figma, dan dokumentasi penggunaan aplikasi.

### 2. **CSS Styling**

- **Body**:
  - Latar belakang diatur dengan warna `#f4f4f4` dan layout diatur dengan Flexbox untuk menjaga tampilan kalkulator tetap berada di tengah halaman.
  
- **Calculator Container**:
  - Memastikan lebar maksimum kalkulator tidak lebih dari 400px dan responsif pada berbagai perangkat.

- **Tombol-tombol**:
  - Tombol-tombol kalkulator dibuat dengan ukuran besar dan responsif agar mudah digunakan pada perangkat mobile.

### 3. **JavaScript**

- **Imports**:
  - **Bootstrap**: Menyediakan elemen dan layout responsif.
  - **SweetAlert2**: Untuk menampilkan popup alert.
  - **Math.js**: Untuk melakukan perhitungan matematika.

- **Kalkulator**:
  - Fungsi utama terdapat pada kelas `Calculator` yang mengelola interaksi pengguna dengan tombol kalkulator.
  
  - **Metode Utama**:
    - `clear()`: Mengatur ulang tampilan kalkulator.
    - `delete()`: Menghapus angka terakhir.
    - `insertNumber(num)`: Menambahkan angka ke output kalkulator.
    - `insertOperator(op)`: Menambahkan operator matematika ke output kalkulator.
    - `calculate()`: Menghitung hasil dari ekspresi matematika yang dimasukkan.
    - `toggleSign()`: Mengubah tanda angka (positif/negatif).
    - `evaluation(expression)`: Mengevaluasi ekspresi matematika yang dimasukkan dan mengembalikan hasil.

- **Event Listeners**: Masing-masing tombol kalkulator memiliki event listener yang berfungsi untuk menangani input dari pengguna dan melakukan aksi yang sesuai (misalnya, menambah angka, menghitung hasil, dll).

## Fitur

- **Tampilan Responsif**: Aplikasi ini responsif, memastikan tampilan yang baik pada perangkat mobile dan desktop.
- **Operasi Matematika**: Menyediakan operasi dasar seperti penjumlahan, pengurangan, perkalian, dan pembagian.
- **Percent & Positif/Negatif**: Menyediakan tombol untuk menghitung persen dan mengubah tanda angka.
- **Sejarah Output**: Menyimpan hasil perhitungan sebelumnya dan menampilkannya pada bagian output atas.
- **Mudah Digunakan**: Tombol-tombol besar dan jelas untuk meningkatkan pengalaman pengguna.
  
## Penggunaan

Aplikasi ini dapat digunakan langsung melalui halaman web dan dapat dijalankan pada browser modern. Berikut adalah beberapa tindakan yang dapat dilakukan oleh pengguna:
- Memasukkan angka dengan menekan tombol angka.
- Menambahkan operator matematika (misalnya +, -, x, ÷).
- Menekan tombol `=` untuk menghitung hasil.
- Menggunakan tombol `MU` untuk mereset kalkulator atau `H` untuk menghapus angka terakhir.
