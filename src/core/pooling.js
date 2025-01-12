const pendingTransactions = [];
const config = require('../../config/config.json');

function addTransaction(transaction){
    pendingTransactions.push(transaction)
}

function getPendingTransactionsByNetwork(networkName){
 const filtered = pendingTransactions.filter(transaction => transaction.network === networkName);
    if (filtered.length >= config.poolingThreshold){
         const transactionsForNetwork =  pendingTransactions.filter(transaction => transaction.network === networkName);
    pendingTransactions = pendingTransactions.filter(transaction => transaction.network !== networkName)
        return transactionsForNetwork;
    }

  return [];
}

module.exports = {
    addTransaction,
    getPendingTransactionsByNetwork,
};
