"use client";

import { useReadContract, useWriteContract } from "wagmi";
import { externalAbi } from "~~/contracts/externalAbi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type AirdropCardType = {
  id: number;
  index: number;
};

export const AirdropCard = ({ id, index }: AirdropCardType) => {
  const { data: contractInfoData } = useScaffoldReadContract({
    contractName: "AirdropoooorFactory",
    functionName: "getContractsInfo",
    args: [BigInt(index)],
  });

  const { data: tokenUriData } = useReadContract({
    address: contractInfoData?.[0],
    abi: externalAbi.Airdropoooor.abi,
    functionName: "tokenURI",
    args: [BigInt(id)],
  });

  const { data: tba } = useReadContract({
    abi: externalAbi.Maintainer.abi,
    functionName: "getTBA",
    address: contractInfoData?.[1],
    args: [BigInt(id)],
  });

  const { data: expiryData } = useReadContract({
    address: contractInfoData?.[0],
    abi: externalAbi.Airdropoooor.abi,
    functionName: "userExpires",
    args: [BigInt(id)],
  });

  const { writeContractAsync } = useWriteContract();

  const handleClick = async () => {
    await writeContractAsync({
      abi: externalAbi.Account.abi,
      address: tba!,
      functionName: "redeem",
    });
  };

  return (
    <div className="h-20 w-20 rounded-lg flex items-center justify-center" key={index}>
      {Number(id)}
      tokenUri: {tokenUriData}
      expiry: {Number(expiryData)}
      <button onClick={handleClick}>Claim</button>
    </div>
  );
};
