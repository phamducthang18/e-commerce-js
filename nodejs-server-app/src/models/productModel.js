const db = require('../config/database');
const { client } = require('../config/elasticsearch');

class ProductModel {
    static async create(name, description, price, stock) {
        try {
            // Insert into MySQL
            const [result] = await db.query(
                'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
                [name, description, price, stock]
            );

            // Index in Elasticsearch
            await client.index({
                index: 'products',
                id: result.insertId.toString(),
                document: {
                    name,
                    description,
                    price,
                    stock,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            });

            return result;
        } catch (error) {
            console.error('Error in create product:', error);
            throw error;
        }
    }

    static async findAll(currentPage = 0) {
        const pageSize = 1000;
        const offset = pageSize * currentPage;
        const [rows] = await db.query('SELECT * FROM products LIMIT ? OFFSET ?', [pageSize, offset]);
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, name, description, price, stock) {
        try {
            // Update MySQL
            const [result] = await db.query(
                'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
                [name, description, price, stock, id]
            );

            // Update Elasticsearch
            await client.update({
                index: 'products',
                id: id.toString(),
                doc: {
                    name,
                    description,
                    price,
                    stock,
                    updated_at: new Date()
                }
            });

            return result;
        } catch (error) {
            console.error('Error in update product:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            // Delete from MySQL
            const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

            // Delete from Elasticsearch
            await client.delete({
                index: 'products',
                id: id.toString()
            });

            return result;
        } catch (error) {
            console.error('Error in delete product:', error);
            throw error;
        }
    }

    static async search(query) {
        /* Query with MySQL */
        const searchQuery = `%${query}%`;
        const [rows] = await db.query(
            'SELECT * FROM products WHERE name LIKE ?',
            [searchQuery]
        );
        return rows;
    }

    static async syncToElasticsearch() {
        try {
            const allProducts = await this.findAll();
            
            for (const product of allProducts) {
                await client.index({
                    index: 'products',
                    id: product.id.toString(),
                    document: {
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        created_at: product.created_at,
                        updated_at: product.updated_at
                    }
                });
            }
            console.log('Products synchronized with Elasticsearch');
        } catch (error) {
            console.error('Error syncing to Elasticsearch:', error);
            throw error;
        }
    }
}

module.exports = ProductModel;