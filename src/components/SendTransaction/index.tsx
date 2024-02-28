import * as React from 'react'
import { useSendTransaction, useReadContract } from 'wagmi' 
import { parseEther } from 'viem' 
import { readContracts } from '@wagmi/core'

export function SendTransaction() {
  const { data: hash, sendTransaction, isPending} = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement)
    const value = formData.get('value') as string 
    sendTransaction({ to: '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9', value: parseEther(value) }) 
  } 

  return (

    <form onSubmit={submit} className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Buy me a coffee!</h1>
      <input name="value" placeholder="0.05 ETH" required className="p-2 border border-gray-300 rounded" />
      <button type="submit" disabled={isPending} className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100">
        {isPending ? 'Confirming...' : 'Donate'}
      </button>
      {hash && <div className="text-gray-500">Transaction Hash: {hash}</div>}
    </form>
  )
}


const NFT_ABI = [
	{
		"inputs": [],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_trait",
				"type": "string"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
] as const;

const nftContractConfig = {
  address: process.env.NEXT_PUBLIC_NFT_ADDRESS as '0x$(string)',
  abi: NFT_ABI
} as const;

export function ReadContract() {
  const { data: balance } = useReadContract({
    ...nftContractConfig,
    functionName: 'balanceOf',
    args: ['0x936ef6ecBb158193ef38Bfb21907aeF8037494e4'],
  })

  return (
    <div>Balance: {''/*FIXME: balance?.toString()*/}</div>
  )
}
