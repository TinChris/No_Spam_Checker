# Spam Checker – README

Ein leichter JavaScript‑Spam‑Checker für FreeCodeCamp‑Übungen. Prüft Nutzertexte gegen eine Deny‑List aus regulären Ausdrücken und zeigt ein Ergebnis im UI an.

---

## 🧭 Überblick

* **Ziel:** Einfache Erkennung typischer Spam‑Muster ("free money", "stock alert", Geldbeträge + "dollars", etc.).
* **Technik:** Vanilla JS (DOM API, Events, RegExp). Keine Frameworks.
* **Einstieg:** Einbinden per `<script>` in eine Seite mit drei Elementen: Eingabe, Button, Ergebnis.

```html
<input id="message-input" />
<button id="check-message-btn">Check message</button>
<div id="result"></div>
<script src="spam-checker.js"></script>
```

---

## ⚙️ Funktionsweise

1. DOM‑Elemente referenzieren (`messageInput`, `checkMessageButton`, `result`).
2. **Deny‑List** aus RegExp‑Mustern definieren.
3. `isSpam(msg)` prüft mit `Array.prototype.some`, ob **irgendein** Muster matcht.
4. Klick auf Button → leere Eingabe abfangen → prüfen → Meldung im `#result` ausgeben → Eingabe leeren.

**Kernlogik:**

```js
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));
```

---

## 🔎 Verwendete RegEx‑Muster (Beispiele)

* `helpRegex` → `/please help|assist me/i`
* `dollarRegex` → `/[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i`
* `freeRegex` → `/(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i`
* `stockRegex` → `/(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i`
* `dearRegex` → `/(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i`

> Hinweis: Die Muster sind absichtlich „tolerant“, um übliche 1337‑Varianten (z. B. `fr33`) zu erwischen.

---

## 🧪 Schnelle Tests

Teste direkt in der Konsole/Seite:

```js
isSpam("Please help me"); // true
isSpam("I won free money!"); // true (mit 1337‑Varianten)
isSpam("Send 1000 dollars now"); // true
isSpam("Hello dear friend"); // true
isSpam("Completely harmless message"); // false
```

---

## 🚀 Nutzung

1. HTML‑Gerüst wie oben einfügen.
2. JS laden (am Ende von `<body>` oder mit `defer`).
3. Button klicken, Ergebnis erscheint in `#result`.

---

## 📁 Projektstruktur (Vorschlag)

```
/ (root)
├─ index.html
├─ js/
│  └─ spam-checker.js
└─ test/
   └─ samples.json
```

---

## 🛡️ Grenzen & Annahmen

* RegEx‑Heuristiken → **Fehlalarme** (false positives) und **Durchrutscher** (false negatives) sind möglich.
* Englisch‑zentriert; Mehrsprachigkeit nur eingeschränkt.
* Kein Kontextverständnis (z. B. Zitate, Ironie, Negationen) – nur Pattern‑Match.

---

## ♿ Barrierefreiheit (A11y)

* `aria-live="polite"` am `#result`, damit Screenreader Updates mitbekommen.
* Klare Button‑Beschriftung (nicht nur Icon).
* Fehlermeldungen zusätzlich **textuell** und nicht nur farblich differenzieren.

```html
<div id="result" aria-live="polite"></div>
```

---

## 📏 Qualität & Performance

* RegEx vorab kompilieren (Literal‑Syntax erledigt das bereits).
* Kurze Deny‑List → O(n) mit kleinem n. Für große Listen: Tries oder Aho‑Corasick in Erwägung ziehen.
* Tests für typische und Edge‑Cases (nur Leerzeichen, Mischsprachen, Emojis).

---

## 🔧 Konfiguration & Erweiterbarkeit

* RegEx‑Muster in einer separaten Datei (`denylist.js` oder JSON) verwalten.
* Optional: Toggle für „strikt“ vs. „tolerant“ Matching.
* Telemetrie/Statistik (lokal) für Trefferquoten zur iterativen Verbesserung.

---

## 🗺️ Roadmap – Verbesserungs­ideen

1. **Trim & Normalisierung**: `msg.trim()`; Unicode‑Normalisierung (NFKC), Kleinschreibung, diakritische Zeichen entfernen.
2. **Tokenisierung**: Worte isolieren, doppelte Leerzeichen, Emojis & Sonderzeichen robust behandeln.
3. **Konfigurierbare Deny‑/Allow‑Lists**: Externe JSON‑Datei + UI zum Ein/Aus‑Schalten einzelner Regeln.
4. **Mehrsprachigkeit**: Zusätzliche Muster für DE/HU (z. B. „kostenloses Geld“, „részvény riasztás“).
5. **Schweregrad‑Score** statt binär: Punkte pro Regel; ab Schwelle → Spam.
6. **Whitelist‑Kontext**: In Zitaten oder Codeblöcken gefundene Wörter ignorieren.
7. **Unit‑Tests** (z. B. Vitest/Jest) + CI‑Check (GitHub Actions).
8. **A11y & UX**: Inline‑Hinweise, z. B. unter dem Input statt `alert()`; Tastatur‑Support (Enter‑Key), Fokusmanagement.
9. **Persistente Beispiele**: Letzte Eingaben in `localStorage` (nur lokal, ohne Telemetrie).
10. **Optional ML‑Modul**: Klassifikation per kleines TF.js‑Modell, Hybrid aus Heuristik + ML.

---

## ❓ FAQ

**Warum nicht nur ein großes RegEx?**
Wartbarkeit. Kleinere, benannte Muster sind verständlicher und testbarer.

**Warum `.some()`?**
Stoppt beim ersten Treffer – effizient und expressiv.

**Wie vermeide ich falsche Positive?**
Schweregrad‑Score + Whitelist‑Kontext (Zitate/Code) + spezifischere Muster.

---

## 👩‍💻 Beiträge & Lizenz

* Beiträge via PR willkommen (neue Muster + Tests).
* Lizenz: MIT (falls du veröffentlichst).

---

## 🧩 Snippets

**Enter‑Taste auslösen:**

```js
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkMessageButton.click();
  }
});
```

**Ergebnis visuell kennzeichnen:**

```css
#result.success { font-weight: 600; }
#result.error   { font-weight: 600; }
```

---

> Tipp: Halte eine kleine **Testliste** in `test/samples.json` bereit, damit du regressionssicher iterieren kannst.


Was du hier lernst / wichtige Punkte:

RegExp-Objekte sind sehr mächtig für Textprüfung.

some() ist perfekt, um einen „Treffer oder nicht“-Check über mehrere Regeln zu machen.

return; in einer Event-Funktion bricht nur diese Funktion ab, nicht den gesamten Scriptlauf.

Du trennst sauber Regeln (denyList) und Logik (isSpam), was den Code wartbar macht.
