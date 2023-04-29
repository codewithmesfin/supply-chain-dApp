// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyChain is Ownable {
    enum Status {
        Ordered,
        Shipped,
        Delivered,
        Cancelled
    }

    struct Item {
        uint id;
        string name;
        Status status;
        address orderedBy;
        address approvedBy;
        address deliveredTo;
    }

    mapping(uint => Item) private items;
    uint private itemCount;

    function orderItem(string memory _name) public {
        Item memory newItem = Item({
            id: itemCount,
            name: _name,
            status: Status.Ordered,
            orderedBy: msg.sender,
            approvedBy: address(0),
            deliveredTo: address(0)
        });
        items[itemCount] = newItem;
        itemCount++;
    }

    function cancelItem(uint _id) public {
        require(
            items[_id].orderedBy == msg.sender,
            "Only the person who ordered the item can cancel it"
        );
        require(
            items[_id].status == Status.Ordered,
            "Item can only be cancelled if it is in the Ordered state"
        );
        items[_id].status = Status.Cancelled;
    }

    function approveItem(uint _id) public onlyOwner {
        require(
            items[_id].status == Status.Ordered,
            "Item must be in Ordered state to be approved"
        );
        items[_id].status = Status.Shipped;
        items[_id].approvedBy = msg.sender;
    }

    function shipItem(uint _id) public onlyOwner {
        require(
            items[_id].status == Status.Shipped,
            "Item must be in Shipped state to be shipped"
        );
        items[_id].status = Status.Delivered;
        items[_id].deliveredTo = items[_id].orderedBy;
    }

    function getItemStatus(uint _id) public view returns (Status) {
        return items[_id].status;
    }

    function getItem(uint _id) public view returns (Item memory) {
        return items[_id];
    }

    function getItemCount() public view returns (uint) {
        return itemCount;
    }
}
