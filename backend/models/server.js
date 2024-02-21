const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.js');
class Server{

    constructor(){
        this.app = express();
      
        this.port = process.env.PORT
        this.usuariosPath = "/api/usuarios"

        //Conectar a la base de datos
        this.connectDB()

        //Middlewares
        this.middlewares();

        //leer y parsear 
        this.app.use(express.json());

        //Routing
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //cors 
        this.app.use(cors());

        //public directory 
        this.app.use(express.static('public'))
    }

    routes(){
       this.app.use(this.usuariosPath, require('../routes/usuario.routes.js'))
       
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`server ronning on port: ${this.port} `);
        })
    }
}

module.exports = Server  