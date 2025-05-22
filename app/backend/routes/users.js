import express from 'express';
import { deleteUser, getUsers,updateUser} from '../controllers/user.function.js'

const router = express.Router();

//obtiene usuarios sin las contraseñas
router.get('/', async (req, res) =>{
    try{
        const users = await getUsers();
        res.send(users);
    }catch (error){
        res.status(500).json({error: "Error al comunicarse con la base de datos"});
    }
});


// Editar usuario (password, username)
router.put('/', async (req, res) => {
    try{
        const upUser = await updateUser(req.body);
        res.status(200).json({message: "User updated successfull"});
    }catch(error){
        res.status(500).json({error: error.message})
    }

})


// elimina usuario (cambiar valor a is_active)
router.delete('/', async (req, res) => {
    try{
        const delUser = await deleteUser(req.body);
        res.status(201).json({message: "User deleted correctly"});
    } catch(error){
        res.status(500).json({error: error.message});
    }
});




export default router;