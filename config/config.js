require('dotenv').config();

const PORT = process.env.PORT;
const KEY = process.env.API_KEY;
const URI = process.env.MONGO_URI;


module.exports = {
	PORT,
	KEY,
	URI
}