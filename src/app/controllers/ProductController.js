const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

const Product = require('../models/Product')

class ProductController {

    //[GET] product/create
    create_get(req, res, next) {
        res.render('product/create')
    }

    //[POST] product/create
    create_post(req, res, next) {

        const product = new Product(req.body);

        product.save()
            .then(() => res.redirect('/product/listproduct'))
            .then(next)
    }

    //[GET] show list product
    show_listproduct(req, res, next) {
        Product.find({}).
            then(products => {
                // courses = courses.map(course => course.toObject())
                res.render('product/list-product', {
                    products: mutipleMongooseToObject(products)
                })
            })
            .catch(next);
    }

    //[GET] product/edit/:id
    edit_get(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.render('product/edit', {
                product: mongooseToObject(product)
            }))
            .catch(next);
    }
    
    //[PUT] product/edit/:id
    edit_put(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/product/listproduct'))
            .catch(next)
    }

    //[PUT] product/delete/:id
    delete_del(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new ProductController;