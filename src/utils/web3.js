const ethers = require('ethers');
const config = require('../../config/config.json');

async function sendTransactionBatch(transactions, networkName) {
    const selectedNetwork = config.networks.find(network => network.name === networkName);
     if (!selectedNetwork)
        throw new Error(`Network ${networkName} not found!`);

    const provider = new ethers.JsonRpcProvider(selectedNetwork.rpcURL);
    const privateKey = config.privateKeys[networkName];
     const wallet = new ethers.Wallet(privateKey, provider);
    const results = [];
      for (const transaction of transactions){
        try{
             const signer = wallet.connect(provider);
        const tx = await signer.sendTransaction({
             to: transaction.toAddress,
           value: ethers.parseUnits(transaction.value.toString()),
             });

            results.push({hash : tx.hash, status: "success"})
       }catch(error){
            results.push({status: "failed", error: error.message})
       }
    }
    return results;
}

module.exports = {
    sendTransactionBatch,
};
