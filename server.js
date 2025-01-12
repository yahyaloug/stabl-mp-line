const express = require('express');
const app = express();
const transactionsApi = require('./src/api/transactions');

// Middlewares
app.use(express.json());

// Routes
app.use('/api/transactions', transactionsApi);

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
