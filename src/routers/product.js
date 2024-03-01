const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const mdw = require('../middleware/check')

router.get('/create', productController.create_get); //get create
router.post('/create', productController.create_post); //post create
router.get('/listproduct', mdw.check, productController.show_listproduct); //post create
router.get('/edit/:id', productController.edit_get); //get edit
router.put('/edit/:id', productController.edit_put); //put edit
router.delete('/delete/:id', productController.delete_del); // delete

module.exports = router;