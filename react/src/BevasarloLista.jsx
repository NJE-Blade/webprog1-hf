import { useState } from "react";
import "./bootstrap.min.css";
import "./index.css";

// Egy listaelem komponens
function ListaElem({ elem, onToggle, onTorles }) {
    return (
        <li className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={elem.kesz}
                    onChange={() => onToggle(elem.id)}
                />
                <span className={elem.kesz ? "athuzott" : ""}>
                    {elem.nev}
                </span>
            </div>
            <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onTorles(elem.id)}
            >
                Törlés
            </button>
        </li>
    );
}

// Fő komponens
function App() {
    var [lista, setLista] = useState([
        { id: 1, nev: "Tej", kesz: false },
        { id: 2, nev: "Kenyér", kesz: false },
        { id: 3, nev: "Tojás", kesz: false }
    ]);

    var [ujElem, setUjElem] = useState("");

    // Elem hozzáadása
    function handleHozzaad() {
        var nev = ujElem.trim();
        if (nev === "") return;

        var maxId = 0;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].id > maxId) maxId = lista[i].id;
        }

        var ujLista = [];
        for (var i = 0; i < lista.length; i++) {
            ujLista.push(lista[i]);
        }
        ujLista.push({ id: maxId + 1, nev: nev, kesz: false });

        setLista(ujLista);
        setUjElem("");
    }

    // Enter billentyű kezelése
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleHozzaad();
        }
    }

    // Pipa toggle
    function handleToggle(id) {
        var ujLista = [];
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].id === id) {
                ujLista.push({ id: lista[i].id, nev: lista[i].nev, kesz: !lista[i].kesz });
            } else {
                ujLista.push(lista[i]);
            }
        }
        setLista(ujLista);
    }

    // Elem törlése
    function handleTorles(id) {
        var ujLista = [];
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].id !== id) {
                ujLista.push(lista[i]);
            }
        }
        setLista(ujLista);
    }

    // Teljes lista törlése
    function handleListaTorles() {
        if (window.confirm("Biztosan törli az összes elemet?")) {
            setLista([]);
        }
    }

    return (
        <div className="container mt-4" style={{ maxWidth: "540px" }}>
            <h3 className="mb-4 text-center">🛒 Bevásárló lista</h3>

            {/* Hozzáadás sor */}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Új tétel neve..."
                    value={ujElem}
                    onChange={(e) => setUjElem(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn btn-primary" onClick={handleHozzaad}>
                    Hozzáadás
                </button>
            </div>

            {/* Lista */}
            <ul className="list-group mb-3">
                {lista.length === 0 && (
                    <li className="list-group-item text-center text-muted">
                        A lista üres.
                    </li>
                )}
                {lista.map(function(elem) {
                    return (
                        <ListaElem
                            key={elem.id}
                            elem={elem}
                            onToggle={handleToggle}
                            onTorles={handleTorles}
                        />
                    );
                })}
            </ul>

            {/* Lista törlése gomb */}
            {lista.length > 0 && (
                <div className="text-end">
                    <button className="btn btn-danger btn-sm" onClick={handleListaTorles}>
                        Lista törlése
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
