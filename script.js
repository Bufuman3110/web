// Funzione per creare l'interfaccia di inserimento password
function createPasswordInput() {
    // Crea un input per la password
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password'; // Imposta il tipo a 'password'
    passwordInput.placeholder = 'Inserisci la password';
    document.body.appendChild(passwordInput);

    // Crea un pulsante per confermare
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Invia';
    document.body.appendChild(submitButton);

    // Aggiungi evento al pulsante
    submitButton.addEventListener('click', () => {
        const password = passwordInput.value;

        // Controlla se la password è corretta
        if (password === "negro") {
            // Se la password è corretta, mostra il contenuto della pagina
            document.body.classList.remove("hidden");
            passwordInput.style.display = "none"; // Nascondi l'input
            submitButton.style.display = "none"; // Nascondi il pulsante
        } else {
            // Se la password è sbagliata, mostra un messaggio di accesso negato
            document.body.innerHTML = "<h1>Accesso negato</h1>";
            document.body.style.display = "block";

            // Aggiunge un listener per disabilitare il clic destro e F12/F11
            document.addEventListener("contextmenu", disableRightClick);
            document.addEventListener("keydown", disableDevTools);
        }
    });
}

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

// Crea l'interfaccia di input password all'avvio
createPasswordInput();
