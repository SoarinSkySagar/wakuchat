"use client"

import { useAccount } from "@/context/AccountContext";
import { useState, useEffect } from "react";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";

export default function Home() {

  const {connectedAccount} = useAccount()

  const [account, setAccount] = useState(null)

  useEffect(() => {
    async function getAccount() {
        if (connectedAccount) {
            setAccount(connectedAccount);
        }
    }
    getAccount();
}, [connectedAccount])

  return (
    <div>
      {account
        ? <HomePage/>
        : <LandingPage/>
      }
    </div>
  );
}
