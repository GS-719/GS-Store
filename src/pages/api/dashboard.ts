import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const email  = req.body;
        const findUser = async () => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    }
                })
                return user;
            } catch (err) {
                console.log("Database error: ", err);
                res.status(500).json({ error: "Failed to sign up user" });
                return;
            }
        }
        const user = await findUser();
        res.status(200).json(user);
    }
}
