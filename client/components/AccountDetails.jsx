"use client"

import { useAccount } from "@/context/AccountContext"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function AccountDetails() {

    const { connectedAccount, wakuAccount, getAccount } = useAccount()

    const [account, setAccount] = useState(null)
    const [pfp, setPfp] = useState('')
    

    useEffect(() => {
        async function getAccountDetails() {
            if (connectedAccount) {
                const res = await getAccount(connectedAccount)
                console.log(account)
            }
        }
        getAccountDetails();    
    }, [connectedAccount])

    useEffect(() => {
        if (wakuAccount) {
            setAccount(wakuAccount)
            setPfp(`https://gateway.pinata.cloud/ipfs/${wakuAccount.image}`)
        }
    }, [wakuAccount])

  return (
    <div>
        {account
            ? 
                <div>
                    <Image src={pfp} width={100} height={100} alt={`${account.name}`} />
                    <br/>
                    {account.id}
                    <br/>
                    {account.name}
                    <br/>
                    {account.bio}
                </div>
            : 
                <div>profile</div>
        }
    </div>
  )
}
