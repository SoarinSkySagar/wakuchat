import { NextResponse } from 'next/server';
import { promises as fsPromises } from 'fs';
import { resolve } from 'path';
import formidable from 'formidable';
import uploadImageToIPFS from '@/utils/generateImageUrl.js';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: false });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return reject(new Response(JSON.stringify({ error: 'Failed to parse form data' }), { status: 500 }));
            }

            const file = files.file;
            const localImagePath = file.filepath;

            try {
                const ipfsHash = await uploadImageToIPFS(localImagePath);
                resolve(new Response(JSON.stringify({ ipfsHash }), { status: 200 }));
            } catch (error) {
                resolve(new Response(JSON.stringify({ error: 'Failed to upload image to IPFS' }), { status: 500 }));
            }
        });
    });
}
