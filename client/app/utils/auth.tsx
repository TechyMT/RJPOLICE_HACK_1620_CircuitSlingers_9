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
}

interface Action {
  setUser: (user: any) => void;
  googleSignIn: () => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuthStore = create<State & Action>((set) => ({
  user: auth.currentUser, // Set initial user state based on current user
  isLogedIn: auth.currentUser !== null,
  setUser: (user) => set({ user, isLogedIn: user !== null }),
  googleSignIn: async () => {
  
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log("User Signed In!!!");
      console.log(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      set({ user: res.user, isLogedIn: true });
     
    } catch (error) {
      console.error((error as Error).message);
    }
  },
  emailSignIn: async (email, password) => {
    const router = useRouter();
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
      router.push("/dashboard");
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
          router.push("/dashboard");
        } catch (signUpError) {
          console.error((signUpError as Error).message);
        }
      } else {
        console.error((signInError as Error).message);
      }
    }
  },
  signOut: async () => {
    const router = useRouter();
    try {
      await signOut(auth);
      console.log("User Signed Out!!!");
      localStorage.removeItem("user");
      set({ user: null, isLogedIn: false });
      router.push("/");
    } catch (error) {
      console.error((error as Error).message);
    }
  },
}));

export default useAuthStore;
