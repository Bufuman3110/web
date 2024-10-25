// Chiede all'utente di inserire una password
const password = prompt("Inserisci la password:");

// Funzione per disabilitare il clic destro
function disableRightClick(e) {
    e.preventDefault();
    alert("Il clic destro è disabilitato.");
}

// Funzione per disabilitare F12 e altre combinazioni di ispezione
function disableDevTools(e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        alert("L'ispezione non è consentita su questa pagina.");
    }
}

// Controlla se la password è corretta
if (password === "negro") {
    // Se la password è corretta, mostra il contenuto della pagina e consente clic destro e F12
    document.body.classList.remove("hidden");
} else {
    // Se la password è sbagliata, mostra un messaggio di accesso negato, blocca clic destro e F12
    document.body.innerHTML = "<h1>Accesso negato</h1>";
    document.body.style.display = "block";

    // Aggiunge un listener per disabilitare il clic destro e F12
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableDevTools);
}
