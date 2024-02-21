const Usuario = require('../models/Usuario.js')
const bcryptjs = require('bcryptjs');


const getUser = (req , res)=>{
    res.json({
        "message": "home page"
    })
} 

const postUser = async (req , res)=>{


    

    const {nombre, email, password, rol} = req.body;
    const usuario = new Usuario({nombre, email, password, rol});

    //Verificar si el correo ya existe(duplicado)
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        return res.status(400).json({
            msg: "Email is already registered"
        })
    }

    //encriptar nuestra contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();
    res.json({
        "message": "post api",
        usuario
    })
}

const deleteUser = (req , res)=>{
    res.json({
        "message": "delete api "
    })
}

const putUser = (req , res)=>{
    res.json({
        "message": "put api "
    })
}

const patchUser = (req , res)=>{
    res.json({
        "message": "patch api "
    })
}

module.exports = {
    getUser,
    deleteUser,
    postUser,
    patchUser,
    putUser
}