"use client"

import { useAccount } from "@/context/AccountContext"
import { useState, useEffect } from "react"
import { Button, Modal, useDisclosure } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'
import CreateAccountModal from "./CreateAccountModal"

export default function ConnectButton() {
    
        const { connectMetamask, connectedAccount, accountExists } = useAccount()
        const { isOpen, onOpen, onClose } = useDisclosure()
        const toast = useToast()

        const [account, setAccount] = useState(null)

        useEffect(() => {
            async function getAccount() {
                if (connectedAccount) {
                    setAccount(connectedAccount);
                    const existence = await accountExists()
                    if (existence === false) {
                        onOpen()
                    } else if (existence === null) {
                        toast({
                            title: 'Failed to get account details.',
                            status: 'error',
                            duration: 10000,
                            isClosable: true,
                        })
                    }
                }
            }
            getAccount();
        }, [connectedAccount])

        const shortAddress = (string) => {
            return `${string.slice(0, 5)}.....${string.slice(-5)}`
        }
    
        return (
            <div>
                <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false}>
                    <CreateAccountModal onClose={onClose} />
                </Modal>
                {account 
                    ? 
                        <Button  colorScheme='blue' sx={{ opacity: 1, cursor: 'not-allowed'}}>
                            {shortAddress(account)}
                        </Button>
                    : 
                        <Button colorScheme='blue' onClick={connectMetamask}>
                            Connect Wallet
                        </Button>
                }
            </div>
        )
    }