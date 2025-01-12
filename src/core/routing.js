const axios = require('axios');
const config = require('../../config/config.json');

async function fetchGasPrices() {
  const results = [];
    for (const network of config.networks) {
    try {
      const response = await axios.get(network.gasApi);
     const price =  parseInt(response.data.result.FastGasPrice)
      results.push({networkName: network.name, gasPrice: price});
        } catch(error){
            console.error(`Error Fetching data for ${network.name}: ${error.message}`);
            results.push({networkName: network.name, gasPrice: 10000});
        }
    }
  return results;
}

async function findCheapestNetwork(stablecoin, fromNetwork, toNetwork) {
  const gasPrices = await fetchGasPrices();
   const validNetworks = gasPrices.filter(network => network.gasPrice > 0 && (network.networkName === fromNetwork || network.networkName === toNetwork));

    if (!validNetworks || validNetworks.length === 0)
        return null;
  const cheapest = validNetworks.reduce((prev, current) => (prev.gasPrice < current.gasPrice) ? prev : current);
  return cheapest.networkName;
}

module.exports = {
  fetchGasPrices,
  findCheapestNetwork,
};
