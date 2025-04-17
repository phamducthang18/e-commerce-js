const ProductModel = require('../models/productModel');

class ProductController {
    async createProduct(req, res) {
        const { name, description, price, stock } = req.body;

        try {
            const product = await ProductModel.create(name, description, price, stock);
            res.status(201).json({ message: 'Product created successfully', product });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Error creating product' });
        }
    }

    async getAllProducts(req, res) {
        const {currentPage = 0} = req.query;
        
        try {
            const products = ProductModel.findAll(currentPage);
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Error fetching products' });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = ProductModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ message: 'Error fetching product' });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;

        try {
            const updatedProduct = await ProductModel.update(id, name, description, price, stock);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const deletedProduct = await ProductModel.delete(id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: 'Error deleting product' });
        }
    }

    async searchProducts(req, res) {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        try {
            const products = await ProductModel.search(query);
            res.status(200).json(products);
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ message: 'Error searching products' });
        }
    }

    // async syncToElasticsearch(req, res) {
    //     try {
    //         await ProductModel.syncToElasticsearch();
    //         res.status(200).json({ message: 'Products synchronized with Elasticsearch successfully' });
    //     } catch (error) {
    //         console.error('Error syncing to Elasticsearch:', error);
    //         res.status(500).json({ message: 'Error syncing products to Elasticsearch' });
    //     }
    // }
}

module.exports = ProductController;