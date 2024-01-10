"use client";
import React, { useEffect, useState } from "react";
import ComplaintForm from "../components/ComplaintForm";
import useAuthStore from "../utils/auth";
import { useRouter } from "next/navigation";

const Complaint = () => {
  const router = useRouter();
  const loggedIn = useAuthStore((state) => state.isLogedIn);
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const addUser = () => {
      setLoading(true);
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
        })
    };

    if (user) {
      addUser();
    }
  }, [user]);

  if (loading) {
    // You can render a loading spinner or message here
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    // Redirect to the signin page if not logged in
    router.push("/signin");
    return null;
  }

  return <ComplaintForm />;
};

export default Complaint;
