const { ethers, logger } = require("ethers")
const contractAbi = require("./build/LimeToken.json")

const run = async function () {
    const deployerAddress = "0xd9995bae12fee327256ffec1e3184d492bd94c31";
    const contractAddress = "0x291ffCA34a413205EaE535888c9D45D856D822FF";
    const transferAddress = "0x465b2b6CC578268BA33f24A7e151D144b0E44D29";

    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    const wallet = new ethers.Wallet("0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8", provider)
    const contract = new ethers.Contract(contractAddress, contractAbi.abi, wallet)

    const currencySymbol = await contract.symbol();
    let currentBalance;
    let currentRecieverBalance;

    // Get current balance
    currentBalance = await contract.balanceOf(deployerAddress);
    console.log('-----------------------');
    console.log("Deployer balance: ", ethers.utils.formatEther(currentBalance), currencySymbol);
    console.log('-----------------------');

    // Mint some tokens
    const tokensToMint = "2";
    const parsedTokensToMint = ethers.utils.parseEther(tokensToMint);
    await contract.mint(deployerAddress, parsedTokensToMint);
    console.log('-----------------------');
    console.log(`${tokensToMint} ${currencySymbol} tokens minted`);
    console.log('-----------------------');

    // Get current balance
    currentBalance = await contract.balanceOf(deployerAddress);
    console.log('-----------------------');
    console.log("Deployer balance: ", ethers.utils.formatEther(currentBalance), currencySymbol);
    console.log('-----------------------');

    // Transfer tokens
    const tokensToTransfer = "1.43";
    const parsedTokensToTransfer = ethers.utils.parseEther(tokensToTransfer);
    await contract.transfer(transferAddress, parsedTokensToTransfer);
    console.log('-----------------------');
    console.log(`${tokensToTransfer} ${currencySymbol} transfrered`);
    console.log('-----------------------');

    // Get current balance
    currentBalance = await contract.balanceOf(deployerAddress);
    console.log('-----------------------');
    console.log("Deployer balance: ", ethers.utils.formatEther(currentBalance), currencySymbol);
    console.log('-----------------------');

    // Get reciever balance
    currentRecieverBalance = await contract.balanceOf(transferAddress);
    console.log('-----------------------');
    console.log("Reciever balance: ", ethers.utils.formatEther(currentRecieverBalance), currencySymbol);
    console.log('-----------------------');

    // Burn deployer remaining tokens
    await contract.burn(currentBalance);
    console.log('-----------------------');
    console.log("Burned amount: ", ethers.utils.formatEther(currentRecieverBalance), currencySymbol);
    console.log('-----------------------');

    // Get reciever balance
    currentBalance = await contract.balanceOf(deployerAddress);
    console.log('-----------------------');
    console.log("Deployer balance: ", ethers.utils.formatEther(currentBalance), currencySymbol);
    console.log('-----------------------');
}

run();
