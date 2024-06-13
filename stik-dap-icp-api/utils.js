const { Principal } = require("@dfinity/principal");
const { principalToSubAccount } = require("@dfinity/utils");

const getAccountFromWalletAddress = (walletAddress) => {
    let myPrincipal = Principal.fromText(walletAddress);

    // Convert the principal to a subaccount
    let subaccountBytes = principalToSubAccount(myPrincipal);

    // Ensure subaccountBytes is an array, if it's not already
    if (!Array.isArray(subaccountBytes)) {
        subaccountBytes = Object.values(subaccountBytes);
    }

    return {
        owner: myPrincipal,
        subaccount: subaccountBytes.length > 0 ? [subaccountBytes] : []
    };
}

const getSubaccountFromWalletAddress = (walletAddress) => {
    let myPrincipal = Principal.fromText(walletAddress);

    // Convert the principal to a subaccount
    let subaccountBytes = principalToSubAccount(myPrincipal);

    // Ensure subaccountBytes is an array, if it's not already
    if (!Array.isArray(subaccountBytes)) {
        subaccountBytes = Object.values(subaccountBytes);
    }

    return subaccountBytes.length > 0 ? [subaccountBytes] : []
}





module.exports = { getAccountFromWalletAddress, getSubaccountFromWalletAddress }