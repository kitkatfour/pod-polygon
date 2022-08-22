require("dotenv").config();

const { PRIVATE_KEY } = process.env;

const WEB3 = require("web3");

const web3 = new WEB3("https://polygon-mumbai.g.alchemy.com/v2/_ZV9B-fKkiubG6raXy4I4yO8vrnn8pqg");

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/podpolygon.sol/ProofOfDonation.json");

const contractAddress = "0x3e8106c9b28a9ABC35a2Fae90909f82c3822049e";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(poolAddress) {
  const tx = {
    to: contractAddress,
    gas: 500000,
    data: nftContract.methods.safeMint(poolAddress).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const sendedTx = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );

  console.log(sendedTx);
}

// mintNFT("0x4f3Fc13df562c7C06e530b054834a282fc1961f7");

async function addPool(address, ipfsString) {
  const tx = {
    to: contractAddress,
    gas: 500000,
    data: nftContract.methods.addPool(address, ipfsString).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const sendedTx = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );

  console.log(sendedTx);
}

// addPool("0x4f3Fc13df562c7C06e530b054834a282fc1961f7", "bafybeib6idyxlkftrntqacqtr4nwd54srhdvjqxqnvjhwbh4duhjlruyie");
