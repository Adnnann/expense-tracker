require('dotenv').config();

const config = {
    port: 5000,
    secret: process.env.JWT_SECRET || 'ay+5M9*85&B8W*zp',
    mongoURI: process.env.MONGO_URI 
}

export default config;