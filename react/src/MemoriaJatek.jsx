import { useState } from "react";
import "./bootstrap.min.css";
import "./MemoriaJatek.css";

// 8 pár ikon (16 kártya)
var IKONOK = ["🍎", "🍌", "🍇", "🍓", "🍒", "🥝", "🍋", "🍉"];

// Kártyák generálása és keverése
function kartyanGeneralas() {
    var pakli = [];
    for (var i = 0; i < IKONOK.length; i++) {
        pakli.push({ id: i * 2,     ikon: IKONOK[i], felfedett: false, parosult: false });
        pakli.push({ id: i * 2 + 1, ikon: IKONOK[i], felfedett: false, parosult: false });
    }

    // Fisher–Yates keverés
    for (var i = pakli.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = pakli[i];
        pakli[i] = pakli[j];
        pakli[j] = temp;
    }

    return pakli;
}

// Egy kártya komponens
function Kartya({ kartya, onClick }) {
    var tartalom = "";
    if (kartya.parosult || kartya.felfedett) {
        tartalom = kartya.ikon;
    }

    var osztaly = "kartya";
    if (kartya.parosult) osztaly += " kartya-paros";
    else if (kartya.felfedett) osztaly += " kartya-felfedett";

    return (
        <div className="col-3 p-1">
            <div className={osztaly} onClick={() => onClick(kartya.id)}>
                {tartalom}
            </div>
        </div>
    );
}

// Fő komponens
function MemoriaJatek() {
    var [kartyak, setKartyak] = useState(kartyanGeneralas());
    var [kivalasztott, setKivalasztott] = useState([]);
    var [nyert, setNyert] = useState(false);

    function handleKattintas(id) {
        if (nyert) return;

        // Ne lehessen ugyanarra kattintani, és max 2 kártya legyen felfedve
        if (kivalasztott.length === 2) return;

        var melyik = null;
        for (var i = 0; i < kartyak.length; i++) {
            if (kartyak[i].id === id) { melyik = kartyak[i]; break; }
        }

        if (!melyik || melyik.felfedett || melyik.parosult) return;

        // Felfed
        var ujKartyak = [];
        for (var i = 0; i < kartyak.length; i++) {
            if (kartyak[i].id === id) {
                ujKartyak.push({ id: kartyak[i].id, ikon: kartyak[i].ikon, felfedett: true, parosult: kartyak[i].parosult });
            } else {
                ujKartyak.push(kartyak[i]);
            }
        }

        var ujKivalasztott = [];
        for (var i = 0; i < kivalasztott.length; i++) {
            ujKivalasztott.push(kivalasztott[i]);
        }
        ujKivalasztott.push(id);

        if (ujKivalasztott.length === 2) {
            var elsoId = ujKivalasztott[0];
            var masodikId = ujKivalasztott[1];

            var elso = null;
            var masodik = null;
            for (var i = 0; i < ujKartyak.length; i++) {
                if (ujKartyak[i].id === elsoId) elso = ujKartyak[i];
                if (ujKartyak[i].id === masodikId) masodik = ujKartyak[i];
            }

            if (elso.ikon === masodik.ikon) {
                // Páros!
                var parosKartyak = [];
                for (var i = 0; i < ujKartyak.length; i++) {
                    if (ujKartyak[i].id === elsoId || ujKartyak[i].id === masodikId) {
                        parosKartyak.push({ id: ujKartyak[i].id, ikon: ujKartyak[i].ikon, felfedett: true, parosult: true });
                    } else {
                        parosKartyak.push(ujKartyak[i]);
                    }
                }
                setKartyak(parosKartyak);
                setKivalasztott([]);

                // Nyerés ellenőrzés
                var mindenParos = true;
                for (var i = 0; i < parosKartyak.length; i++) {
                    if (!parosKartyak[i].parosult) { mindenParos = false; break; }
                }
                if (mindenParos) setNyert(true);

            } else {
                // Nem páros – rövid késleltetés után visszafordít
                setKartyak(ujKartyak);
                setKivalasztott(ujKivalasztott);

                setTimeout(function() {
                    setKartyak(function(prev) {
                        var visszafordult = [];
                        for (var i = 0; i < prev.length; i++) {
                            if (prev[i].id === elsoId || prev[i].id === masodikId) {
                                visszafordult.push({ id: prev[i].id, ikon: prev[i].ikon, felfedett: false, parosult: false });
                            } else {
                                visszafordult.push(prev[i]);
                            }
                        }
                        return visszafordult;
                    });
                    setKivalasztott([]);
                }, 900);
            }
        } else {
            setKartyak(ujKartyak);
            setKivalasztott(ujKivalasztott);
        }
    }

    function handleUjJatek() {
        setKartyak(kartyanGeneralas());
        setKivalasztott([]);
        setNyert(false);
    }

    return (
        <div className="container mt-4" style={{ maxWidth: "360px" }}>
            <h3 className="text-center mb-3">🃏 Memoria játék</h3>

            {nyert && (
                <div className="alert alert-success text-center fw-bold">
                    🎉 Gratulálok, nyertél!
                </div>
            )}

            <div className="row">
                {kartyak.map(function(k) {
                    return (
                        <Kartya key={k.id} kartya={k} onClick={handleKattintas} />
                    );
                })}
            </div>

            <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handleUjJatek}>
                    Új játék
                </button>
            </div>
        </div>
    );
}

export default MemoriaJatek;
