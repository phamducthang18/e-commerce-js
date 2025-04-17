const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://localhost:9200'
});

// Initialize product index
async function initializeProductIndex() {
    try {
        const indexExists = await client.indices.exists({
            index: 'products'
        });

        if (!indexExists) {
            await client.indices.create({
                index: 'products',
                body: {
                    mappings: {
                        properties: {
                            name: { type: 'text' },
                            description: { type: 'text' },
                            price: { type: 'float' },
                            stock: { type: 'integer' },
                            created_at: { type: 'date' },
                            updated_at: { type: 'date' }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error initializing Elasticsearch:', error);
    }
}

module.exports = { client, initializeProductIndex };