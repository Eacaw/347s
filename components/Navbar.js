import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import SignOutButton from "../components/SignOut";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">347s</button>
          </Link>
        </li>
        {/*User has signed in and has a username*/}
        {username && (
          <>
            <li className="push-left">
              <Link href={"/dashboard"}>
                <button className="btn-blue">Dashboard</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}
        {/*User has not signed OR and has no username*/}
        {!username && (
          <li className="push-left">
            <Link href="/enter">
              <button className="btn-blue">Login</button>
            </Link>
          </li>
        )}

        <li></li>
      </ul>
    </nav>
  );
}
