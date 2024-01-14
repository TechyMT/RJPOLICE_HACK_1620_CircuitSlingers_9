"use client";
import React, { useEffect, useState } from "react";
import ComplaintForm from "../components/ComplaintForm";
import useAuthStore from "../utils/auth";
import { useRouter } from "next/navigation";
import usePush from "../components/usePush";
import { publicUrl } from "../utils/publicURL";

const Complaint = () => {
  const router = useRouter();
  const push = usePush();
  const loggedIn = useAuthStore((state: { isLogedIn: any }) => state.isLogedIn);
  const user = useAuthStore((state: { user: any }) => state.user);

  useEffect(() => {
    console.log("user", user);
    console.log("loggedIn", loggedIn);
    if (!loggedIn) {
      push("/signin");
      return;
    }
    const addUser = async () => {
      const addUser = await fetch(`${publicUrl()}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userUID: user.uid,
          email: user.email,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified,
          creationTime: user.createdAt,
          lastSignInTime: user.lastLoginAt,
        }),
      });
      console.log("user added", addUser);
    };

    if (user) {
      addUser();
      console.log("addedUser");
    }
  }, [user, push]);

  return <ComplaintForm />;

  // The return statement is not needed here
  // else {
  //   push("/signin");
  // }
};

export default Complaint;
