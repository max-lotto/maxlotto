import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://www.lottomaticaitalia.it/lotto/estrazioni');
    const html = response.data;
    const $ = cheerio.load(html);

    const estrazioni = [];

    $('.draws-archive-table .table-responsive table tbody tr').each((i, el) => {
      const dataEstrazione = $(el).find('td').eq(0).text().trim();
      const ruote = {
        Bari: [],
        Cagliari: [],
        Firenze: [],
        Genova: [],
        Milano: [],
        Napoli: [],
        Palermo: [],
        Roma: [],
        Torino: [],
        Venezia: [],
        Nazionale: []
      };

      $(el).find('td').each((index, td) => {
        if (index > 0 && index <= 11) {
          const numeriText = $(td).text().trim().split(' ').filter(n => n !== '');
          ruote[Object.keys(ruote)[index - 1]] = numeriText.map(n => parseInt(n));
        }
      });

      estrazioni.push({
        data: dataEstrazione,
        ruote: ruote
      });
    });

    // Se ?last=true ritorna solo ultima estrazione
    if (req.query.last === 'true') {
      return res.status(200).json(estrazioni[0]);
    }

    res.status(200).json(estrazioni);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore caricamento estrazioni' });
  }
}
