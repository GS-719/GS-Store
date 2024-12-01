"use client"
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Page = () => {

  const [Data, setData] = useState<Array<{ name: string; email: string }> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/getallusers");
      const data = await response.data;
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {Data && (
        <ul>
          {Data.map((item, index) => (
            <li key={index}>{item.name} - {item.email}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Page
