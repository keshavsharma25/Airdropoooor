"use client";

import { useAccount } from "wagmi";
import { ManageTable } from "~~/components/ManageTable";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

function Page() {
  const { address } = useAccount();
  const { data: adFactoryIds } = useScaffoldReadContract({
    contractName: "AirdropoooorFactory",
    functionName: "getIdsByOwner",
    args: [address],
  });
  return <div className="flex gap-3">{adFactoryIds && <ManageTable adIds={adFactoryIds} />}</div>;
}

export default Page;
