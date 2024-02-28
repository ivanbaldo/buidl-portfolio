import React from 'react'

export function MintNFT () {
    const handleMintNFT = async () => {
        try {
            //const nftId = await wagmiMinNFT(); //FIXME: for later.
            const nftId = "FIXME: for later." //FIXME: for later.
            console.log(`NFT minted successfully, NFT id: ${nftId}`)
        } catch (error) {
            console.error('Error minting NFT:', error)
        }
    }

    return (
        <div>
            <button onClick={handleMintNFT}>Mint NFT</button>
        </div>
    )    
}