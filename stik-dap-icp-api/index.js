const express = require('express');
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const { getBalanceForWalletAddress, mintTokens } = require('./mintAPI');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Apply CORS middleware globally, excluding /api/client routes
app.use((req, res, next) => {
    if (req.path.startsWith('/api/client')) {
        // Allow all origins for /api/client routes
        cors()(req, res, next)
    } else {
        // Use your corsOptions for other routes
        cors(corsOptions)(req, res, next);
    }
});


app.get("/", (req, res) => {
    return res.json({ status: 200, message: `server is live on port ${process.env.PORT}` })
})

app.get("/getBalance/:walletAddress", async (req, res) => {
    const { walletAddress } = req.params

    let tokenbalance = 0;
    try {
        tokenbalance = await getBalanceForWalletAddress(walletAddress)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err })
    }

    tokenbalance = parseInt(tokenbalance)
    console.log("balance = ", tokenbalance);
    return res.json({ status: 200, tokenbalance })
})


app.post("/mintTokens", async (req, res) => {
    const { toWalletAddress, tokenamount } = req.body

    console.log(req.body);

    if (!toWalletAddress) {
        return res.status(400).json({ error: "Required property 'toWalletAddress' not found in request body" })
    }
    if (!tokenamount) {
        return res.status(400).json({ error: "Required property 'tokenamount' not found in request body" })
    }

    const mintData = await mintTokens(toWalletAddress, tokenamount)

    if (!mintData.minted && mintData.error) {
        return res.status(500).json({ error: mintData.error })
    }

    return res.status(200).json({ mintStatus: 200, mintMessage: "Successful" })
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server is live on port::${PORT}`));

module.exports = app