const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const { RedisStore } = require('connect-redis'); 
const cors = require('cors');
const setUserRoutes = require('./routes/userRoutes');
const setFriendRoutes = require('./routes/friendRoutes');
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const setProductRoutes = require('./routes/productRoutes');

// Import redis client đã connect
const redisClient = require('./config/redis');  
const app = express();

// Cấu hình RedisStore
const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
});

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:8100',
    credentials: true,
}));

app.use(session({
    store: redisStore,
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
    },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Kết nối MongoDB (nếu cần bật)
// const mongoURI = 'mongodb://localhost:27017/New_db';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// Set routes
setUserRoutes(app);
setFriendRoutes(app);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', sessionRoutes);
setProductRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
