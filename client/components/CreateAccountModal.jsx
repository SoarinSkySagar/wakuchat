import React, { useState } from 'react';
import {
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    Image,
    Box,
    Flex,
    Center,
    useToast
} from "@chakra-ui/react";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from 'axios';
import { useAccount } from '@/context/AccountContext';

const defaultProfilePicture = '/default-pfp.png';

export default function CreateAccountModal({ onClose }) {

    const { createAccount } = useAccount()
    const toast = useToast()

    const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [hash, setHash] = useState('QmSx39LwFsnbgEYm6zqVF7Cu7ERfXn7j78Zb9kZu4hVciM')

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePictureFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfilePicture(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('profilePictureInput').click();
    };

    const uploadToIpfs = async () => {
        try {
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
            const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
            const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_API_SECRET

            const formData = new FormData();
            formData.append('file', profilePictureFile);

            const response = await axios.post(url, formData, {
                maxContentLength: 'Infinity',
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey,
                }
            });

            const ipfsHash = response.data.IpfsHash;
            return ipfsHash

        } catch (error) {
            console.error('Error uploading file: ', error);
            toast({
                title: 'Error uploading file',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    }

    const submitData = async () => {
        if (profilePictureFile != null) {
            const id = await uploadToIpfs()
            setHash(id)
        }
        if (name === '' || bio === '') {
            toast({
                title: 'Please fill in all fields',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            return
        }
        const account = await createAccount(name, bio, hash)
        if (account) {
            toast({
                title: 'Account created successfully',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
            onClose()
        } else {
            toast({
                title: 'Error creating account',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
        
    }

    return (
        <ModalOverlay>
            <ModalContent style={{ justifyContent: 'center' }}>
                <ModalHeader style={{ textAlign: 'center', width: '100%' }}>
                    <div className='text-2xl'>Create Account</div>
                </ModalHeader>
                <ModalBody>
                    <Flex justifyContent="center" marginTop="4" className='mb-8'>
                        <Box
                            position="relative"
                            boxSize="100px"
                            borderRadius="full"
                            overflow="hidden"
                            border="2px"
                            borderColor="gray.300"
                            _hover={{ cursor: 'pointer', borderColor: 'blue.300' }}
                            onClick={triggerFileInput}
                        >
                            <Image src={profilePicture} alt="Profile Picture" boxSize="100%" objectFit="cover" />
                            <Center
                                position="absolute"
                                top="0"
                                left="0"
                                width="100%"
                                height="100%"
                                bg="rgba(0, 0, 0, 0.5)"
                                opacity="0"
                                _hover={{ opacity: 1 }}
                                color="white"
                                fontWeight="bold"
                            >
                                <span className='mx-10 text-4xl'><MdOutlineFileUpload /></span>
                            </Center>
                            <Input
                                id="profilePictureInput"
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                style={{ display: 'none' }}
                            />
                        </Box>
                    </Flex>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        marginTop="4"
                        padding="8px"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        _hover={{ borderColor: 'gray.400' }}
                        _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                        size="md"
                        backgroundColor="white"
                        className='mb-4'
                    />
                    <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Bio"
                        marginTop="4"
                        padding="8px"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        _hover={{ borderColor: 'gray.400' }}
                        _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                        size="md"
                        backgroundColor="white"
                        resize="none"
                        className='mb-3'
                    />
                </ModalBody>
                <ModalFooter style={{ justifyContent: 'center' }}>
                    <Button colorScheme='blue' onClick={submitData}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
}
