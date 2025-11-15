# Web3Forms Setup-Anleitung

Das Kontakt- und Support-Formular verwendet **Web3Forms**, um E-Mails direkt über das Formular zu versenden - elegant und ohne E-Mail-Client!

## 🚀 Schnellstart (2 Minuten)

### 1. Access Key erstellen
1. Gehen Sie zu **[https://web3forms.com/](https://web3forms.com/)**
2. Geben Sie Ihre E-Mail-Adresse ein: **info@baederbook.de**
3. Klicken Sie auf **"Get Your Access Key"**
4. **Kopieren Sie den Access Key** (z.B. `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 2. Access Key in script.js eintragen
Öffnen Sie `script.js` und suchen Sie nach:

```javascript
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY';
```

Ersetzen Sie `YOUR_ACCESS_KEY` mit Ihrem kopierten Access Key:

```javascript
const WEB3FORMS_ACCESS_KEY = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

**Wichtig:** Dieser Access Key wird für **beide Formulare** (Kontakt und Support) verwendet.

### 3. Fertig! ✅
Das war's! Die Formulare funktionieren jetzt direkt.

## ✨ Vorteile

- ✅ **Elegant:** E-Mails werden direkt über das Formular versendet
- ✅ **Kein E-Mail-Client nötig:** Alles passiert im Browser
- ✅ **Kostenlos:** 250 E-Mails/Monat kostenlos
- ✅ **Schnell:** E-Mails kommen sofort an
- ✅ **DSGVO-konform:** Daten werden sicher übertragen
- ✅ **Spam-Schutz:** Automatischer Spam-Filter
- ✅ **Einfach:** Keine Server-Konfiguration nötig

## 📧 E-Mail-Einstellungen

### Standard-Empfänger
Alle E-Mails werden an **info@baederbook.de** gesendet.

### E-Mail-Format

**Kontaktformular:**
```
Betreff: [Vom Benutzer eingegeben]
Von: [Name] ([E-Mail])
Nachricht: [Nachricht]
```

**Support-Formular:**
```
Betreff: Support-Anfrage - Bäderbook
Von: [Name] ([E-Mail])
Bad: [Falls angegeben]
Nachricht: [Nachricht]
```

## 🔒 Sicherheit

- Der Access Key ist sicher für die Verwendung im Frontend
- Web3Forms verschlüsselt alle Verbindungen (HTTPS)
- Automatischer Spam-Schutz
- Rate-Limiting verhindert Missbrauch

## 📊 Kostenloses Limit

- **250 E-Mails/Monat** kostenlos
- Für mehr E-Mails: Upgrade auf einen bezahlten Plan (ab $5/Monat)

## 🆘 Probleme?

### E-Mails kommen nicht an
1. Prüfen Sie den Spam-Ordner
2. Überprüfen Sie, ob der Access Key korrekt eingetragen ist
3. Prüfen Sie die Browser-Konsole auf Fehler

### "Invalid Access Key" Fehler
- Stellen Sie sicher, dass der Access Key korrekt kopiert wurde
- Keine Leerzeichen am Anfang oder Ende
- Access Key muss in Anführungszeichen stehen

### Formular sendet nicht
1. Öffnen Sie die Browser-Konsole (F12)
2. Prüfen Sie auf Fehlermeldungen
3. Stellen Sie sicher, dass JavaScript aktiviert ist

## 🔄 Alternative Services

Falls Web3Forms nicht funktioniert, können Sie auch verwenden:
- **Formspree** (https://formspree.io/)
- **Getform** (https://getform.io/)
- **FormSubmit** (https://formsubmit.co/)

---

**Hinweis:** Nach dem Eintragen des Access Keys funktionieren beide Formulare sofort und elegant! 🎉

