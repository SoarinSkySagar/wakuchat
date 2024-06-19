const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');


const pinata = pinataSDK(NEXT_PUBLIC_PINATA_API_KEY, NEXT_PUBLIC_PINATA_API_SECRET);

export async function generateImageUrl(localUrl) {
    try {
        const testAuth = await pinata.testAuthentication();
        console.log('Pinata Authentication:', testAuth);

        const imageStream = fs.createReadStream(localImagePath);

        const options = {
            pinataMetadata: {
                name: path.basename(localImagePath),
                keyvalues: {
                    uploadedBy: 'WakuChat'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        const result = await pinata.pinFileToIPFS(imageStream, options);
        console.log('Pinata Upload Result:', result);

        return result.IpfsHash;
    } catch {
        console.error('Error uploading to IPFS:', error);
        throw error;
    }
}