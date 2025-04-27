async function caricaUltimaEstrazione() {
  try {
    const res = await fetch('/api/estrazioni?last=true');
    const estrazione = await res.json();

    const tabella = document.getElementById('tabellaEstrazione');
    const data = document.getElementById('dataEstrazione');

    data.innerText = `Data Estrazione: ${estrazione.data}`;

    let html = `
      <tr>
        <th>Ruota</th>
        <th>Numeri</th>
      </tr>
    `;

    for (const ruota in estrazione.ruote) {
      html += `
        <tr>
          <td>${ruota}</td>
          <td>${estrazione.ruote[ruota].join(', ')}</td>
        </tr>
      `;
    }

    tabella.innerHTML = html;
  } catch (err) {
    console.error('Errore caricamento estrazione:', err);
  }
}

// Carica appena apre pagina
caricaUltimaEstrazione();
