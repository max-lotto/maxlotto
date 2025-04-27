async function caricaUltimaEstrazione() {
  try {
    const res = await fetch('/api/estrazioni?last=true');
    const estrazione = await res.json();

    const tabella = document.getElementById('tabellaEstrazione');
    const data = document.getElementById('dataEstrazione');

    data.innerText = `Data Estrazione: ${estrazione.data}`;

    let html = `
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <th style="background-color: #003049; color: white; padding: 10px;">Ruota</th>
          <th style="background-color: #003049; color: white; padding: 10px;">Numeri Estratti</th>
        </tr>
    `;

    for (const ruota in estrazione.ruote) {
      html += `
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px;">${ruota}</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${estrazione.ruote[ruota].join(' - ')}</td>
        </tr>
      `;
    }

    html += `</table>`;
    tabella.innerHTML = html;
  } catch (err) {
    console.error('Errore caricamento estrazione:', err);
  }
}

// Avvia caricamento appena apre pagina
caricaUltimaEstrazione();


