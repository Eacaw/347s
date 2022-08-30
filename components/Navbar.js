import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import SignOutButton from "../components/SignOut";
import Image from "next/image";

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
                <Image src={user?.photoURL} height={60} width={60} />
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
