import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";

describe("SupplyChain", function () {
  let supplyChain: Contract;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    [owner, addr1, addr2] = await ethers.getSigners();
    supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();
  });

  it("Should create an item and retrieve its status", async function () {
    await supplyChain.orderItem("Item 1");
    const status = await supplyChain.getItemStatus(0);
    expect(status).to.equal(0);
  });

  it("Should cancel an item if it is in Ordered state", async function () {
    await supplyChain.orderItem("Item 1");
    await supplyChain.cancelItem(0);
    const status = await supplyChain.getItemStatus(0);
    expect(status).to.equal(3);
  });

  it("Should not allow non-owners to approve an item", async function () {
    await supplyChain.orderItem("Item 1");
    await expect(supplyChain.connect(addr1).approveItem(0)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should approve an item if it is in Ordered state", async function () {
    await supplyChain.orderItem("Item 1");
    await supplyChain.approveItem(0);
    const item = await supplyChain.getItem(0);
    expect(item.status).to.equal(1);
    expect(item.approvedBy).to.equal(owner.address);
  });

  it("Should not allow non-owners to ship an item", async function () {
    await supplyChain.orderItem("Item 1");
    await supplyChain.approveItem(0);
    await expect(supplyChain.connect(addr1).shipItem(0)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should ship an item if it is in Shipped state", async function () {
    await supplyChain.orderItem("Item 1");
    await supplyChain.approveItem(0);
    await supplyChain.shipItem(0);
    const item = await supplyChain.getItem(0);
    expect(item.status).to.equal(2);
    expect(item.deliveredTo).to.equal(owner.address);
  });
});
