require('dotenv').config();
const axios = require('axios')
const Series = require('../models/seriesModel');
const generateHash = require('../utils/hashUtils');


const buildImageUrl = require('../utils/imageUtils');

const publicKey = process.env.MARVEL_PUBLIC_KEY;

const baseURL = 'http://gateway.marvel.com/v1/public';

headers = {
  'Content-Type': 'application/json'
};

async function getSeries(req, res){
    try {
        const response = await axios.get(`${baseURL}/series`, {
            headers: headers,
            params: {
                apikey: publicKey,
                ts: Date.now(),
                hash: generateHash(Date.now())
            }
        });

        if('data' in response){
          const data = response.data.data
          const seriesData = data.results
          const series = seriesData.map(seriesData => {
            return new Series(
              seriesData.id,
              seriesData.title,
              seriesData.description,
              seriesData.startYear,
              seriesData.endYear,
              buildImageUrl(seriesData.thumbnail.path, seriesData.thumbnail.extension),
          );
        });

        res.json(series);

      }else{
        console.error('Resposta da API não contém a propriedade "data".', response);
        res.status(500).json({ error: 'Erro na requisição', details: 'Resposta da API inválida' });
    }
    } 
    catch (error) {
      console.error('Erro na requisição:', error);
      res.status(500).json({ error: 'Erro na requisição', details: error.message });
    }
}

module.exports = {
    getSeries
}