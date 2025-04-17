const express = require('express');
const ProductController = require('../controllers/productController');

const setProductRoutes = (app) => {
    const router = express.Router();
    const productController = new ProductController();

    // Product routes
    router.get('/products/search', (req, res) => productController.searchProducts(req, res));
    router.post('/products/sync', (req, res) => productController.syncToElasticsearch(req, res));

    router.post('/products', (req, res) => productController.createProduct(req, res));
    router.get('/products', (req, res) => productController.getAllProducts(req, res));
    router.get('/products/:id', (req, res) => productController.getProductById(req, res));
    router.put('/products/:id', (req, res) => productController.updateProduct(req, res));
    router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));
    // router.get('/products/category/:category', (req, res) => productController.getProductsByCategory(req, res));
    app.use('/api', router);
};

module.exports = setProductRoutes;