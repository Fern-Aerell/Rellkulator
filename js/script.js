// Menginisialisasi objek html yang berisi elemen html
const htmlElement = document.documentElement;
// Menginisialisasi tema, mengambil tema yang di simpan di local storage, jika tidak ada otomatis ke tema light
const savedTheme = localStorage.getItem("theme") || "light";
// Mengatur tema pada element html sesuai savedTheme
htmlElement.setAttribute("data-bs-theme", savedTheme);

// Menginisialisasi objek outputs yang berisi elemen output kalkulator
const output = document.getElementById("output"); // Menyimpan elemen output

// Menginisialisasi objek buttons yang berisi elemen tombol kalkulator
const buttons = {
    clear: document.getElementById("button_clear"), // Tombol reset
    delete: document.getElementById("button_delete"), // Tombol hapus
    equal: document.getElementById("button_equal"), // Tombol sama dengan
    comma: document.getElementById("button_coma"), // Tombol koma
    percent: document.getElementById("button_percen"), // Tombol persen
    positiveNegative: document.getElementById("button_positive_negative"), // Tombol positif/negatif

    // Elemen untuk operator matematika
    operators: {
        div: document.getElementById("button_div"), // Tombol bagi
        mul: document.getElementById("button_mul"), // Tombol kali
        sub: document.getElementById("button_sub"), // Tombol kurang
        add: document.getElementById("button_add") // Tombol tambah
    },

    // Elemen untuk angka
    numbers: Array.from({ length: 10 }, (_, i) =>
        document.getElementById(`button_${i}`) // Menyimpan tombol angka 0-9
    ),

    theme: document.getElementById("toggle_theme"),
};

// Simbol operator matematika
const operators = ['÷', 'x', '-', '+'];

// Fungsi untuk mengatur ulang kalkulator
function clear() {
    output.innerText = "0"; // Mengatur ulang output menjadi 0
}

// Fungsi untuk memulihkan dari error pada hasil perhitungan
function recoveryFromError() {
    // Memeriksa apakah ada error (∞ atau kesalahan) pada output dan mengatur ulang kalkulator
    if (["-∞", "∞", "kesalahan"].includes(output.innerText.toLowerCase()))
        // Reset kalkulator
        clear();
}

// Fungsi untuk menghapus angka terakhir pada output
function del() {
    // Reset kalkulator jika ada error
    recoveryFromError();

    // Mencari bilangan negatif di akhir output
    const startColumnSignedNumber = output.innerText.search('\\(-[0-9]+\\)$');
    // Jika startColumnSignedNumber tidak -1 berarti bilangan terakhir pada output adalah bilangan negatif
    if (startColumnSignedNumber != -1) {
        // (-bilangan) => bilangan
        toggleSign();
        // Akhiri fungsi
        return;
    }

    // Hapus satu karakter terakhir, jika kosong tampilkan 0
    output.innerText = output.innerText.slice(0, -1) || 0;
}

// Fungsi untuk memasukkan angka pada output bawah
function insertNumber(num) {
    // Reset kalkulator jika ada error
    recoveryFromError();

    // Jika output terakhir adalah persen atau Jika output terakhir adalah ) jangan tambahkan angka baru
    if (output.innerText.search("%$") != -1 || output.innerText.search("\\)$") != -1)
        // Akhiri fungsi
        return;

    // Jika output berakhiran ",0"
    if (output.innerText.endsWith(",0")) {
        // Hapus angka 0
        output.innerText = output.innerText.slice(0, -1);
        // Tambahkan angka baru
        output.innerText += num;
        // Akhiri fungsi
        return;
    }

    // Memperbarui output
    output.innerText =
        // Jika output adalah 0
        output.innerText === "0" ?
            // Ubah 0 jadi angka baru
            num :
            // Jika tidak tambah angka baru ke output
            output.innerText + num;
}

// Fungsi untuk menambahkan koma pada angka
function insertComma() {
    // Reset kalkulator jika ada error
    recoveryFromError();

    // Jika output sudah di akhiri bilangan desimal
    if (output.innerText.search('[0-9]+,[0-9]+$') != -1)
        // Akhiri fungsi
        return;

    // Jika output di akhiri bilangan bulat
    if (output.innerText.search('[0-9]+$') != -1)
        // Tambahkan ,0 ke output
        output.innerText += ',0';
}

// Fungsi untuk menambahkan operator matematika pada output
function insertOperator(op) {
    // Reset kalkulator jika ada error
    recoveryFromError();

    // Jika karakter terakhir nya adalah operator.
    if (operators.includes(output.innerText.slice(-1)))
        // Hapus karakter terakhir pada output
        del();

    // Tambahkan operator ke output
    output.innerText += op;
}

// Fungsi untuk menghitung hasil dari ekspresi matematika
function calculate() {
    // Reset kalkulator jika ada error
    recoveryFromError();

    // Jika output adalah 20112005
    if (output.innerText == '20112005') {
        // Ubah output menjadi Fern Aerell
        output.innerText = 'Fern Aerell'
        // Akhiri fungsi
        return;
    }

    // Jika output tidak kosong
    if (output.innerText.length > 0) {
        // Evaluasi output
        output.innerText = evaluation(output.innerText);
    }
}

// Fungsi untuk menambahkan simbol persen pada angka
function insertPercent() {
    // Reset kalkulator jika ada error
    recoveryFromError();

    // Jika output tidak kosong dan output tidak di akhiri dengan %
    if (output.innerText.length > 0 && output.innerText.search("([0-9]+|[0-9]+,[0-9]+)%$") == -1)
        // Tambahkan %
        output.innerText += '%';
}

// Fungsi untuk mengubah tanda angka (positif/negatif)
function toggleSign() {
    // Reset kalkulator jika ada error
    recoveryFromError();

    // Jika output adalah 0
    if (output.innerText == 0)
        // Akhiri fungsi
        return;

    // Mencari bilangan positif di akhir output
    const startColumnUnSignedNumber = output.innerText.search('([0-9]+|[0-9]+,[0-9]+)$');
    // Jika startColumnUnSignedNumber tidak -1 berarti bilangan terakhir output positif
    if (startColumnUnSignedNumber != -1) {
        // bilangan => (-bilangan)
        output.innerText = output.innerText.slice(0, startColumnUnSignedNumber) + "(-" + output.innerText.slice(startColumnUnSignedNumber) + ")";
        // Akhiri fungsi
        return;
    }

    // Mencari bilangan negatif di akhir output
    const startColumnSignedNumber = output.innerText.search('\\(-([0-9]+|[0-9]+,[0-9]+)\\)$');
    // Jika startColumnSignedNumber tidak -1 berarti bilangan terakhir output negatif
    if (startColumnSignedNumber != - 1) {
        // (-bilangan) => bilangan
        output.innerText = output.innerText.slice(0, startColumnSignedNumber) + output.innerText.slice(startColumnSignedNumber).substring(2, output.innerText.slice(startColumnSignedNumber).length - 1);
        // Akhiri fungsi
        return;
    }
}

// Fungsi untuk mengevaluasi ekspresi matematika
function evaluation(expression) {
    try {
        // Keluarkan string hasil evaluasi
        return String(
            // Evaluasi ekspresi
            eval(
                expression
                    // Merubah & menjadi /100 pada ekspresi
                    .replaceAll('%', '/100')
                    // Merubah ÷ menjadi / pada ekspresi
                    .replaceAll('÷', '/')
                    // Merubah x menjadi * pada ekspresi
                    .replaceAll('x', '*')
                    // Merubah , menjadi . pada ekspresi
                    .replaceAll(',', '.')
                    // Merubah Fern Aerell menjadi 20112005 pada ekspresi
                    .replaceAll('Fern Aerell', '20112005')
            )
        )
            // Merubah . menjadi , pada hasil evaluasi
            .replaceAll('.', ',')
            // Merubah Infinity menjadi ∞ pada hasil evaluasi
            .replaceAll("Infinity", "∞")
            // Merubah NaN menjadi Kesalahan pada hasil evaluasi
            .replaceAll("NaN", "Kesalahan")
            ;
    } catch {
        // Keluarkan ekspresi
        return expression;
    }
}

// Menambahkan event listener untuk beberapa tombol keyboard
document.addEventListener("keydown", function (event) {
    // Jika tombol angka di pencet
    if (event.key.search("^[0-9]$") != -1) {
        // Mencegah aksi default
        event.preventDefault();
        // Tambahkan nomor
        insertNumber(event.key);
        // Akhiri fungsi
        return;
    }

    // Jika ctrl + - di pencet
    if (event.ctrlKey && event.key == '-') {
        // Mencegah aksi default
        event.preventDefault();
        // Ubah bilaangan terakhir dari output menjadi negatif ataupun positif
        toggleSign();
        // Akhiri fungsi
        return;
    }

    // Jika operator di pencet
    if ((event.shiftKey && (['+', '*'].includes(event.key))) || ['+', '*', '-', 'x', '/', '÷'].includes(event.key)) {
        // Mencegah aksi default
        event.preventDefault();
        // Menyimpan operator ke variabel
        let op = event.key;
        // Jika op == *
        if (op == '*') {
            // Ubah op jadi x
            op = 'x';
        }
        // Jika op == /
        else if (op == '/') {
            // Ubah op jadi ÷
            op = '÷';
        }
        // Tambahkan operator
        insertOperator(op);
        // Akhiri fungsi
        return;
    }

    // Jika persen di pencet
    if (event.key == '%') {
        // Mencegah aksi default
        event.preventDefault();
        // Tambah persen ke output
        insertPercent();
        // Akhiri fungsi
        return;
    }

    // Jika koma di pencet
    if ([',', '.'].includes(event.key)) {
        // Mencegah aksi default
        event.preventDefault();
        // Tambah koma ke ouput
        insertComma();
        // Akhiri fungsi
        return;
    }

    // Kalkulasi
    if (['=', 'Enter'].includes(event.key)) {
        // Mencegah aksi default
        event.preventDefault();
        // Kalkulasi
        calculate();
        // Akhiri fungsi
        return;
    }

    // Hapus
    if (['Delete', 'Backspace', 'Escape'].includes(event.key)) {
        // Mencegah aksi default
        event.preventDefault();
        // Jika ctrl juga di pencet
        if (event.ctrlKey || event.key == 'Escape') {
            // Menghapus semua karakter output
            clear();
        }
        // Jika ctrl tidak di pencet
        else {
            // Hapus karakter output terakhir
            del();
        }
        // Akhiri fungsi
        return;
    }
});

// Fungsi untuk mengganti tema
function toggleTheme() {
    // Mengambil tema saat ini
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    // Menentukan tema yang akan di gunakan berikutnya
    const newTheme = currentTheme === "light" ? "dark" : "light";
    // Mengatur tema pada element html dengan tema berikutnya
    htmlElement.setAttribute("data-bs-theme", newTheme);
    // Menyimpan tema saat ini ke local storage
    localStorage.setItem("theme", newTheme);
}

// Menambahkan event listener untuk setiap tombol
buttons.clear.addEventListener("click", () => clear()); // Tombol reset
buttons.delete.addEventListener("click", () => del()); // Tombol hapus
buttons.equal.addEventListener("click", () => calculate()); // Tombol sama dengan
buttons.comma.addEventListener("click", () => insertComma()); // Tombol koma
buttons.percent.addEventListener("click", () => insertPercent()); // Tombol persen
buttons.positiveNegative.addEventListener("click", () => toggleSign()); // Tombol positif/negatif

// Menambahkan event listener untuk tombol angka
buttons.numbers.forEach((btn, num) => btn.addEventListener("click", () => insertNumber(num)));

// Menambahkan event listener untuk tombol operator matematika
Object.values(buttons.operators).forEach((btn, index) => btn.addEventListener("click", () => insertOperator(operators[index])));

// Menambahkan event listener untuk tombol theme
buttons.theme.addEventListener("click", () => toggleTheme());