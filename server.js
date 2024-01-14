const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;
// port:"3002";

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneyTracker'
// { useNewUrlParser: true, useUnifiedTopology: true }
 );

// Create a mongoose schema and model
const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  type: String, // 'income' or 'expense'
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const transaction = new Transaction({ description, amount, type });
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
