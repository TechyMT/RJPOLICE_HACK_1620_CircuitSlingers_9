// authStore.ts
"use client";
import create from "zustand";
import {
  devtools,
  persist,
  createJSONStorage,
  PersistOptions,
} from "zustand/middleware";

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
  setUser: (user: any) => void;
  googleSignIn: () => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setCaseDetails: (caseDetails: any) => void;
  persist: any;
}

const useAuthStore = create<any>(
  persist(
    (set) => ({
      user: auth.currentUser, // Set initial user state based on current user
      isLogedIn: auth.currentUser !== null,
      caseDetails: null,
      setCaseDetails: (caseDetails: any) => set({ caseDetails }),
      setUser: (user: null) => set({ user, isLogedIn: user !== null }),
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
      emailSignIn: async (email: string, password: string) => {
        try {
          console.log("email", email);
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          )
            .then((res) => {
              console.log(userCredential);
              set({ user: res.user, isLogedIn: true });
            })
            .catch((error) => {
              console.log("error", error);
            });
          // const user = userCredential.user;
          // console.log("User Signed In!!!");
          // console.log(user);
        } catch (signInError: any) {
          console.log("signInError", signInError);
          // if (signInError.code === "auth/user-not-found") {
          //   try {
          //     const newUserCredential = await createUserWithEmailAndPassword(
          //       auth,
          //       email,
          //       password
          //     );
          //     const newUser = newUserCredential.user;
          //     console.log("User Signed Up!!!");
          //     console.log(newUser);
          //     set({ user: newUser, isLogedIn: true });
          //   } catch (signUpError: any) {
          //     console.error(signUpError.message);
          //   }
          // } else {
          //   console.error(signInError.message);
          // }
        }
      },

      signOut: async () => {
        try {
          await signOut(auth);
          console.log("User Signed Out!!!");
          localStorage.removeItem("auth-storage");
          set({ user: null, isLogedIn: false, caseDetails: null });
        } catch (error) {
          console.error((error as Error).message);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
function importScripts(arg0: string) {
  throw new Error("Function not implemented.");
}
