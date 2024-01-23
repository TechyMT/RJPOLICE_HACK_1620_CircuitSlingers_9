import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

async function fetchData({ query }: { query: string }): Promise<AxiosResponse> {
    console.log("this is query", query);
    const apiUrl = 'http://2b6d-34-91-124-127.ngrok-free.app/hi/get'
    const response: AxiosResponse = await axios.post(apiUrl, {
        query: query,
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response;
}
export const POST = async (req: Request, res: Response) => {
    const { query } = await req.json();
    try {
        console.log(query);
        const getResponse: AxiosResponse = await fetchData({ query });

        const { Response: title } = getResponse.data;
        console.log(title);
        return NextResponse.json({ message: "OK", title }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Not ok", err }, { status: 500 });
    }
};