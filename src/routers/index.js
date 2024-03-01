const siteRouter = require('./site')
const loginsignupRouter = require('./login_signup')
const adminRouter = require('./admin')
const productRouter = require('./product');
const mdw = require('../middleware/check');

function router(app) {
    app.use('/product', productRouter);
    app.use('/admin', adminRouter);
    app.use('/loginsignup', loginsignupRouter)
    app.use('/',siteRouter)
}

module.exports = router;