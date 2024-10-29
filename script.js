// Chiede all'utente di inserire una password
const password = prompt("Inserisci la password:");
// Funzione per disabilitare il clic destro
function disableRightClick(e) {
    e.preventDefault();
    alert("Il clic destro è disabilitato.");
}
// Funzione per disabilitare F12, F11 e altre combinazioni di ispezione
function disableDevTools(e) {
    if (
        e.key === "F12" ||             // Blocca F12
        e.key === "F11" ||             // Blocca F11
        (e.ctrlKey && e.shiftKey && e.key === "I") // Blocca Ctrl+Shift+I
    ) {
        e.preventDefault();
        alert("L'ispezione e la modalità a schermo intero non sono consentite su questa pagina.");
    }
}
// Controlla se la password è corretta
if (password === "negro") {
    // Se la password è corretta, mostra il contenuto della pagina e consente clic destro, F11 e F12
    document.body.classList.remove("hidden");
    document.body.style.display = "block";
} else {
    // Se la password è sbagliata, mostra un messaggio di accesso negato, blocca clic destro, F12 e F11
    document.body.innerHTML = "<h1>Accesso negrato</h1>";
    document.body.style.display = "block";

    // Aggiunge un listener per disabilitare il clic destro e F12/F11
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableDevTools);
}
