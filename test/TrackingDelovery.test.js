const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TrackingDelivery", function () {
    let contract;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();
        const TrackingDelivery = await ethers.getContractFactory("TrackingDelivery");
        contract = await TrackingDelivery.deploy();
    });

    it("Should create a new delivery", async () => {
        await contract.createDelivery("PKG001", addr1.address);

        const [pkgId, sender, recipient, dispatchTime, deliveryTime, status] =
            await contract.getDeliveryById("PKG001");

        expect(pkgId).to.equal("PKG001");
        expect(sender).to.equal(owner.address);
        expect(recipient).to.equal(addr1.address);
        expect(dispatchTime).to.be.gt(0);
        expect(deliveryTime).to.equal(0);
        expect(status).to.equal(1); // Dispatched
    });

    it("Should update delivery status to InTransit", async () => {
        await contract.createDelivery("PKG002", addr1.address);
        await contract.updateDeliveryStatus("PKG002", 2); // InTransit

        const [, , , , , status] = await contract.getDeliveryById("PKG002");
        expect(status).to.equal(2); // InTransit
    });

    it("Should update delivery status to Delivered and set deliveryTime", async () => {
        await contract.createDelivery("PKG003", addr1.address);
        await contract.updateDeliveryStatus("PKG003", 3); // Delivered

        const [, , , , deliveryTime, status] = await contract.getDeliveryById("PKG003");
        expect(status).to.equal(3); // Delivered
        expect(deliveryTime).to.be.gt(0);
    });

    it("Should NOT allow non-sender to update delivery status", async () => {
        await contract.createDelivery("PKG004", addr1.address);

        await expect(
            contract.connect(addr2).updateDeliveryStatus("PKG004", 2)
        ).to.be.revertedWith("Not the sender");
    });

    it("Should NOT allow status downgrade", async () => {
        await contract.createDelivery("PKG005", addr1.address);
        await contract.updateDeliveryStatus("PKG005", 2); // InTransit

        // Try downgrade to Dispatched
        await expect(
            contract.updateDeliveryStatus("PKG005", 1)
        ).to.be.revertedWith("Invalid status downgrade");
    });

    it("Should revert when querying non-existent delivery", async () => {
        await expect(contract.getDeliveryById("NON_EXISTENT")).to.be.revertedWith("Delivery not found");
    });

    it("Should revert when trying to create a delivery with duplicate packageId", async () => {
        await contract.createDelivery("PKG007", addr1.address);

        await expect(
            contract.createDelivery("PKG007", addr1.address)
        ).to.be.revertedWith("Delivery already exists");
    });
});
