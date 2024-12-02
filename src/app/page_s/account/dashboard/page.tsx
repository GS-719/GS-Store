"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [logout, setLogout] = useState('1');
    const [Data, setData] = useState(false);

    const router = useRouter();

    // Getting the email of signed user
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get("/api/signin");
            const userEmail = response.data.email;
            setEmail(userEmail);
            setData(true);
        }
        getUser();
    }, [])

    // Fetching all data of signed user
    const getData = async () => {
        const response = await axios.post("/api/dashboard", email, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.data;
        // console.log(data);
        setUserId(data.id);
        setUserEmail(data.email);
        setUserName(data.name);
    }
    if (Data === true) {
        getData();
        setData(false);
    }

    // logout Logic
    const Logout = async () => {
        await axios.post("/api/signin", logout, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'dashboard',
            }
        })
        console.log("The logout")
        // router.push('/page_s/signin');
        setLogout("0");
        setData(false)
    }

    return (
        <div>
            This is our dashboard page
            <br />
            <br />
            <p>User Data</p>
            <p>name - {userName}</p>
            <p>Id - {userId}</p>
            <p>Email - {userEmail}</p>
            <br/>
            <br/>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}

export default Page
