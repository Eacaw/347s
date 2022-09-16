import { signOut } from "firebase/auth";
import { Router, useRouter } from "next/router";
import { auth } from "../lib/firebase";

// Sign out button
export default function SignOutButton() {
  const router = useRouter();

  return (
    <button
      className="btn-signout"
      onClick={() => {
        router.push("/");
        setTimeout(() => {
          signOut(auth);
        }, 250);
      }}
      href="/"
    >
      Sign out
    </button>
  );
}
