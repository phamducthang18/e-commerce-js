const UserModel = require('./models/userModel');

async function testDatabase() {
    try {
        // Test creating a user
        const testUser = {
            username: 'testuser',
            password: 'testpass123',
            email: 'test@example.com'
        };

        const result = await UserModel.create(testUser);
        console.log('User created:', result);

        // Test retrieving users
        const users = await UserModel.getAll();
        console.log('All users:', users);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testDatabase();