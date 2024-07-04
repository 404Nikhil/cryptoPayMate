'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import { ConnectButton, TransactionButton, useActiveAccount, useContractEvents, useReadContract } from "thirdweb/react";
import { contract } from "../utils/contract";

export const PayMate = () => {
    const account = useActiveAccount();
    const [buyAmount, setBuyAmount] = useState(0);
    const [message, setMessage] = useState("");
    
    const { 
        data: totalMessages, 
        refetch: refetchTotalMessages 
    } = useReadContract({
        contract: contract,
        method: "getMessage",
    });
    const { 
        data: contractEvents, 
        refetch: refetchContractEvents 
    } = useContractEvents({ 
        contract: contract,
    });
    
    const truncateWalletAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    const convertDate = (timestamp: bigint) => {
        const timestampNumber = Number(timestamp);
        return new Date(timestampNumber * 1000).toLocaleString();
    };
    
    if (account) {
        return (
            <div className="border border-solid p-8 rounded-md w-[500px]">
                <div className="items-center mb-4">
                    <ConnectButton // wallet component modal
                        client={client}
                        chain={chain}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Amount</label>
                    <p className="text-xs text-gray-600 mb-2">*Must be greater than 0.</p>
                    <input 
                        type="number" 
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(Number(e.target.value))}
                        step={0.01}
                        className="p-2 border-none mb-4"
                    />
                    <label className="text-lg mb-2">Message</label>
                    <input 
                        type="text" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter a message..."
                        className="p-2 border-none mb-4"
                    />
                    {message && buyAmount > 0 && (
                        <TransactionButton
                            transaction={() => (
                                prepareContractCall({
                                    contract: contract,
                                    method: "pay-mate",
                                    params: [message],
                                    value: BigInt(toWei(buyAmount.toString())),
                                })
                            )}
                            onTransactionConfirmed={() => {
                                alert("Thank you!")
                                setBuyAmount(0);
                                setMessage("");
                                refetchTotalMessages();
                                refetchContractEvents();
                            }}
                            className="bg-blue-600 text-white text-xs mb-8 p-2 rounded"
                        >
                            Donate
                        </TransactionButton>
                    )}
                </div>
                <div>
                    <h3 className="mb-4">Total Messages: {totalMessages?.toString()}</h3>
                    <p className="text-lg">Recent Messages:</p>
                    {contractEvents && contractEvents.length > 0 && (
                        [...contractEvents].reverse().map((event, index) => (
                            <div key={index} className="flex flex-col p-4 my-4 bg-gray-900 rounded-md">
                                <div className="flex justify-between mb-2">
                                    <p className="text-xs text-gray-600">
                                        {/* @ts-ignore */}
                                        {truncateWalletAddress(event.args.sender)}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {/* @ts-ignore */}
                                        {convertDate(event.args.timestamp)}
                                    </p>
                                </div>
                                <p className="text-gray-600">
                                    {/* @ts-ignore */}
                                    {event.args.message}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
};
