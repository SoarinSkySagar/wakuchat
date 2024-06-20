const pinataSDK = require('@pinata/sdk');
const base64Img = require('base64-img');
const { Readable } = require('stream');

const pinata = new pinataSDK(process.env.NEXT_PUBLIC_PINATA_API_KEY, process.env.NEXT_PUBLIC_PINATA_API_SECRET);

function base64ToStream(base64) {
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }
    const buffer = base64Img.base64Sync(matches[0]); // Convert the whole base64 string
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

export async function generateImageUrl(base64Image) {
    try {
        const testAuth = await pinata.testAuthentication();
        console.log('Pinata Authentication:', testAuth);

        const imageStream = base64ToStream(base64Image);

        const options = {
            pinataMetadata: {
                name: 'uploaded-image', // You can give it a specific name
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
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw error;
    }
}
