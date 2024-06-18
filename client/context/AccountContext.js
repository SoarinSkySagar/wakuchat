"use client"

import { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import Account from "@/public/abi/Account.json"

const AccountContext = createContext()

export const useAccount = () => useContext(AccountContext)

export function AccountProvider({children}) {

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [connectedAccount, setConnectedAccount] = useState(null);

    useEffect(() => {
        async function initializeWeb3() {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum)
                setWeb3(web3Instance)

                const contractInstance = new web3Instance.eth.Contract(Account, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
                setContract(contractInstance)
            } else {
                alert("Please install MetaMask")
            }
        }

        initializeWeb3()
    }, [])

    async function connectMetamask() {
        if (window.ethereum && web3) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          try {
            await window.ethereum.request({
              "method": "wallet_switchEthereumChain",
              "params": [{
                  "chainId": "0xaa36a7",
              }]})
              const accounts = await web3.eth.getAccounts();
              setConnectedAccount(accounts[0]);
          } catch (e) {
            if (e.code === 4902) {
              alert("Please switch to Sepolia chain!")
            }
          }
        } else {
          alert('Please install MetaMask and try again');
        }
    }

    async function createAccount(name, bio, image) {
        try {
            if (contract && connectedAccount) {
                const account = await contract.methods.createAccount(name, bio, image).send({from: connectedAccount})
                return account
            } else {
                return null
            }
        } catch {
            return null
        }
    }

    async function accountExists() {
        try {
            if (contract && connectedAccount) {
                const account = await contract.methods.accountExists(connectedAccount).call()
                return account
            } else {
                return null
            }
        } catch {
            return null
        }
    }

    async function getAccount(id) {
        try {
            if (contract && connectedAccount) {
                const account = await contract.methods.getAccount(id).call()
                return account
            } else {
                return null
            }
        } catch {
            return null
        }
    }

    async function updateAccount(name, bio, image) {
        try {
            if (contract && connectedAccount) {
                const account = await contract.methods.updateAccount(name, bio, image).send({from: connectedAccount})
                return account
            } else {
                return null
            }
        } catch {
            return null
        }
    }

    async function deleteAccount() {
        try {
            if (contract && connectedAccount) {
                const account = await contract.methods.deleteAccount().send({from: connectedAccount})
                return account
            } else {
                return null
            }
        } catch {
            return null
        }
    }

    async function getMyAccount() {
        try {
            if (contract && connectedAccount) {
                const account = await contract.methods.getMyAccount().call()
                return account
            } else {
                return null
            }
        } catch {
            return null
        }
    }

    return (
        <AccountContext.Provider value={{web3, contract, connectedAccount, connectMetamask, createAccount, accountExists, getAccount, updateAccount, deleteAccount, getMyAccount}}>
            {children}
        </AccountContext.Provider>
    )
}