const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("x3", function () {
  let contract, signers;
  const createLink = async (ipfs_hash) => {
    let tx = await contract.createLink(ipfs_hash);
    await tx.wait();
    return await contract.getLink(0);
  };
  beforeEach(async function () {
    signers = await ethers.getSigners();
    const x3Factory = await ethers.getContractFactory("X3Link", signers[0]);
    contract = await x3Factory.deploy(await signers[0].getAddress(), [await signers[0].getAddress()]);
    await contract.deployed();
  });

  it("Create a link", async function () {
    let ipfs_hash = ethers.utils.id("test");
    let link = await createLink(ipfs_hash);
    expect(link[1]).to.equal(ipfs_hash);
    expect(link[0]).to.equal(await signers[0].getAddress());
  });

  it("Change a link", async function () {
    let ipfs_hash = ethers.utils.id("test_new");
    createLink(ethers.utils.id("test"));
    tx = await contract.changeIpfsHash(0, ipfs_hash);
    await tx.wait();
    const link = await contract.getLink(0);
    expect(link[1]).to.equal(ipfs_hash);
    expect(link[0]).to.equal(await signers[0].getAddress());
  });
});
