import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

// Sign out button
export default function SignOutButton() {
  return (
    <button className="btn-signout" onClick={() => signOut(auth)}>
      Sign out
    </button>
  );
}
