// Dokumente Management System
// Handles Angebote, Aufträge und Rechnungen

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Initialize price calculations
    initializePriceCalculations();
    
    // Initialize form submissions
    initializeFormSubmissions();
    
    // Initialize due date calculation for invoices
    const rechnungDatum = document.getElementById('rechnung-datum');
    const rechnungZahlungsziel = document.getElementById('rechnung-zahlungsziel');
    const rechnungFaellig = document.getElementById('rechnung-faellig');
    
    if (rechnungDatum && rechnungZahlungsziel && rechnungFaellig) {
        rechnungDatum.addEventListener('change', calculateDueDate);
        rechnungZahlungsziel.addEventListener('input', calculateDueDate);
    }
    
    // Load saved documents
    loadSavedDocuments();
});

// Initialize price calculations for all forms
function initializePriceCalculations() {
    // Angebot price calculation (Abo-Modell)
    const angebotInputs = ['angebot-einrichtung', 'angebot-mwst-einrichtung', 'angebot-datenvolumen', 'angebot-preis-pro-gb', 'angebot-mwst-monatlich'];
    angebotInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateAngebotPrice);
        }
    });
    
    // Auftrag price calculation (unchanged)
    const auftragInputs = ['auftrag-menge', 'auftrag-preis', 'auftrag-mwst'];
    auftragInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateAuftragPrice);
        }
    });
    
    // Rechnung price calculation (Abo-Modell)
    const rechnungInputs = ['rechnung-einrichtung', 'rechnung-mwst-einrichtung', 'rechnung-datenvolumen', 'rechnung-preis-pro-gb', 'rechnung-mwst-monatlich'];
    rechnungInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateRechnungPrice);
        }
    });
}

// Calculate Angebot price (Abo-Modell: Einrichtung + erste Monatsgebühr)
function calculateAngebotPrice() {
    // Einrichtung
    const einrichtung = parseFloat(document.getElementById('angebot-einrichtung').value) || 0;
    const mwstEinrichtung = parseFloat(document.getElementById('angebot-mwst-einrichtung').value) || 0;
    const einrichtungBrutto = einrichtung * (1 + mwstEinrichtung / 100);
    
    // Monatliche Gebühr
    const datenvolumen = parseFloat(document.getElementById('angebot-datenvolumen').value) || 0;
    const preisProGB = parseFloat(document.getElementById('angebot-preis-pro-gb').value) || 0;
    const monatlichNetto = datenvolumen * preisProGB;
    const mwstMonatlich = parseFloat(document.getElementById('angebot-mwst-monatlich').value) || 0;
    const monatlichBrutto = monatlichNetto * (1 + mwstMonatlich / 100);
    
    // Monatliche Gebühr anzeigen
    document.getElementById('angebot-monatlich').value = monatlichBrutto.toFixed(2);
    
    // Gesamtpreis (Einrichtung + erste Monatsgebühr)
    const gesamt = einrichtungBrutto + monatlichBrutto;
    document.getElementById('angebot-gesamt').value = gesamt.toFixed(2);
}

// Calculate Auftrag price
function calculateAuftragPrice() {
    const menge = parseFloat(document.getElementById('auftrag-menge').value) || 0;
    const preis = parseFloat(document.getElementById('auftrag-preis').value) || 0;
    const mwst = parseFloat(document.getElementById('auftrag-mwst').value) || 0;
    
    const netto = menge * preis;
    const brutto = netto * (1 + mwst / 100);
    
    document.getElementById('auftrag-gesamt').value = brutto.toFixed(2);
}

// Toggle Rechnung typ (Einrichtung oder Monatlich)
function toggleRechnungTyp() {
    const typ = document.getElementById('rechnung-typ').value;
    const einrichtungBlock = document.getElementById('rechnung-einrichtung-block');
    const monatlichBlock = document.getElementById('rechnung-monatlich-block');
    
    if (typ === 'einrichtung') {
        einrichtungBlock.style.display = 'block';
        monatlichBlock.style.display = 'none';
        // Clear monatlich fields
        document.getElementById('rechnung-datenvolumen').value = '';
        document.getElementById('rechnung-preis-pro-gb').value = '';
        document.getElementById('rechnung-monatlich').value = '';
    } else if (typ === 'monatlich') {
        einrichtungBlock.style.display = 'none';
        monatlichBlock.style.display = 'block';
        // Clear einrichtung fields
        document.getElementById('rechnung-einrichtung').value = '';
    } else {
        einrichtungBlock.style.display = 'none';
        monatlichBlock.style.display = 'none';
    }
    
    calculateRechnungPrice();
}

// Calculate Rechnung price (Abo-Modell: Einrichtung ODER Monatlich)
function calculateRechnungPrice() {
    const typ = document.getElementById('rechnung-typ')?.value;
    
    let netto = 0;
    let mwst = 0;
    
    if (typ === 'einrichtung') {
        netto = parseFloat(document.getElementById('rechnung-einrichtung').value) || 0;
        mwst = parseFloat(document.getElementById('rechnung-mwst-einrichtung').value) || 0;
    } else if (typ === 'monatlich') {
        const datenvolumen = parseFloat(document.getElementById('rechnung-datenvolumen').value) || 0;
        const preisProGB = parseFloat(document.getElementById('rechnung-preis-pro-gb').value) || 0;
        netto = datenvolumen * preisProGB;
        mwst = parseFloat(document.getElementById('rechnung-mwst-monatlich').value) || 0;
        
        // Monatliche Gebühr anzeigen
        const monatlichBrutto = netto * (1 + mwst / 100);
        document.getElementById('rechnung-monatlich').value = monatlichBrutto.toFixed(2);
    }
    
    const mwstBetrag = netto * (mwst / 100);
    const brutto = netto + mwstBetrag;
    
    document.getElementById('rechnung-netto').value = netto.toFixed(2);
    document.getElementById('rechnung-mwst-betrag').value = mwstBetrag.toFixed(2);
    document.getElementById('rechnung-brutto').value = brutto.toFixed(2);
}

// Initialize form submissions
function initializeFormSubmissions() {
    // Angebot form
    const angebotForm = document.getElementById('angebotForm');
    if (angebotForm) {
        angebotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const einrichtung = document.getElementById('angebot-einrichtung').value;
            const datenvolumen = document.getElementById('angebot-datenvolumen').value;
            const preisProGB = document.getElementById('angebot-preis-pro-gb').value;
            
            if (!einrichtung || parseFloat(einrichtung) <= 0) {
                alert('Bitte geben Sie einen gültigen Einrichtungspreis ein.');
                return;
            }
            
            if (!datenvolumen || parseFloat(datenvolumen) <= 0) {
                alert('Bitte geben Sie ein gültiges Datenvolumen ein.');
                return;
            }
            
            if (!preisProGB || parseFloat(preisProGB) <= 0) {
                alert('Bitte geben Sie einen gültigen Preis pro GB ein.');
                return;
            }
            
            saveDocument('angebot', collectFormData(this));
        });
    }
    
    // Auftrag form
    const auftragForm = document.getElementById('auftragForm');
    if (auftragForm) {
        auftragForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveDocument('auftrag', collectFormData(this));
        });
    }
    
    // Rechnung form
    const rechnungForm = document.getElementById('rechnungForm');
    if (rechnungForm) {
        rechnungForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate that rechnung type is selected
            const rechnungTyp = document.getElementById('rechnung-typ').value;
            if (!rechnungTyp) {
                alert('Bitte wählen Sie einen Rechnungstyp aus.');
                return;
            }
            
            // Validate required fields based on type
            if (rechnungTyp === 'einrichtung') {
                const einrichtung = document.getElementById('rechnung-einrichtung').value;
                if (!einrichtung || parseFloat(einrichtung) <= 0) {
                    alert('Bitte geben Sie einen gültigen Einrichtungspreis ein.');
                    return;
                }
            } else if (rechnungTyp === 'monatlich') {
                const datenvolumen = document.getElementById('rechnung-datenvolumen').value;
                const preisProGB = document.getElementById('rechnung-preis-pro-gb').value;
                if (!datenvolumen || parseFloat(datenvolumen) <= 0) {
                    alert('Bitte geben Sie ein gültiges Datenvolumen ein.');
                    return;
                }
                if (!preisProGB || parseFloat(preisProGB) <= 0) {
                    alert('Bitte geben Sie einen gültigen Preis pro GB ein.');
                    return;
                }
            }
            
            saveDocument('rechnung', collectFormData(this));
        });
    }
}

// Collect form data
function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add metadata
    data.createdAt = new Date().toISOString();
    data.id = Date.now().toString();
    
    return data;
}

// Save document to localStorage
function saveDocument(type, data) {
    try {
        const key = `baederbook_documents_${type}`;
        let documents = JSON.parse(localStorage.getItem(key) || '[]');
        
        documents.push({
            ...data,
            type: type,
            documentNumber: data[`${type}-nr`] || data[`${type}-nummer`]
        });
        
        localStorage.setItem(key, JSON.stringify(documents));
        
        // Show success message
        alert(`${type === 'angebot' ? 'Angebot' : type === 'auftrag' ? 'Auftrag' : 'Rechnung'} erfolgreich gespeichert!`);
        
        // Reset form
        document.getElementById(`${type}Form`).reset();
        
        // Reload document list
        loadSavedDocuments();
    } catch (e) {
        console.error('Error saving document:', e);
        alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
    }
}

// Load saved documents
function loadSavedDocuments() {
    const documentList = document.getElementById('documentList');
    if (!documentList) return;
    
    const types = ['angebot', 'auftrag', 'rechnung'];
    let allDocuments = [];
    
    types.forEach(type => {
        const key = `baederbook_documents_${type}`;
        const documents = JSON.parse(localStorage.getItem(key) || '[]');
        documents.forEach(doc => {
            allDocuments.push({
                ...doc,
                type: type
            });
        });
    });
    
    // Sort by creation date (newest first)
    allDocuments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Display documents
    if (allDocuments.length === 0) {
        documentList.innerHTML = '<p style="text-align: center; color: var(--text-color); opacity: 0.7; padding: 40px;">Noch keine Dokumente gespeichert.</p>';
        return;
    }
    
    documentList.innerHTML = allDocuments.map(doc => {
        const typeLabel = doc.type === 'angebot' ? 'Angebot' : doc.type === 'auftrag' ? 'Auftrag' : 'Rechnung';
        const date = new Date(doc.createdAt).toLocaleDateString('de-DE');
        const kunde = doc[`${doc.type}-kunde`] || 'Nicht angegeben';
        const nummer = doc[`${doc.type}-nr`] || doc.documentNumber || 'Keine Nummer';
        
        return `
            <div class="document-item">
                <div class="document-info">
                    <h4>${typeLabel} ${nummer}</h4>
                    <p>Kunde: ${kunde} | Erstellt: ${date}</p>
                </div>
                <div class="document-actions">
                    <button class="btn btn-secondary btn-small" onclick="viewDocument('${doc.id}', '${doc.type}')">Ansehen</button>
                    <button class="btn btn-secondary btn-small" onclick="deleteDocument('${doc.id}', '${doc.type}')">Löschen</button>
                </div>
            </div>
        `;
    }).join('');
}

// View document
function viewDocument(id, type) {
    const key = `baederbook_documents_${type}`;
    const documents = JSON.parse(localStorage.getItem(key) || '[]');
    const document = documents.find(doc => doc.id === id);
    
    if (!document) {
        alert('Dokument nicht gefunden.');
        return;
    }
    
    // Switch to correct tab
    const tabButton = document.querySelector(`[data-tab="${type}"]`);
    if (tabButton) {
        tabButton.click();
    }
    
    // Fill form with document data
    setTimeout(() => {
        const form = document.getElementById(`${type}Form`);
        if (form) {
            // For Rechnung, set type first to show correct fields
            if (type === 'rechnung' && document['rechnung-typ']) {
                document.getElementById('rechnung-typ').value = document['rechnung-typ'];
                toggleRechnungTyp();
            }
            
            Object.keys(document).forEach(key => {
                if (key !== 'id' && key !== 'type' && key !== 'createdAt' && key !== 'documentNumber') {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        input.value = document[key];
                    }
                }
            });
            
            // Recalculate prices
            if (type === 'angebot') calculateAngebotPrice();
            if (type === 'auftrag') calculateAuftragPrice();
            if (type === 'rechnung') {
                // Wait a bit for fields to be visible
                setTimeout(() => calculateRechnungPrice(), 50);
            }
        }
    }, 100);
}

// Delete document
function deleteDocument(id, type) {
    if (!confirm('Möchten Sie dieses Dokument wirklich löschen?')) {
        return;
    }
    
    try {
        const key = `baederbook_documents_${type}`;
        let documents = JSON.parse(localStorage.getItem(key) || '[]');
        documents = documents.filter(doc => doc.id !== id);
        localStorage.setItem(key, JSON.stringify(documents));
        
        alert('Dokument erfolgreich gelöscht.');
        loadSavedDocuments();
    } catch (e) {
        console.error('Error deleting document:', e);
        alert('Fehler beim Löschen. Bitte versuchen Sie es erneut.');
    }
}

// Calculate due date for invoices
function calculateDueDate() {
    const rechnungDatum = document.getElementById('rechnung-datum');
    const rechnungZahlungsziel = document.getElementById('rechnung-zahlungsziel');
    const rechnungFaellig = document.getElementById('rechnung-faellig');
    
    if (rechnungDatum && rechnungZahlungsziel && rechnungFaellig && rechnungDatum.value) {
        const invoiceDate = new Date(rechnungDatum.value);
        const paymentDays = parseInt(rechnungZahlungsziel.value) || 14;
        
        invoiceDate.setDate(invoiceDate.getDate() + paymentDays);
        
        const dueDate = invoiceDate.toISOString().split('T')[0];
        rechnungFaellig.value = dueDate;
    }
}

// Make functions globally available
window.viewDocument = viewDocument;
window.deleteDocument = deleteDocument;
window.toggleRechnungTyp = toggleRechnungTyp;

