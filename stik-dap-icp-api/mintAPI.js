const { Actor, HttpAgent } = require("@dfinity/agent");
const { idlFactory } = require("./stik.did.js");
const { getAccountFromWalletAddress, getSubaccountFromWalletAddress } = require("./utils.js");
const { AuthClient } = require('@dfinity/auth-client');

const agent = new HttpAgent({
    host: "https://ic0.app", // mainnet url | local dfx http://127.0.0.1:4943
});

const CanisterId = "icdu6-uaaaa-aaaai-qpfaa-cai";
const stik = Actor.createActor(idlFactory, { agent, canisterId: CanisterId });

/**
 * Fetches the balance of the specified wallet address from the canister.
 *
 * @param {string} walletAddress The address of the wallet to query for balance.
 * @returns {Promise<number>} A promise that resolves to the balance as a number,
 *                             or rejects with an error if the balance could not be fetched.
 */
const getBalanceForWalletAddress = async (walletAddress) => {
    try {
        if (!walletAddress) {
            return console.error(`getBalanceForWalletAddress error: walletAddress not found`)
        }

        const account = getAccountFromWalletAddress(walletAddress)

        try {
            return new Promise((resolve, reject) => {
                stik.icrc1_balance_of(account).then(opt_entry => {
                    if (opt_entry.length === 0) {
                        console.log("No balance found!")
                        resolve(0)
                    } else {
                        resolve(opt_entry)
                    }
                })
            })
        }
        catch (err) {
            let balanceError = `Failed to get balance: \n${err}`
            console.log(balanceError);
            reject(balanceError)
        }


    } catch (error) {
        console.error(`Error loading balance for wallet ${walletAddress}:`, error);
        // Handle the error appropriately, e.g., rethrow or return an empty array
        return [];
    }
}



/**
 * Mint tokens.
 * 
 * This function mints tokens to the given wallet
 * 
 * @param {string} toWalletAddress - The wallet address to which the NFT will be minted.
 * @param {number} tokenAmount - The amount of tokens to be minted.
 * @returns {Promise<Object>} - A promise that resolves to an object indicating the result of the minting process.
 *                              The object has the following properties:
 *                              - {boolean} minted: true if the minting was successful, false otherwise.
 *                              - {string} [error]: An error message if the minting failed.
 */
const mintTokens = async (toWalletAddress, tokenAmount) => {

    const account = getAccountFromWalletAddress(toWalletAddress)

    let payload = {
        to: account,
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [BigInt(Date.now())],
        amount: tokenAmount * Math.pow(10, 8),
    };

    try {
        const res = await stik.icrc1_mint(payload);
        console.log('Mint successful: ', res);
        return { minted: true, error: null }; // Explicitly set error to null for success
    } catch (error) {
        let errorMsg = `mintTokens - Mint failed: \n ${error}`;
        if (error.toString().includes("blob_of_principal: invalid principal")) {
            errorMsg = "Please provide a valid wallet address"
        }
        console.log(errorMsg);
        return { minted: false, error: errorMsg }; // Return an object with error property
    }
};


module.exports = { getBalanceForWalletAddress, mintTokens }; 