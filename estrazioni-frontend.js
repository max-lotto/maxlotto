async function caricaUltimaEstrazione() {
  try {
    const response = await fetch('/api/estrazione');
    const data = await response.json();

    // Mostra la data dell'estrazione
    const dataEstrazione = document.getElementById('dataEstrazione');
    dataEstrazione.textContent = `Estrazione del ${data.data}`;

    // Costruisci la tabella
    const tabellaDiv = document.getElementById('tabellaEstrazione');
    let html = '<table><tr><th>Ruota</th><th>Numeri</th></tr>';

    for (const ruota in data.ruote) {
      html += `<tr><td>${ruota}</td><td>${data.ruote[ruota].join(' - ')}</td></tr>`;
    }

    html += '</table>';
    tabellaDiv.innerHTML = html;

  } catch (error) {
    console.error('Errore nel caricamento:', error);
    const tabellaDiv = document.getElementById('tabellaEstrazione');
    tabellaDiv.innerHTML = '<p>Errore nel caricamento dei dati.</p>';
  }
}

// Carica estrazione al caricamento pagina
caricaUltimaEstrazione();
// Avvia caricamento appena apre pagina
caricaUltimaEstrazione();


