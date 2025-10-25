# 🌊 Bäderbook - Marketing Landing Page

Eine moderne Marketing-Seite für Bäderbook - das universelle Mitarbeiter-Intranet für Bäder und Freizeiteinrichtungen.
Design inspiriert von Apple mit minimalistischem, elegantem Look.

## 🎨 Features

- **Modernes Apple-inspiriertes Design** - Klares, minimalistisches Layout mit eleganten Animationen
- **Responsives Design** - Perfekt optimiert für Desktop, Tablet und Mobile
- **Interaktive Elemente** - Smooth Scrolling, Hover-Effekte und Parallax-Animationen
- **Professionelles Logo** - Individuelles SVG-Logo mit Wasserthematik
- **Lokales Hosting** - Läuft komplett lokal ohne externe Abhängigkeiten

## 📁 Projektstruktur

```
Bäderbook/
├── index.html          # Haupt-HTML-Datei
├── style.css           # CSS-Styling (Apple-Stil)
├── script.js           # JavaScript für Interaktivität
├── logo.svg           # Bäderbook Logo (SVG)
└── README.md          # Diese Datei
```

## 🚀 Installation & Start

### Option 1: Direkt im Browser öffnen
1. Öffnen Sie die Datei `index.html` direkt in Ihrem Browser
2. Fertig! Die Website läuft jetzt lokal

### Option 2: Mit Python HTTP Server (empfohlen)
```bash
# Im Projektverzeichnis ausführen:
cd /Users/christofdrost/Bäderbook

# Python 3
python3 -m http.server 8000

# Dann im Browser öffnen:
# http://localhost:8000
```

### Option 3: Mit Node.js (http-server)
```bash
# http-server installieren (einmalig):
npm install -g http-server

# Server starten:
cd /Users/christofdrost/Bäderbook
http-server

# Im Browser öffnen:
# http://localhost:8080
```

### Option 4: Mit PHP
```bash
cd /Users/christofdrost/Bäderbook
php -S localhost:8000

# Im Browser öffnen:
# http://localhost:8000
```

## 🎯 Sektionen

Die Marketing-Website ist in folgende Bereiche unterteilt:

1. **Hero Section** - "Ihr modernes Mitarbeiter-Intranet" mit Call-to-Action zur Demo
2. **Was bietet Bäderbook?** - 6 Hauptfunktionen (Dashboard, Aufgaben, Schulungen, Dokumente, Kontakte, Notfall)
3. **Warum Bäderbook?** - Vorteile wie App-Design, Mobile-Optimierung und einfache Bedienung
4. **Ihre Vorteile** - Statistiken (6 Funktionen, 24/7 Zugriff, 100% kostenlos, Modern)
5. **Call-to-Action** - "Bereit für effizienteres Arbeiten?" mit Link zur Live Demo
6. **Footer** - Navigation mit Links zur Demo-Seite

## 🔗 Wichtig

Diese Seite ist eine **Marketing-Landing-Page** für Bäderbook.
- **Live Demo**: https://laola-intra.netlify.app (Beispiel-Implementierung)
- **Demo-Quellcode**: /Users/christofdrost/laola-intra/

## 🎨 Design-Elemente

### Farbschema
- **Primary**: `#0066CC` (Apple Blue)
- **Secondary**: `#00A8E8` (Light Blue)
- **Dark**: `#1D1D1F` (Almost Black)
- **Light Gray**: `#F5F5F7`

### Typografie
- System-Schriftarten für nativen Look: `-apple-system, BlinkMacSystemFont, 'Segoe UI'`

### Animationen
- Floating Cards im Hero-Bereich
- Fade-in beim Scrollen
- Hover-Effekte auf Karten
- Parallax-Effekte
- Counter-Animationen für Statistiken

## 🔧 Anpassungen

### Logo ändern
Das Logo symbolisiert Bäderbook:
- Ein Schwimmbecken (repräsentiert Bäder und Freizeiteinrichtungen)
- Vier Mitarbeiter-Symbole um das Becken (Team-Aspekt)
- Ein Info-Symbol in der Mitte (Informationsplattform)
- Verbindungslinien im Original (Netzwerk und Zusammenarbeit)

Dateien:
- `logo.svg` - Standalone-Datei
- `favicon.svg` - Browser-Icon
- `index.html` - Inline im Navbar und Footer

### Links zur Demo-Plattform
Wichtige Demo-Links:
- Haupt-CTA Button: https://laola-intra.netlify.app (Live Demo)
- Footer-Links: Mit #-Ankern zu Sektionen (dashboard, aufgaben, dokumente, kontakte)

### Farben anpassen
Öffnen Sie `style.css` und ändern Sie die CSS-Variablen im `:root` Selektor:
```css
:root {
    --primary-color: #0066CC;
    --secondary-color: #00A8E8;
    /* ... weitere Farben */
}
```

### Inhalte ändern
Alle Texte befinden sich in `index.html` und können direkt bearbeitet werden.

## 📱 Browser-Kompatibilität

- ✅ Chrome/Edge (neueste Versionen)
- ✅ Firefox (neueste Versionen)
- ✅ Safari (neueste Versionen)
- ✅ Mobile Browser (iOS Safari, Chrome Mobile)

## 🌟 Highlights

- **Keine externen Abhängigkeiten** - Läuft komplett eigenständig
- **Optimierte Performance** - Schnelle Ladezeiten
- **Community-Fokus** - Von Mitarbeitern für Mitarbeiter
- **Barrierefreiheit** - Semantisches HTML
- **SEO-freundlich** - Strukturierte Inhalte
- **Modern & Zeitlos** - Professionelles Erscheinungsbild

## 💡 Bäderbook Funktionen

Die Bäderbook Demo (https://laola-intra.netlify.app) zeigt folgende Funktionen:

### 📊 **Dashboard**
- Übersicht über aktuelle Updates
- Statistiken (Aktive Mitarbeiter, Wassertemperatur, Status)
- Quick Actions für häufige Aufgaben

### ✅ **Aufgabenverwaltung**
- ToDo-Listen mit Prioritäten
- Deadlines und Zuweisungen
- Filter-Optionen (Alle, Offen, Erledigt, Priorität)

### 📚 **Schulungen & Unterweisungen**
- Übersicht über Pflichtschulungen
- Weiterbildungsangebote
- Zertifikate und Nachweise

### 📄 **Dokumente & Formulare**
- Kategorisierte Dokumente (Sicherheit, Arbeitsabläufe, Personal)
- Download-Funktionen
- Checklisten für Öffnung/Schließung

### 👥 **Team & Kontakte**
- Management-Kontakte
- Notfallnummern
- Team-Verzeichnis

### 🚨 **Notfall & Sicherheit**
- Notfallprotokolle
- Schritt-für-Schritt Anleitungen
- Schnellzugriff auf wichtige Informationen

## 📝 Lizenz

Erstellt für Bäderbook - Alle Rechte vorbehalten © 2025

---

Made with 💙 für die Bäderbranche

