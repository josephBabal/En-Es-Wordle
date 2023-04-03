import fs from 'fs';

const handler = (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0562cffb30mshf824d36bb91ac4fp186097jsnc42c1fd9923f',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  fetch('https://wordsapiv1.p.rapidapi.com/words/?letters=5&hasDetails=hasDetails&language=es', options)
    .then(response => response.json())
    .then(response => {
      const jsonData = JSON.stringify(response);

      // Write the JSON data to a file called 'data.json'
      fs.writeFile('./public/spanishData.json', jsonData, err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error writing data to file' });
        }

        return res.status(200).json({ message: 'Data written to file' });
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching data from API' });
    });
};

export default handler