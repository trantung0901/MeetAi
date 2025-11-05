/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { 
      data: session
  } = authClient.useSession() ;


  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            window.alert("Success! Please check your email to verify your account.");
        },
        onError: (ctx) => {
            // display the error message
            window.alert("Error: " + ctx.error.message);
        },
    });
  };

  const onLogin = async () => {
    authClient.signIn.email({
        email, // user email address
        password, // user password -> min 8 characters by default
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            window.alert("Success! You are now signed in.");
        },
        onError: (ctx) => {
            // display the error message
            window.alert("Error: " + ctx.error.message);
        },
    });
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <h1>Welcome, {session.user.name || session.user.email}!</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={onSubmit}>Sign Up</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={onLogin}>Sign In</Button>
      </div>
    </div>

  );
}
