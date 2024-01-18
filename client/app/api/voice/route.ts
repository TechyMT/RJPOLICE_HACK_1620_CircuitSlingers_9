// pages/api/textToSpeech.js
import axios, { AxiosResponse } from "axios";
import fs from "fs";
import { NextResponse } from "next/server";
import { Readable } from "stream";

async function fetchData({ query }: { query: string }) {
    console.log("this is query", query);
    const apiUrl = 'https://api.play.ht/api/v2/tts/stream'
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
            "Authorization": "4af882a21a7746e69e5ae5ed54c738f1",
            "X-USER-ID": "L3uTa3KcXyNBjM3E9udJPSuAUzB3",
        },
        body: JSON.stringify({
            voice_engine: 'PlayHT2.0-turbo',
            text: query,
            voice: "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
            output_format: "mp3",
            sample_rate: "24000",
            speed: 1,
        })
    })
    console.log(response)
    return response;
}

// export default async function handler(req, res) {
//     try {
//         const url = "https://api.play.ht/api/v2/tts/stream";
//         const options = {
//             method: "POST",
//             headers: {
//                 accept: "audio/mpeg",
//                 "content-type": "application/json",
//                 AUTHORIZATION: "<YOUR_PLAY_HT_API_KEY>",
//                 "X-USER-ID": "<YOUR_PLAY_HT_USER_ID>",
//             },
//             body: JSON.stringify({
//                 voice_engine: 'PlayHT2.0-turbo',
//                 text: "Hey, this is Jennifer from Play. Please hold on a moment, let me just um pull up your details real quick.",
//                 voice: "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
//                 output_format: "mp3",
//                 sample_rate: "24000",
//                 speed: 1,
//             }),
//         };

//         const response = await fetch(url, options);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
//         }

//         const readableStream = response.body;

//         // Pipe the readable stream to the writable stream (response object)
//         readableStream.pipe(res, { end: true });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


export const POST = async (req: Request, res: Response) => {
    const { query } = await req.json();
    try {
        console.log(query);
        const getResponse = await fetchData({ query });
        console.log(getResponse);
        return getResponse;
        

    } catch (err) {
        console.log(err);

    }
};
