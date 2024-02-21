const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Db no conectada')
    }
}

module.exports = {
    dbConnection
}