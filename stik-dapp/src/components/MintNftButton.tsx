// import {
//     Drawer,
//     DrawerContent,
//     DrawerTrigger,
// } from "@/components/ui/drawer"

import { UserContext } from "@/context/UserProvider"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { Button } from "./ui/button"
import axios from "axios"
import { LoaderCircle } from 'lucide-react';


const MintNftButton = ({ taps, setTaps, setRefreshBalance }: { taps: number, setTaps: Dispatch<SetStateAction<number>>, setRefreshBalance?: Dispatch<SetStateAction<boolean>> }) => {
    const { user } = useContext(UserContext)

    const [mintingNft, setMintingNft] = useState(false)

    console.log("MintNftButton ::");

    const mintNFT = () => {
        if (taps > 0 && user.principal_id) {
            console.log("user.principal_id :: " + user.principal_id);
            console.log("taps :: " + taps);
            setMintingNft(true)
            axios.post(`${import.meta.env.VITE_ICP_SERVER_URL}/mintTokens`, { toWalletAddress: user.principal_id, tokenamount: taps })
                .then(() => {
                    setMintingNft(false)

                    // @ts-ignore
                    Runtime.onload()

                    // @ts-ignore
                    Clicks.onload()

                    // @ts-ignore
                    document.getElementById('animation').innerHTML = Animations[Animations.currentAnimation].animation[0]

                    setTaps(0)

                    if (setRefreshBalance) {
                        setRefreshBalance(prev => !prev)
                    }
                })
                .catch(err => {
                    console.log("MintNftButton err:: " + err);
                    setMintingNft(false)
                    if (err.response.data.error) {
                        alert(err.response.data.error)
                        return
                    }
                    alert("Couldn't claim tokens at the moment!")
                })


        }
    }

    return (
        <Button
            onClick={mintNFT}
            disabled={taps <= 0 || mintingNft}
            className="my-4 gap-3"
        >
            Claim Token
            {mintingNft
                &&
                <LoaderCircle className="animate-spin" />
            }
        </Button>
    )
}

export default MintNftButton