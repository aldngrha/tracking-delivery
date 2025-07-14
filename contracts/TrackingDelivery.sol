// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title TrackingDelivery - Blockchain-based logistics tracker
/// @author Aldi
/// @notice This contract tracks deliveries using immutable records with status updates
/// @dev Designed for logistics partners like JNE, Sicepat, etc.

contract TrackingDelivery {
    enum Status { Pending, Dispatched, InTransit, Delivered }

    struct Delivery {
        string packageId;
        address sender;
        address recipient;
        uint256 dispatchTime;
        uint256 deliveryTime;
        Status status;
    }

    // Mapping from package ID to delivery record
    mapping(string => Delivery) private deliveries;

    // Ensure only the sender of a package can update its status
    modifier onlySender(string memory _packageId) {
        require(msg.sender == deliveries[_packageId].sender, "Not the sender");
        _;
    }

    /// @notice Emitted when a new delivery is created
    event DeliveryCreated(string packageId, address sender, address recipient, uint256 dispatchTime);

    /// @notice Emitted when the delivery status is updated
    event StatusUpdated(string packageId, Status status, uint256 timestamp);

    /// @notice Create a new delivery entry
    /// @param _packageId Unique package identifier
    /// @param _recipient Address of the recipient
    function createDelivery(string memory _packageId, address _recipient) public {
        require(deliveries[_packageId].dispatchTime == 0, "Delivery already exists");

        deliveries[_packageId] = Delivery({
            packageId: _packageId,
            sender: msg.sender,
            recipient: _recipient,
            dispatchTime: block.timestamp,
            deliveryTime: 0,
            status: Status.Dispatched
        });

        emit DeliveryCreated(_packageId, msg.sender, _recipient, block.timestamp);
    }

    /// @notice Update the status of a delivery
    /// @param _packageId The package ID
    /// @param _status New status (Dispatched, InTransit, Delivered)
    function updateDeliveryStatus(string memory _packageId, Status _status) public onlySender(_packageId) {
        Delivery storage d = deliveries[_packageId];

        require(d.dispatchTime != 0, "Delivery does not exist");
        require(uint8(_status) >= uint8(d.status), "Invalid status downgrade");

        d.status = _status;

        if (_status == Status.Delivered) {
            d.deliveryTime = block.timestamp;
        }

        emit StatusUpdated(_packageId, _status, block.timestamp);
    }

    /// @notice Get details of a delivery by package ID
    /// @param _packageId The package ID
    function getDeliveryById(string memory _packageId) public view returns (
        string memory,
        address,
        address,
        uint256,
        uint256,
        Status
    ) {
        Delivery memory d = deliveries[_packageId];
        require(d.dispatchTime != 0, "Delivery not found");

        return (
            d.packageId,
            d.sender,
            d.recipient,
            d.dispatchTime,
            d.deliveryTime,
            d.status
        );
    }
}
