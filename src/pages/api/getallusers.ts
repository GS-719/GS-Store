import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const data = await prisma.user.findMany();
            // const data = [
            //     {
            //         id: 1,
            //         username: "GS",
            //         email: "gurjotsingh.code@gmail.com"
            //     },
            //     {
            //         id: 2,
            //         username: "admin",
            //         email: "admin@gmail.com"
            //     }
            // ]
            res.status(200).json(data);
        } catch (err) {
            console.error("Database fetching data error: ", err);
            res.status(500).json({ error: "Failed to fetch data"})
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
