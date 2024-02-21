const {Router} = require('express');
const {
    getUser, 
    postUser, 
    deleteUser, 
    putUser, 
    patchUser
} = require('../controllers/usuarios.controllers.js')
const {check} = require('express-validator')

const {validateDocuments} = require('../middlewares/validate.documents.js')
const router = Router(); 

router.get("/", getUser);
router.post("/",[
    check('nombre', 'Nombre no es valido').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'password debe contener minimo 6 cts').isLength({min:6}),
    check('rol', 'no es un rol valido').isIn(['ADMIN', 'USER']),
    validateDocuments

], postUser );
router.delete("/", deleteUser);
router.put("/", putUser)
router.patch("/", patchUser)



module.exports = router;