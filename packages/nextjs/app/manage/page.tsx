"use client";

import React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

function Page() {
  const { address } = useAccount();
  const { data: adFactoryData } = useScaffoldReadContract({
    contractName: "AirdropoooorFactory",
    functionName: "getIdsByOwner",
    args: [address],
  });
  console.log(adFactoryData);
  return (
    <div className="flex gap-3">
      {adFactoryData?.map((ad, index) => (
        <Link href={`/manage/${ad}`} key={index}>
          <div className="h-20 w-20 rounded-lg">{ad.toString()}</div>
        </Link>
      ))}
    </div>
  );
}

export default Page;
