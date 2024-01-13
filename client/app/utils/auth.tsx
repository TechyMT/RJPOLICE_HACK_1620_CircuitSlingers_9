// authStore.ts
"use client";
import create from "zustand";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "./firebase";

interface State {
  user: any;
  isLogedIn: boolean;
  caseDetails: any;
}

interface Action {
  setUser: (user: any) => void;
  googleSignIn: () => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setCaseDetails: (caseDetails: any) => void;
}

const useAuthStore = create<State & Action>((set) => ({
  user: auth.currentUser, // Set initial user state based on current user
  isLogedIn: auth.currentUser !== null,
  caseDetails: null,
  setCaseDetails: (caseDetails) => set({ caseDetails }),
  setUser: (user) => set({ user, isLogedIn: user !== null }),
  googleSignIn: async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log("User Signed In!!!");
      console.log(res.user);

      // Continue with your other logic
      localStorage.setItem("user", JSON.stringify(res.user));
      set({ user: res.user, isLogedIn: true });
    } catch (error) {
      console.error((error as Error).message);
    }
  },
  emailSignIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User Signed In!!!");
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isLogedIn: true });
    } catch (signInError) {
      if ((signInError as any).code === "auth/user-not-found") {
        try {
          const newUserCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const newUser = newUserCredential.user;
          console.log("User Signed Up!!!");
          console.log(newUser);
          set({ user: newUser, isLogedIn: true });
        } catch (signUpError) {
          console.error((signUpError as Error).message);
        }
      } else {
        console.error((signInError as Error).message);
      }
    }
  },
  signOut: async () => {
    try {
      await signOut(auth);
      console.log("User Signed Out!!!");
      localStorage.removeItem("user");
      set({ user: null, isLogedIn: false });
    } catch (error) {
      console.error((error as Error).message);
    }
  },
}));

export default useAuthStore;
function importScripts(arg0: string) {
  throw new Error("Function not implemented.");
}
