// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.20;

contract AccountStore {
    struct Account {
        address id;
        string name;
        string bio;
        string image;
    }

    mapping (address => Account) accounts;

    function createAccount(string memory _name, string memory _bio, string memory _image) public {
        accounts[msg.sender] = Account(msg.sender, _name, _bio, _image);
    }

    function accountExists(address _id) public view returns (bool) {
        return accounts[_id].id != address(0);
    }

    function getAccount(address _id) public view returns (Account memory) {
        return accounts[_id];
    }

    function updateAccount(string memory _name, string memory _bio, string memory _image) public {
        Account storage account = accounts[msg.sender];
        account.name = _name;
        account.bio = _bio;
        account.image = _image;
    }

    function deleteAccount() public {
        delete accounts[msg.sender];
    }

    function getMyAccount() public view returns (Account memory) {
        return accounts[msg.sender];
    }
}