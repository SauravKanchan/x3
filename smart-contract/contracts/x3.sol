// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import {SchemaResolver} from "./lib/SchemaResolver.sol";

import {IEAS, Attestation} from "./lib/IEAS.sol";

contract X3Link is SchemaResolver {
    constructor(IEAS eas) SchemaResolver(eas) {}

    struct Link {
        address owner;
        string ipfs_hash;
    }
    mapping(uint => Link) private links;

    uint public linkCount;

    event LinkCreated(uint id, address indexed owner, string ipfs_hash);

    function createLink(string memory _ipfs_hash) public returns (uint256) {
        links[linkCount] = Link(msg.sender, _ipfs_hash);
        emit LinkCreated(linkCount, msg.sender, _ipfs_hash);
        linkCount++;
        return linkCount;
    }

    function getLink(uint _id) public view returns (address, string memory) {
        return (links[_id].owner, links[_id].ipfs_hash);
    }

    function changeIpfsHash(uint _id, string memory _ipfs_hash) public {
        require(
            msg.sender == links[_id].owner,
            "Only the owner can change the ipfs_hash"
        );
        links[_id].ipfs_hash = _ipfs_hash;
    }

    mapping(string => uint) public attesters;

    function voteAttester(address attester) external {}

    function onAttest(
        Attestation calldata attestation,
        uint256 /*value*/
    ) internal override returns (bool) {
        string memory username = abi.decode(attestation.data, (string));
        ++attesters[username];
        return true;
    }

    function verifiedUser(string memory username) public view returns (bool) {
        return attesters[username] >= 1;
    }

    function onRevoke(
        Attestation calldata /*attestation*/,
        uint256 /*value*/
    ) internal pure override returns (bool) {
        return true;
    }
}
