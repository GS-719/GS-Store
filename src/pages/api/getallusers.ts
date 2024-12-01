import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const Data = await prisma.user.findMany();
        const data = [
            {
                id: 1,
                username: "GS",
                email: "gurjotsingh.code@gmail.com"
            },
            {
                id: 2,
                username: "admin",
                email: "admin@gmail.com"
            }
        ]
        res.status(200).json(data);
    }
}

export default handler;
