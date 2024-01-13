"use client";
import React, { useEffect, useState } from "react";
import ComplaintForm from "../components/ComplaintForm";
import useAuthStore from "../utils/auth";
import { useRouter } from "next/navigation";
import usePush from "../components/usePush";

const Complaint = () => {
  const router = useRouter();
  const push = usePush();
  const loggedIn = useAuthStore((state) => state.isLogedIn);
  const user = useAuthStore((state) => state.user);
  console.log("user", user);
  console.log("loggedIn", loggedIn);


  const alertUser = (e: any) => {
    e.preventDefault();
    e.returnValue = "Hello";
  };

  useEffect(() => {
    
    const addUser = () => {
      fetch("http://192.168.181.81:8080/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userUID: user.uid,
          email: user.email,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("add", res);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    };

    if (user) {
      addUser();
    }

    window.addEventListener("beforeunload", alertUser);
    return () => window.removeEventListener("beforeunload", alertUser);
  }, []);
  if (!loggedIn) {
    router.push("/");
    return null;
  }
  return <ComplaintForm />;
};

export default Complaint;
