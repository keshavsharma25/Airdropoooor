"use client";

import React from "react";
import { useAccount } from "wagmi";
import { AirdropCard } from "~~/components/AirdropCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

function Page() {
  const { address } = useAccount();
  const { data: airdropsData } = useScaffoldReadContract({
    contractName: "AirdropoooorFactory",
    functionName: "getRentedTokensForUser",
    args: [address],
  });
  return (
    <div className="flex gap-2 flex-wrap">
      {airdropsData?.map((airdrop, index) => {
        if (Number(airdrop) === -1) {
          return;
        }
        return <AirdropCard key={index} index={index} id={Number(airdrop)} />;
      })}
    </div>
  );
}

export default Page;
