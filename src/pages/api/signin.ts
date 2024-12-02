import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

let result = "";
let Email = "";
let Logout = "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const sourcePage = req.headers['x-requested-with'];
        console.log("Source Page: ", sourcePage);
        if (sourcePage === "dashboard") {
            const {logout} = req.body;
            Logout = logout;
            res.status(200).json({ message: "Request from dashboard to logout user"});
        } else if (sourcePage === "signin") {
            const { password, email } = req.body;
            Email = email;
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
                    result = "2";
                    // console.log("User not found");
                    res.status(200).json({ message: "2" });
                    return result;
                } else {
                    if (user.password === password) {
                        result = "0";
                        // console.log("Login successful")
                        res.status(200).json({ message: "0" });
                        return result;
                    } else {
                        result = "1";
                        // console.log("Login failed")
                        res.status(200).json({ message: "1" });
                        return result;
                    }
                }
            })
        }
    } else if (req.method === "GET") {
        const IsLogged = () => {
            if (result === "0") {
                console.log("Logout status: ", Logout);
                if (Logout === "1") {
                    res.status(200).json({ message: "1" });
                    Logout = "";
                    result = "1";
                } else {
                    res.status(200).json({ message: "0", email: Email });
                }
            } else {
                res.status(200).json({ message: "1" });
            }
        }
        IsLogged();
    } else {
        res.status(404).json({ message: "Method not Allowed" });
    }
}
