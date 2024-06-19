import {
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton 
} from "@chakra-ui/react";

export default function CreateAccountModal({onClose}) {
    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>Create Account</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <p>It seems you do not have an account yet. Please create an account to continue.</p>
                </ModalBody>
                <ModalFooter>
                    {/* <Button colorScheme='blue' onClick={onClose}>Close</Button> */}
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    )
}