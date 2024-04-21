// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC721Receiver } from "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";

interface IMaintainer is IERC721Receiver {
	function fundAirdropInTBAs() external;

	function withdrawFromTBAs() external;

	function depositTotalAirdropAmount() external;

	function setIsClaimed(uint256 _tokenId) external;

	function getAirdropTokenAddress() external view returns (uint256);

	function getTotalAirdropAmount() external view returns (uint256);

	function getAirdropAmount(uint256 _tokenId) external view returns (uint256);

	function getTBA(uint256 _tokenId) external view returns (address);

	function contractTokenBalance() external view returns (uint256);

	function tbaTokenBalance(uint256 _tokenId) external view returns (uint256);

	function isClaimed(uint256 _tokenId) external view returns (bool);
}
