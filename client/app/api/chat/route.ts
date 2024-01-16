import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

async function fetchData({ query }: { query: string }): Promise<AxiosResponse> {
    console.log(query);
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'
    const response: AxiosResponse = await axios.get(apiUrl);
    return response;
}
export const POST = async (req: Request, res: Response) => {
    const { query } = await req.json();
    try {
        console.log(query);
        const getResponse: AxiosResponse = await fetchData({ query });

        const title = getResponse.data;
        return NextResponse.json({ message: "OK", title }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Not ok", err }, { status: 500 });
    }
};