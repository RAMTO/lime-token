const etherlime = require('etherlime-lib');
const LimeToken = require('../build/LimeToken.json');


const deploy = async (network, secret, etherscanApiKey) => {

    const deployer = new etherlime.EtherlimeGanacheDeployer();
    const result = await deployer.deploy(LimeToken);

};

module.exports = {
    deploy
};
