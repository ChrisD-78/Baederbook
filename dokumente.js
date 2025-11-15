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
    // Angebot price calculation
    const angebotInputs = ['angebot-menge', 'angebot-preis', 'angebot-mwst'];
    angebotInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateAngebotPrice);
        }
    });
    
    // Auftrag price calculation
    const auftragInputs = ['auftrag-menge', 'auftrag-preis', 'auftrag-mwst'];
    auftragInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateAuftragPrice);
        }
    });
    
    // Rechnung price calculation
    const rechnungInputs = ['rechnung-menge', 'rechnung-preis', 'rechnung-mwst'];
    rechnungInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateRechnungPrice);
        }
    });
}

// Calculate Angebot price
function calculateAngebotPrice() {
    const menge = parseFloat(document.getElementById('angebot-menge').value) || 0;
    const preis = parseFloat(document.getElementById('angebot-preis').value) || 0;
    const mwst = parseFloat(document.getElementById('angebot-mwst').value) || 0;
    
    const netto = menge * preis;
    const brutto = netto * (1 + mwst / 100);
    
    document.getElementById('angebot-gesamt').value = brutto.toFixed(2);
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

// Calculate Rechnung price
function calculateRechnungPrice() {
    const menge = parseFloat(document.getElementById('rechnung-menge').value) || 0;
    const preis = parseFloat(document.getElementById('rechnung-preis').value) || 0;
    const mwst = parseFloat(document.getElementById('rechnung-mwst').value) || 0;
    
    const netto = menge * preis;
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
            if (type === 'rechnung') calculateRechnungPrice();
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

