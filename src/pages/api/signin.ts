import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { password, email } = req.body;

        // Finding the Email from Database
        const finduser = async () => {
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

        // Matching the password
        const userPromise = finduser();
        userPromise.then(user => {
            if (!user) {
                // console.log("User not found");
                res.status(200).json({ message: "2" });
            } else {
                if (user.password === password) {
                    // console.log("Login successful")
                    res.status(200).json({ message: "0" });
                } else {
                    // console.log("Login failed")
                    res.status(200).json({ message: "1" });
                }
            }
        })

    }
}
