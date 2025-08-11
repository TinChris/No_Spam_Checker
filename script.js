// Referenz auf das Texteingabefeld (wo der Benutzer seine Nachricht eingibt)
const messageInput = document.getElementById("message-input");

// Referenz auf das Element, in dem wir das Ergebnis anzeigen (Spam oder nicht Spam)
const result = document.getElementById("result");

// Referenz auf den Button, der beim Klick die Spam-Prüfung startet
const checkMessageButton = document.getElementById("check-message-btn");

// --- Reguläre Ausdrücke (RegEx) für typische Spam-Muster ---
// i-Flag bedeutet: case-insensitive (Groß-/Kleinschreibung ignorieren)

// Prüft auf "please help" oder "assist me" (häufig in Scam-Mails)
const helpRegex = /please help|assist me/i;

// Prüft auf Geldbeträge mit optionalen Einheiten (hundred, thousand, million, billion)
// \s* erlaubt beliebig viele Leerzeichen zwischen Zahl und Einheit
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;

// Prüft auf Schreibvarianten von "free money" (inkl. 1337-Speak wie "fr33 m0n3y")
// ^|\s bedeutet: am Anfang der Nachricht oder nach einem Leerzeichen
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;

// Prüft auf Variationen von "stock alert" (mit Zahl/Buchstaben-Tausch wie s5t0ck a1ert)
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;

// Prüft auf Varianten von "dear friend" (häufig in Spam-Ansprachen)
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;

// Alle oben definierten Spam-Muster in einem Array für einfachere Verwaltung
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// --- Funktion zum Erkennen von Spam ---
// msg: Nachrichtentext, der geprüft werden soll
// some(): gibt true zurück, sobald ein RegEx im Array matcht (also Spam gefunden wird)
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// --- Event-Listener für den "Check Message"-Button ---
// Wird ausgeführt, wenn der Benutzer den Button anklickt
checkMessageButton.addEventListener("click", () => {
  
  // Falls das Eingabefeld leer ist, zeigen wir eine Warnung an
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return; // bricht die Funktion ab, damit nichts weiter ausgeführt wird
  }

  // Prüft die Nachricht und gibt passendes Ergebnis aus
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";

  // Leert das Eingabefeld nach der Prüfung
  messageInput.value = "";
});
