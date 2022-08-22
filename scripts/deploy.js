const { ethers } = require("hardhat");

const main = async () => {
  const ProofOfDonation = await ethers.getContractFactory("ProofOfDonation");

  const pod = await ProofOfDonation.deploy();

  await pod.deployed();

  console.log("contract deployed to address", pod.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
