// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const x3_factory = await hre.ethers.getContractFactory("X3Link");
  // const eas_address = "0x4200000000000000000000000000000000000021";
  // const x3 = await x3_factory.deploy(eas_address);
  // await x3.deployed();
  // console.log("X3 deployed to:", x3.address);


  const X3Bet_factory = await hre.ethers.getContractFactory("X3Bet");
  const testNetERC20Token = "0xEF8b46765ae805537053C59f826C3aD61924Db45";
  const OptimisticOrcacle = "0x1F4dC6D69E3b4dAC139E149E213a7e863a813466";
  const x3bet = await X3Bet_factory.deploy(testNetERC20Token, OptimisticOrcacle);
  await x3bet.deployed();
  console.log("X3Bet deployed to:", x3bet.address);
  return
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
