const express =require('express');
const router = express.Router();
const userController = require('../controller/userControl');


router.post('/add',userController.addUser);
router.put('/update/:id',userController.updateUser);
router.delete('/delete/:id',userController.deleteUser);
router.get ('/getdata',userController.getAlldata);


module.exports = router;