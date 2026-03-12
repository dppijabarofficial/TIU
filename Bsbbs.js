const API_URL =
  "https://script.google.com/macros/s/AKfycbx3h4jukkq4URlco6CmBff0Gqzi5CNiuXdSTRhoyvmN4NnI5cwwLHnG7ISwo71cLfUq/exec";
const perHalaman = 1;
let waktu = 3600;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: "Semua anggota Paskibraka terlatih. Sebagian anggota terlatih memiliki sertifikat. Kesimpulan:",
    p: [
      "Semua yang memiliki sertifikat anggota Paskibraka",
      "Sebagian anggota Paskibraka memiliki sertifikat",
      "Semua anggota Paskibraka memiliki sertifikat",
      "Tidak ada anggota tanpa sertifikat",
    ],
    j: 1,
  },
  {
    t: "Jika 18a − 12b = 24, maka nilai 3a − 2b adalah…",
    p: ["2", "3", "4", "5"],
    j: 2,
  },
  {
    t: "4, 7, 13, 25, 49, …",
    p: ["96", "97", "98", "99"],
    j: 1,
  },
  {
    t: "OBOR : GELAP = … : …",
    p: ["Air : Haus", "Payung : Hujan", "Lampu : Terang", "Kompas : Arah"],
    j: 2,
  },
  {
    t: "DISIPLIN ≠ …",
    p: ["Lalai", "Patuh", "Tertib", "Teratur"],
    j: 0,
  },
  {
    t: "PRESTASI : LATIHAN = SUKSES : …",
    p: ["Uang", "Kerja keras", "Sekolah", "Nilai"],
    j: 1,
  },
  {
    t: "Jika P → Q. Tidak Q. Maka…",
    p: ["P", "Tidak P", "Q", "Tidak dapat disimpulkan"],
    j: 1,
  },
  {
    t: "Semua anggota A disiplin. Tidak ada yang disiplin malas. Kesimpulan:",
    p: [
      "Semua anggota A tidak malas",
      "Sebagian anggota A malas",
      "Tidak dapat disimpulkan",
      "Semua malas anggota A",
    ],
    j: 0,
  },
  {
    t: "KERANGKA : RUMAH = … : TUBUH",
    p: ["Kulit", "Darah", "Otot", "Tulang"],
    j: 3,
  },
  {
    t: "3 orang lebih tinggi dari Budi. Budi lebih tinggi dari Andi. Maka…",
    p: [
      "Andi tertinggi",
      "Budi terendah",
      "Minimal 4 orang lebih tinggi dari Andi",
      "Andi lebih tinggi dari 3 orang",
    ],
    j: 2,
  },
  {
    t: "2, 6, 7, 21, 22, …",
    p: ["44", "66", "33", "23"],
    j: 0,
  },
  {
    t: "5, 12, 27, 58, …",
    p: ["115", "117", "120", "121"],
    j: 1,
  },
  {
    t: "1, 4, 9, 16, 25, …",
    p: ["36", "46", "56", "66"],
    j: 0,
  },
  {
    t: "100, 95, 85, 70, …",
    p: ["75", "65", "60", "50"],
    j: 2,
  },
  {
    t: "20% dari 150 adalah …",
    p: ["50", "75", "10", "30"],
    j: 3,
  },
  {
    t: "Jika 4 pekerja selesai 6 hari, 8 pekerja selesai berapa hari?",
    p: ["1 hari", "2 hari", "3 hari", "4 hari"],
    j: 2,
  },
  {
    t: "Jika x + y = 10 dan x − y = 4, maka x = …",
    p: ["11", "7", "13", "4"],
    j: 1,
  },
  {
    t: "Jika jarak 240 km ditempuh 4 jam, kecepatannya…",
    p: ["40 km/jam", "60 km/jam", "30 km/jam", "20 km/jam"],
    j: 1,
  },
  {
    t: "Jika p = 3, q = 2 → 2p + 3q = …",
    p: ["12", "5", "6", "13"],
    j: 0,
  },
  {
    t: "Lima mahasiswa (A,B,C,D,E) ujian. Budi > Agit dan < Winar. Cica > Winar. Dodi > Cica. Siapa prestasi paling rendah?",
    p: ["Budi", "Winar", "Dodi", "Agit"],
    j: 3,
  },
  {
    t: "AIR : ES = UAP : ...",
    p: ["Air", "Udara", "Basah", "Awan"],
    j: 0,
  },
  {
    t: "BANGSA : SERUMPUN = … : …",
    p: [
      "Suku : Adat",
      "Negara : Kota",
      "Keluarga : Sedarah",
      "Komunitas : Individu",
    ],
    j: 2,
  },
  {
    t: "Sebagian siswa suka olahraga. Semua yang suka olahraga sehat. Kesimpulan:",
    p: [
      "Sebagian siswa bertubuh sehat",
      "Semua siswa bertubuh sehat",
      "Siswa yang tidak olahraga tidak sehat",
      "Sebagian yang sehat adalah siswa",
    ],
    j: 0,
  },
  {
    t: "Jika x = 0,125 dan y = 1/8. Bandingkan P = x² dan Q = y³",
    p: ["Q > P", "P = Q", "P > Q", "Tidak dapat ditentukan"],
    j: 2,
  },
  {
    t: "Tiang 10 m memiliki bayangan 4 m. Calon paskibraka bayangan 72 cm. Bandingkan P (tinggi calon) dan Q = 175 cm",
    p: ["Q > P", "Tidak dapat ditentukan", "P > Q", "P = Q"],
    j: 2,
  },
  {
    t: "Jika a bilangan positif dan b bilangan negatif. P = a – b dan Q = b – a",
    p: ["Tidak dapat ditentukan", "P > Q", "P = Q", "Q > P"],
    j: 1,
  },
  {
    t: "Bagian pola gambar selanjutnya?",
    img: "img/27.jpeg",
    p: ["A", "B", "C", "D"],
    j: 2,
  },
  {
    t: "Bagaimana pola gambar selanjutnya?",
    img: "img/28.jpeg",
    p: ["A", "B", "C", "D"],
    j: 3,
  },
  {
    t: "Bagaimana pola gambar selanjutnya?",
    img: "img/29.jpeg",
    p: ["A", "B", "C", "D"],
    j: 1,
  },
  {
    t: "Bagaimana pola gambar selanjutnya?",
    img: "img/30.jpeg",
    p: ["A", "B", "C", "D"],
    j: 0,
  },
  {
    t: "Bagaimana pola gambar selanjutnya?",
    img: "img/27.jpeg",
    p: ["A", "B", "C", "D"],
    j: 2,
  },
  {
    t: "Enam calon Paskibraka antre. A di depan B. C tepat di belakang E. D urutan 3 atau 4. F terakhir. Antara A dan B ada dua orang. Jika E urutan kedua, urutan benar:",
    p: [
      "A, E, C, D, B, F",
      "E, C, A, D, B, F",
      "A, E, D, C, B, F",
      "E, C, D, A, B, F",
    ],
    j: 0,
  },
  {
    t: "Formasi lima posisi. Posisi 3 lebih tinggi dari 2 dan 4. Andre < Erna > Dedi. Budi tertinggi. Chika < Andre. Siapa posisi 3?",
    p: ["Andre", "Budi", "Chika", "Dedi"],
    j: 1,
  },
  {
    t: "Tujuh orang baris belakang. T urutan 4. R urutan 2. P tepat depan S. V antara R dan U. Q depan T tapi belakang P. Siapa urutan 7?",
    p: ["S", "U", "V", "P"],
    j: 1,
  },
  {
    t: "DELEGASI = …",
    p: ["Anggota", "Utusan", "Pemimpin", "Penasihat"],
    j: 1,
  },
  {
    t: "KOLEKTIF = …",
    p: ["Terpisah", "Berkelompok", "Berurutan", "Bersaing"],
    j: 1,
  },
  {
    t: "EVOKASI = …",
    p: ["Penilaian", "Pengungsian", "Penggugah rasa", "Perubahan"],
    j: 2,
  },
  {
    t: "PROGRESIF ≠ …",
    p: ["Modern", "Canggih", "Berlanjut", "Stagnan"],
    j: 3,
  },
  {
    t: "KOHESI ≠ …",
    p: ["Adhesi", "Persatuan", "Penarikan", "Perpecahan"],
    j: 3,
  },
  {
    t: "KONTAK ≠ …",
    p: ["Pemutusan", "Hubungan", "Perjumpaan", "Jarak"],
    j: 0,
  },
];

function mulaiUjian() {
  const prov = document.getElementById("provinsi").value;

  if (!nama.value || !sekolah.value || !prov) return alert("Lengkapi data!");

  let provFinal = "";
  let kabFinal = "";

  if (prov === "Jawa Barat") {
    const jabar = document.getElementById("daerahJabar").value;
    if (!jabar) return alert("Pilih Kabupaten/Kota Jawa Barat!");

    provFinal = "Jawa Barat";
    kabFinal = jabar;
  } else if (prov === "Luar") {
    const provManual = document.getElementById("provManual").value;
    const kotaManual = document.getElementById("kotaManual").value;

    if (!provManual || !kotaManual)
      return alert("Isi Provinsi dan Kabupaten/Kota!");

    provFinal = provManual;
    kabFinal = kotaManual;
  }

  localStorage.setItem("nama", nama.value);
  localStorage.setItem("gender", gender.value);
  localStorage.setItem("sekolah", sekolah.value);
  localStorage.setItem("tinggibadan", tinggibadan.value);
  localStorage.setItem("beratbadan", beratbadan.value);

  // 🔥 SIMPAN TERPISAH
  localStorage.setItem("provinsi", provFinal);
  localStorage.setItem("kabkota", kabFinal);

  document.querySelector(".info").classList.add("hidden");
  document.querySelector(".timer").classList.remove("hidden");
  document.querySelector(".progress-box").classList.remove("hidden");
  navSoal.classList.remove("hidden");
  quizForm.classList.remove("hidden");

  mulaiTimer();
  tampilkan();
}

function mulaiTimer() {
  timer = setInterval(() => {
    waktu--;
    time.textContent = `${Math.floor(waktu / 60)}:${String(waktu % 60).padStart(2, "0")}`;
    if (waktu <= 0) {
      waktuHabis = true;
      clearInterval(timer);
      alert("Waktu habis, jawaban dikirim otomatis.");
      kirim();
    }
  }, 1000);
}

function tampilkan() {
  window.scrollTo(0, 0);
  soalContainer.innerHTML = "";
  const start = halaman * perHalaman;

  soal.slice(start, start + perHalaman).forEach((x, i) => {
    const idx = start + i;
    soalContainer.innerHTML += `
    <div class="question">
      <p>${idx + 1}. ${x.t}</p>
${x.img ? `<img src="${x.img}" class="img-soal">` : ""}
      ${x.p
        .map((a, j) => {
          const isi =
            typeof a === "string"
              ? a
              : `<img src="${a.img}" class="img-pilihan">`;

          return `
<label class="pilihan">
  <input type="radio" name="q${idx}" value="${j}"
    ${jawaban[idx] === j ? "checked" : ""}>
  ${isi}
</label>`;
        })
        .join("")}
    </div>`;
  });

  nextBtn.textContent =
    start + perHalaman >= soal.length ? "Selesai" : "Berikutnya ➡";

  autoSave();
  updateProgress();
  buatNavigasi();
}

function autoSave() {
  document.querySelectorAll("input[type=radio]").forEach((r) => {
    r.onchange = () => (jawaban[+r.name.replace("q", "")] = +r.value);
  });
}

function berikutnya() {
  if ((halaman + 1) * perHalaman >= soal.length) kirim();
  else {
    halaman++;
    tampilkan();
  }
}

function sebelumnya() {
  if (halaman > 0) {
    halaman--;
    tampilkan();
  }
}

function semuaTerjawab() {
  for (let i = 0; i < soal.length; i++) if (jawaban[i] === undefined) return i;
  return -1;
}

function kirim() {
  if (sudahSubmit) return;

  if (!waktuHabis) {
    const kosong = semuaTerjawab();
    if (kosong !== -1) {
      alert(`Soal ${kosong + 1} belum dijawab`);
      halaman = Math.floor(kosong / perHalaman);
      tampilkan();
      return;
    }

    if (!confirm("Yakin ingin mengakhiri ujian dan mengirim jawaban?")) return;
  }

  sudahSubmit = true;
  clearInterval(timer);
  nextBtn.disabled = true;
  nextBtn.textContent = "Mengirim...";

  let benar = 0;
  soal.forEach((s, i) => jawaban[i] === s.j && benar++);
  const nilai = Math.round((benar / soal.length) * 100);

  localStorage.setItem("nilai", nilai);
  localStorage.setItem("jawabanUser", JSON.stringify(jawaban));
  localStorage.setItem("bankSoal", JSON.stringify(soal));

  const fd = new FormData();
  fd.append("nama", localStorage.getItem("nama"));
  fd.append("gender", localStorage.getItem("gender"));
  fd.append("sekolah", localStorage.getItem("sekolah"));
  fd.append("provinsi", localStorage.getItem("provinsi")); // 🔥 baru
  fd.append("kabkota", localStorage.getItem("kabkota")); // 🔥 baru
  fd.append("nilai", nilai);
  fd.append("tinggibadan", localStorage.getItem("tinggibadan"));
  fd.append("beratbadan", localStorage.getItem("beratbadan"));

  fetch(API_URL, { method: "POST", body: fd }).finally(
    () => (location.href = "hasil.html"),
  );
}

function updateProgress() {
  const j = Object.keys(jawaban).length;
  progressBar.style.width = `${(j / soal.length) * 100}%`;
  progressText.textContent = `${j} / ${soal.length}`;
}

function buatNavigasi() {
  navSoal.innerHTML = "";
  soal.forEach((_, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (jawaban[i] !== undefined) b.classList.add("answered");
    if (Math.floor(i / perHalaman) === halaman) b.classList.add("active");
    b.onclick = () => {
      halaman = Math.floor(i / perHalaman);
      tampilkan();
    };
    navSoal.appendChild(b);
  });
}

function cekProvinsi() {
  const prov = document.getElementById("provinsi").value;
  const jabar = document.getElementById("daerahJabar");
  const manual = document.getElementById("manualDaerah");

  if (prov === "Jawa Barat") {
    jabar.classList.remove("hidden");
    manual.classList.add("hidden");
  } else if (prov === "Luar") {
    jabar.classList.add("hidden");
    manual.classList.remove("hidden");
  } else {
    jabar.classList.add("hidden");
    manual.classList.add("hidden");
  }
}

function tampilSoal() {
  const s = soal[halaman];

  let html = `<div class="pertanyaan">${s.t}</div>`;

  // tampilkan gambar jika ada
  if (s.img) {
    html += `<div class="gambar-soal">
               <img src="img/${s.img}" style="max-width:100%;margin:10px 0;">
             </div>`;
  }

  // pilihan jawaban
  if (s.p) {
    html += `<div class="pilihan">`;
    s.p.forEach((pil, i) => {
      html += `
      <label>
        <input type="radio" name="jawaban" value="${i}">
        ${pil}
      </label><br>`;
    });
    html += `</div>`;
  }

  document.getElementById("soal").innerHTML = html;
}
