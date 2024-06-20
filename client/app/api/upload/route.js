import { generateImageUrl } from "@/utils/generateImageUrl";


export async function POST(req, res) {
    const { base64Image } = req.body;
    try {
        const ipfsHash = await generateImageUrl(base64Image);
        return Response.json({ipfsHash})
    } catch (error) {
        console.error('Error uploading image:', error);
        return Response.json({ error: 'Error uploading image' })
    }
}