import { useAccount } from "@/context/AccountContext"
// import { useState, useEffect } from "react"
import ConnectButton from "./ConnectButton"

export default function Navbar() {

    // const { connectedAccount } = useAccount()

  return (
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <a href="#" className="text-white text-lg font-semibold">WakuChat</a>

            <div></div>

            <ConnectButton/>
        </div>
    </nav>
  )
}
