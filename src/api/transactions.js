const express = require('express');
const router = express.Router();
const routing = require('../core/routing');
const pooling = require('../core/pooling');
const web3Utils = require('../utils/web3')

router.post('/send', async (req, res) => {
  try {
    const transaction = req.body;
       const selectedNetwork = await routing.findCheapestNetwork(transaction.stablecoin, transaction.fromNetwork, transaction.toNetwork);
        if (!selectedNetwork)
            return res.status(400).json({message: "No Valid Network Found!"})

         transaction.network = selectedNetwork;

      pooling.addTransaction(transaction)
      res.status(200).json({message: 'Transaction added to queue', network : selectedNetwork });
  } catch (error) {
    res.status(500).json({ message: 'Error processing transaction', error : error.message });
  }
});


router.post('/process-transactions', async (req, res) => {
    try {
      const networkName = req.body.networkName
      const transactions = pooling.getPendingTransactionsByNetwork(networkName)
        if (!transactions || transactions.length === 0)
            return res.status(400).json({message: "No pending transactions found for that network"})
          const response = await web3Utils.sendTransactionBatch(transactions, networkName)
        res.status(200).json({message: `Transactions processed for ${networkName}`, transactions: response });
    } catch(error){
      res.status(500).json({ message: 'Error processing transactions', error : error.message });
    }
});


module.exports = router;
