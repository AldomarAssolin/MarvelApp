require('dotenv').config();

const crypto = require('crypto');
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

function generateHash(timestamp) {
  const dataToHash = timestamp.toString() + privateKey + publicKey;
  const hash = crypto.createHash('md5').update(dataToHash).digest('hex');
  return hash;
}

module.exports = generateHash;


