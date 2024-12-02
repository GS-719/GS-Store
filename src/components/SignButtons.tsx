"use client"
import { useState, useEffect } from "react"
import React from 'react'
import "@/styles/SignButton.css"
import Link from "next/link"
import axios from "axios"

const SignButtons = () => {
    const [isLogedin, setIsLogedin] = useState(false);
    const [email, setEmail] = useState("");
    useEffect(() => {
        const information = async () => {
            const response = await axios.get("/api/signin");
            const responseResult = response.data.message;
            const email = response.data.email;
            setEmail(email);
            if (responseResult === "0") {
                setIsLogedin(true);
            } else if (responseResult === "1") {
                setIsLogedin(false);
            }
        }
        information();
    }, []);
    return (
        <div>
            {isLogedin ? (
                <Link href="/page_s/account/dashboard">
                    <p>{email}</p>
                </Link>
            ) : (
                <>
                    <Link href="/page_s/signin">
                        <button className="SignButton" disabled={isLogedin}>Sign In</button>
                    </Link>
                    <button className="SignButton" disabled={isLogedin}>Sign Up</button>
                </>
            )}
        </div>
    )
}

export default SignButtons
