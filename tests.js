const axios = require('axios');

async function testSendTransaction(){
    const transactionData = {
     "fromAddress" : "YOUR_TEST_FROM_WALLET",
    "toAddress" : "YOUR_TEST_TO_WALLET",
    "stablecoin" : "USDT",
        "value" : 0.001,
        "fromNetwork" : "ETH_Sepolia",
        "toNetwork": "BSC_Testnet"
    }

      try {
          const response =  await axios.post('http://localhost:8080/api/transactions/send', transactionData)
          console.log("Send transaction: ", response.data)
      }catch(error){
          console.error("Error testing transaction", error)
      }
}


async function testProcessTransactions(networkName){
  try{
       const response = await axios.post('http://localhost:8080/api/transactions/process-transactions', {networkName: networkName})
          console.log(`Process transaction in ${networkName}`, response.data)
      } catch (error){
          console.error("Error process transactions: ", error)
      }
}


async function executeTests(){
      // make 10 test calls to the send transaction endpoint using the test data provided in the testSendTransaction() function
   for(var i=0; i < 10; i++){
        await testSendTransaction();
   }
//call the function that triggers the pooling and forwards the transactions to the network, for each of the networks defined in our `config.json` file.
  await  testProcessTransactions("ETH_Sepolia")
   await  testProcessTransactions("BSC_Testnet")
}
executeTests()
