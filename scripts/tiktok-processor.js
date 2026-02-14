const axios = require('axios');
require('dotenv').config();

async function getTikTokTranscript(videoUrl) {
    const apiKey = process.env.SUPADATA_API_KEY;
    const url = 'https://api.supadata.ai/v1/tiktok/transcript';

    try {
        const response = await axios.get(url, {
            params: { url: videoUrl },
            headers: { 'x-api-key': apiKey }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching transcript:', error.response ? error.response.data : error.message);
        return null;
    }
}

// Test with a sample URL if run directly
if (require.main === module) {
    const testUrl = process.argv[2] || 'https://www.tiktok.com/@gordonramsayofficial/video/7406093570516192526';
    getTikTokTranscript(testUrl).then(data => {
        console.log('--- TikTok Data Extracted ---');
        console.log(JSON.stringify(data, null, 2));
    });
}
