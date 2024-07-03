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
        getAccountDetails()
    }, [connectedAccount])

    useEffect(() => {
        if (wakuAccount) {
            setAccount(wakuAccount)
            setPfp(`https://gateway.pinata.cloud/ipfs/${wakuAccount.image}`)
        }
    }, [wakuAccount])

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
            {account ? (
                <div className="w-full max-w-4xl space-y-8">
                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                            <Image
                                src={pfp}
                                layout="fill"
                                objectFit="cover"
                                alt={`${account.name}`}
                                className="rounded-full border-4 border-gray-700 shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                        {account.name}
                    </div>
                    <div className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400">
                        {account.id}
                    </div>
                    <div className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300">
                        {account.bio}
                    </div>
                </div>
            ) : (
                <div className="text-2xl">Loading profile...</div>
            )}
        </div>
    )
}
