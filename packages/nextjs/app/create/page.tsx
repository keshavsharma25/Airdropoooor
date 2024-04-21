"use client";

import React, { useReducer } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type ToAddressAmount = {
  toAddress: Address;
  amount: bigint;
};

type State = {
  name: string;
  symbol: string;
  tokenAddress: Address;
  deadline: bigint;
  ToAddresses: ToAddressAmount;
};

const initialState: State = {
  name: "",
  symbol: "",
  tokenAddress: "",
  deadline: 0n,
  ToAddresses: {
    toAddress: "",
    amount: 0n,
  },
};

type Action =
  | { type: "setName"; payload: string }
  | { type: "setSymbol"; payload: string }
  | { type: "setTokenAddress"; payload: Address }
  | { type: "setDeadline"; payload: bigint }
  | { type: "setToAddresses"; payload: ToAddressAmount }
  | { type: "reset" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setSymbol":
      return { ...state, symbol: action.payload };
    case "setTokenAddress":
      return { ...state, tokenAddress: action.payload };
    case "setDeadline":
      return { ...state, deadline: action.payload };
    case "setToAddresses":
      return { ...state, ToAddresses: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { address: userAddress } = useAccount();

  const { writeContractAsync: writeAirdropoooorFactoryAsync } = useScaffoldWriteContract("AirdropoooorFactory");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = [
      state.name,
      state.symbol,
      state.tokenAddress,
      userAddress,
      [state.ToAddresses],
      state.deadline,
    ] as const;

    try {
      await writeAirdropoooorFactoryAsync({
        functionName: "createAirdropoooor",
        args: [...values],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={state.name}
            onChange={e =>
              dispatch({
                type: "setName",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="symbol">Symbol</label>
          <input
            type="text"
            id="symbol"
            value={state.symbol}
            onChange={e =>
              dispatch({
                type: "setSymbol",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="tokenAddress">Token Address</label>
          <input
            type="text"
            id="tokenAddress"
            value={state.tokenAddress}
            onChange={e =>
              dispatch({
                type: "setTokenAddress",
                payload: e.target.value as Address,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="text"
            id="deadline"
            value={state.deadline.toString()}
            onChange={e =>
              dispatch({
                type: "setDeadline",
                payload: BigInt(e.target.value),
              })
            }
          />
        </div>
        <div>
          <input
            type="text"
            id="toAddress"
            value={state.ToAddresses.toAddress}
            onChange={e =>
              dispatch({
                type: "setToAddresses",
                payload: {
                  toAddress: e.target.value as Address,
                  amount: state.ToAddresses.amount,
                },
              })
            }
          />
          <input
            type="text"
            id="amount"
            value={state.ToAddresses.amount.toString()}
            onChange={e =>
              dispatch({
                type: "setToAddresses",
                payload: {
                  toAddress: state.ToAddresses.toAddress,
                  amount: BigInt(e.target.value),
                },
              })
            }
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Page;
