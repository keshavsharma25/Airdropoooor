// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC4907A } from "erc721a/contracts/extensions/IERC4907A.sol";
import { IERC721ABurnable } from "erc721a/contracts/extensions/IERC721ABurnable.sol";

interface IAirdropoooor is IERC4907A, IERC721ABurnable {
	function getTenantTokenId(address _user) external view returns (int256);
}
