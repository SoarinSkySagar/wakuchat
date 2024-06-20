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
    Center
} from "@chakra-ui/react";
import { MdOutlineFileUpload } from "react-icons/md";

const defaultProfilePicture = '/default-pfp.png';

export default function CreateAccountModal({ onClose }) {
    const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                console.log(base64String);  // Log the base64 string
                setProfilePicture(base64String);  // Base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('profilePictureInput').click();
    };

    const submitData = async () => {
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ base64Image: profilePicture }),
            });
            const data = await response.json();
            console.log('IPFS Hash:', data.ipfsHash);
            // Handle success
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle error
        }
    }

    return (
        <ModalOverlay>
            <ModalContent style={{ justifyContent: 'center' }}>
                <ModalHeader style={{ textAlign: 'center', width: '100%' }}><div className='text-2xl'>Create Account</div></ModalHeader>
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
                                <span className='mx-10 text-4xl'><MdOutlineFileUpload />
                                </span>
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
