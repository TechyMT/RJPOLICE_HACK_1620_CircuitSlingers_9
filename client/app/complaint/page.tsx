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
    } else if(!loggedIn){
      // If no user is present, redirect to the signin page
      push("/signin");
    }

    window.addEventListener("beforeunload", alertUser);
    return () => window.removeEventListener("beforeunload", alertUser);
  }, [user, push]);

  if (user && loggedIn) {
    return <ComplaintForm />;
  }

  // The return statement is not needed here
  // else {
  //   push("/signin");
  // }
};

export default Complaint;
