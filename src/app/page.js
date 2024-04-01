'use client'
import React, { useState } from "react";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:8000/login", requestOptions);
      if (!response.ok) {
        throw new Error("Username or password are wrong");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body flex flex-col items-center">
            <h2 className="card-title">Login</h2>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <div className="card-actions justify-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Page;
