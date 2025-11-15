# EmailJS Setup-Anleitung für Kontaktformular

Das Kontaktformular verwendet EmailJS, um E-Mails direkt an **info@baederbook.de** zu versenden.

## 📧 Schnellstart

### 1. EmailJS Account erstellen
1. Gehen Sie zu [https://www.emailjs.com/](https://www.emailjs.com/)
2. Erstellen Sie einen **kostenlosen Account** (200 E-Mails/Monat kostenlos)

### 2. Email Service einrichten
1. Gehen Sie zu **Email Services** → **Add New Service**
2. Wählen Sie Ihren E-Mail-Provider (z.B. **Gmail**, **Outlook**, etc.)
3. Folgen Sie den Anweisungen zur Verbindung
4. **Kopieren Sie die Service ID** (z.B. `service_xxxxx`)

### 3. Email Template erstellen
1. Gehen Sie zu **Email Templates** → **Create New Template**
2. Verwenden Sie folgendes Template:

**Template Name:** Kontaktformular Bäderbook

**Subject:**
```
{{subject}} - Kontaktanfrage von {{from_name}}
```

**Content:**
```
Neue Kontaktanfrage über Bäderbook

Von: {{from_name}}
E-Mail: {{from_email}}

Betreff: {{subject}}

Nachricht:
{{message}}

---
Diese E-Mail wurde über das Kontaktformular auf bäderbook.de gesendet.
```

3. **Wichtig:** Setzen Sie **To Email** auf: `info@baederbook.de`
4. **Kopieren Sie die Template ID** (z.B. `template_xxxxx`)

### 4. Public Key finden
1. Gehen Sie zu **Account** → **General**
2. **Kopieren Sie Ihre Public Key** (z.B. `xxxxxxxxxxxxx`)

### 5. Konfiguration in script.js einfügen
Öffnen Sie `script.js` und suchen Sie nach `EMAILJS_CONFIG`. Ersetzen Sie die Platzhalter:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'Ihre_Public_Key_hier',        // z.B. 'abc123xyz789'
    SERVICE_ID: 'Ihre_Service_ID_hier',         // z.B. 'service_abc123'
    TEMPLATE_ID: 'Ihre_Template_ID_hier'        // z.B. 'template_xyz789'
};
```

## ✅ Testen
1. Öffnen Sie die Website
2. Klicken Sie auf "Kontakt" im Footer
3. Füllen Sie das Formular aus
4. Senden Sie eine Testnachricht
5. Prüfen Sie Ihr Postfach **info@baederbook.de**

## 🔒 Sicherheit
- Die Public Key ist sicher für die Verwendung im Frontend
- EmailJS verschlüsselt alle Verbindungen
- Ihre Service-Credentials bleiben sicher auf EmailJS-Servern

## 📊 Kostenloses Limit
- **200 E-Mails/Monat** kostenlos
- Für mehr E-Mails: Upgrade auf einen bezahlten Plan

## 🆘 Probleme?
Falls E-Mails nicht ankommen:
1. Prüfen Sie die Browser-Konsole auf Fehler
2. Überprüfen Sie Ihre EmailJS-Konfiguration
3. Stellen Sie sicher, dass der Email Service korrekt verbunden ist
4. Prüfen Sie den Spam-Ordner

---

**Alternative:** Falls EmailJS nicht funktioniert, öffnet das Formular automatisch den Standard-E-Mail-Client als Fallback.

