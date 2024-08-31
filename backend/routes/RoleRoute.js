const express = require('express');
const { getRoles, createRole, editRole, deleteRole } = require('../controllers/RoleController')

const router = express.Router();

router.post('/create', createRole)
router.get('/all', getRoles)
router.put('/edit/:id', editRole);
router.delete('/delete/:id', deleteRole); 

module.exports = router;