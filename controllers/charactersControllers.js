require('dotenv').config();

const axios = require('axios')

const Characters = require('../models/charactersModel');
const generateHash = require('../utils/hashUtils');
const buildImageUrl = require('../utils/imageUtils');

const publicKey = process.env.MARVEL_PUBLIC_KEY;


const baseURL = 'https://gateway.marvel.com/v1/public';

headers = {
    'Content-Type': 'application/json'
  };

async function getCharacters(req, res){
    
    try {
        const timestamp = Date.now();
        const hash = generateHash(timestamp);

        const response = await axios.get(`${baseURL}/characters`, {
            headers: headers,
            params: {
                apikey: publicKey,
                ts: timestamp,
                hash: hash
            }
        });

        if('data' in response){
            const data = response.data.data;
            const charactersData = data.results
            const characters = charactersData.map(charactersData => {
                return new Characters(
                    charactersData.id,
                    charactersData.name,
                    charactersData.description,
                    buildImageUrl(charactersData.thumbnail.path, charactersData.thumbnail.extension),
                    charactersData.modified,
                    charactersData.comics,
                    charactersData.stories,
                    charactersData.series
                )
            })
            
            res.json(characters);
        }else{
            console.error('Resposta da API não contém a propriedade "data".', response);
            res.status(500).json({ error: 'Erro na requisição', details: 'Resposta da API inválida' });
        }
        

    } catch (error) {
        // res.status(500).json({error: 'Erro na requisição'})
        console.error('Erro na requisição:', error);
        res.status(500).json({ error: 'Erro na requisição', details: error.message });
    }
}

module.exports = {
    getCharacters
}