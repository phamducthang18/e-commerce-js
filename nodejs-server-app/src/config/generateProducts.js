const db = require('./database'); // Use MySQL connection pool
const { faker } = require('@faker-js/faker');

const BATCH_SIZE = 10000; // Number of records to insert per batch
const TOTAL_RECORDS = 10000000; // Adjusted for testing purposes

async function generateProducts() {
    console.log('Starting product generation...');

    let totalInserted = 0;

    for (let i = 0; i < TOTAL_RECORDS / BATCH_SIZE; i++) {
        const products = [];

        for (let j = 0; j < BATCH_SIZE; j++) {
            products.push([
                faker.commerce.productName(),
                faker.commerce.productDescription(),
                parseFloat(faker.commerce.price(1, 1000, 2)),
                faker.number.int({ min: 0, max: 1000 }),
                faker.date.past().toISOString().slice(0, 19).replace('T', ' '),
                faker.date.recent().toISOString().slice(0, 19).replace('T', ' '),
            ]);
        }

        try {
            const query = `
                INSERT INTO products (name, description, price, stock, created_at, updated_at)
                VALUES ?
            `;
            await db.query(query, [products]);
            totalInserted += products.length;
            console.log(`Inserted ${totalInserted} records so far...`);
        } catch (err) {
            console.error('Error inserting batch:', err);
        }
    }

    console.log(`Finished generating ${TOTAL_RECORDS} products!`);
}

generateProducts().catch((err) => {
    console.error('Error generating products:', err);
});