// Aktualisiere den Fortschrittswert, wenn der Schieberegler bewegt wird
document.getElementById('fortschritt').addEventListener('input', function () {
    document.getElementById('fortschrittWert').textContent = this.value + '%';
});

document.getElementById('editFortschritt').addEventListener('input', function () {
    document.getElementById('editFortschrittWert').textContent = this.value + '%';
});

// Überprüfe das Formular und füge eine neue Aufgabe hinzu
document.getElementById('todoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidieren()) {
        aufgabeHinzufuegen();
    }
});

// Suchfunktion für Aufgaben
document.getElementById('suche').addEventListener('input', function () {
    aufgabenSuchen(this.value);
});

let aufgaben = [];
let bearbeitungsIndex = -1;

// Formularvalidierung
function formValidieren() {
    let titel = document.getElementById('titel').value.trim();
    let beschreibung = document.getElementById('beschreibung').value.trim();
    let autor = document.getElementById('autor').value.trim();
    let fehlermeldung = document.getElementById('fehlermeldung');
    
    if (titel.length === 0 || beschreibung.length === 0 || autor.length === 0) {
        fehlermeldung.textContent = 'Alle Felder müssen ausgefüllt sein.';
        return false;
    }
    
    if (titel.length > 255 || beschreibung.length > 255 || autor.length > 20) {
        fehlermeldung.textContent = 'Einige Felder überschreiten die maximale Länge.';
        return false;
    }
    
    fehlermeldung.textContent = '';
    return true;
}

// Formularvalidierung für Bearbeitungsformular
function bearbeitungsFormValidieren() {
    let titel = document.getElementById('editTitel').value.trim();
    let beschreibung = document.getElementById('editBeschreibung').value.trim();
    let autor = document.getElementById('editAutor').value.trim();
    let fehlermeldung = document.getElementById('bearbeitenFehlermeldung');
    
    if (titel.length === 0 || beschreibung.length === 0 || autor.length === 0) {
        fehlermeldung.textContent = 'Alle Felder müssen ausgefüllt sein.';
        return false;
    }
    
    if (titel.length > 255 || beschreibung.length > 255 || autor.length > 20) {
        fehlermeldung.textContent = 'Einige Felder überschreiten die maximale Länge.';
        return false;
    }
    
    fehlermeldung.textContent = '';
    return true;
}

// Priorität berechnen
function berechnePrioritaet(wichtig, dringend) {
    if (wichtig && dringend) return 'Sofort erledigen';
    if (wichtig && !dringend) return 'Einplanen und Wohlfühlen';
    if (!wichtig && dringend) return 'Gib es ab';
    return 'Weg damit';
}

// Neue Aufgabe hinzufügen
function aufgabeHinzufuegen() {
    const aufgabe = {
        titel: document.getElementById('titel').value,
        beschreibung: document.getElementById('beschreibung').value,
        autor: document.getElementById('autor').value,
        kategorie: document.getElementById('kategorie').value,
        wichtig: document.getElementById('wichtig').checked,
        dringend: document.getElementById('dringend').checked,
        startDatum: document.getElementById('startDatum').value,
        endDatum: document.getElementById('endDatum').value,
        fortschritt: document.getElementById('fortschritt').value,
        prioritaet: berechnePrioritaet(document.getElementById('wichtig').checked, document.getElementById('dringend').checked)
    };

    aufgaben.push(aufgabe);
    aufgabenAnzeigen();
    formularLeeren();
}

// Aufgaben anzeigen
function aufgabenAnzeigen() {
    const container = document.getElementById('aufgabenContainer');
    container.innerHTML = '';
    aufgaben.forEach((aufgabe, index) => {
        const aufgabeElement = document.createElement('div');
        aufgabeElement.classList.add('aufgabe');
        aufgabeElement.innerHTML = `
            <h3>${aufgabe.titel}</h3>
            <p>Priorität: ${aufgabe.prioritaet}</p>
            <p>Enddatum: ${aufgabe.endDatum}</p>
            <p>Fortschritt: ${aufgabe.fortschritt}%</p>
            <div class="erweitert-content" style="display: none;">
                <p>Autor: ${aufgabe.autor}</p>
                <p>Kategorie: ${aufgabe.kategorie}</p>
                <p>Startdatum: ${aufgabe.startDatum}</p>
                <p>Beschreibung: ${aufgabe.beschreibung}</p>
                <button onclick="aufgabeBearbeiten(${index})">Bearbeiten</button>
                <button onclick="bestaetigenAbschliessen(${index})">Abschließen</button>
                <button class="loeschen" onclick="bestaetigenLoeschen(${index})">Löschen</button>
            </div>
        `;
        aufgabeElement.addEventListener('click', function() {
            this.classList.toggle('erweitert');
            const content = this.querySelector('.erweitert-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
        container.appendChild(aufgabeElement);
    });
}

// Formular leeren
function formularLeeren() {
    document.getElementById('todoForm').reset();
    document.getElementById('fortschrittWert').textContent = '0%';
}

// Aufgaben suchen
function aufgabenSuchen(query) {
    const gefilterteAufgaben = aufgaben.filter(aufgabe => aufgabe.titel.toLowerCase().includes(query.toLowerCase()));
    const container = document.getElementById('aufgabenContainer');
    container.innerHTML = '';
    gefilterteAufgaben.forEach((aufgabe, index) => {
        const aufgabeElement = document.createElement('div');
        aufgabeElement.classList.add('aufgabe');
        aufgabeElement.innerHTML = `
            <h3>${aufgabe.titel}</h3>
            <p>Priorität: ${aufgabe.prioritaet}</p>
            <p>Enddatum: ${aufgabe.endDatum}</p>
            <p>Fortschritt: ${aufgabe.fortschritt}%</p>
            <div class="erweitert-content" style="display: none;">
                <p>Autor: ${aufgabe.autor}</p>
                <p>Kategorie: ${aufgabe.kategorie}</p>
                <p>Startdatum: ${aufgabe.startDatum}</p>
                <p>Beschreibung: ${aufgabe.beschreibung}</p>
                <button onclick="aufgabeBearbeiten(${index})">Bearbeiten</button>
                <button onclick="bestaetigenAbschliessen(${index})">Abschließen</button>
                <button class="loeschen" onclick="bestaetigenLoeschen(${index})">Löschen</button>
            </div>
        `;
        aufgabeElement.addEventListener('click', function() {
            this.classList.toggle('erweitert');
            const content = this.querySelector('.erweitert-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
        container.appendChild(aufgabeElement);
    });
}

// Aufgabe bearbeiten
function aufgabeBearbeiten(index) {
    bearbeitungsIndex = index;
    const aufgabe = aufgaben[index];
    document.getElementById('editTitel').value = aufgabe.titel;
    document.getElementById('editBeschreibung').value = aufgabe.beschreibung;
    document.getElementById('editAutor').value = aufgabe.autor;
    document.getElementById('editKategorie').value = aufgabe.kategorie;
    document.getElementById('editWichtig').checked = aufgabe.wichtig;
    document.getElementById('editDringend').checked = aufgabe.dringend;
    document.getElementById('editStartDatum').value = aufgabe.startDatum;
    document.getElementById('editEndDatum').value = aufgabe.endDatum;
    document.getElementById('editFortschritt').value = aufgabe.fortschritt;
    document.getElementById('editFortschrittWert').textContent = aufgabe.fortschritt + '%';
    document.getElementById('bearbeitenPopup').classList.add('open');
}

document.getElementById('bearbeitenFormular').addEventListener('submit', function (e) {
    e.preventDefault();
    if (bearbeitungsFormValidieren()) {
        aufgabeSpeichern();
    }
});

// Aufgabe speichern
function aufgabeSpeichern() {
    const aufgabe = aufgaben[bearbeitungsIndex];
    aufgabe.titel = document.getElementById('editTitel').value;
    aufgabe.beschreibung = document.getElementById('editBeschreibung').value;
    aufgabe.autor = document.getElementById('editAutor').value;
    aufgabe.kategorie = document.getElementById('editKategorie').value;
    aufgabe.wichtig = document.getElementById('editWichtig').checked;
    aufgabe.dringend = document.getElementById('editDringend').checked;
    aufgabe.startDatum = document.getElementById('editStartDatum').value;
    aufgabe.endDatum = document.getElementById('editEndDatum').value;
    aufgabe.fortschritt = document.getElementById('editFortschritt').value;
    aufgabe.prioritaet = berechnePrioritaet(document.getElementById('editWichtig').checked, document.getElementById('editDringend').checked);
    aufgabenAnzeigen();
    schliessenBearbeitenPopup();
}

// Bearbeiten-Popup schließen
function schliessenBearbeitenPopup() {
    document.getElementById('bearbeitenPopup').classList.remove('open');
}

// Aufgabe abschließen bestätigen
function bestaetigenAbschliessen(index) {
    if (confirm('Möchten Sie diese Aufgabe wirklich abschließen?')) {
        aufgaben.splice(index, 1);
        aufgabenAnzeigen();
    }
}

// Aufgabe löschen bestätigen
function bestaetigenLoeschen(index) {
    if (confirm('Möchten Sie diese Aufgabe wirklich löschen?')) {
        aufgaben.splice(index, 1);
        aufgabenAnzeigen();
    }
}
