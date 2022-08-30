import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import SignOutButton from "../components/SignOut";
import { BsArrowUp } from "react-icons/bs";

export default function Footer() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="footer">
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
              <Link href={"/"}>
                <SignOutButton />
              </Link>
            </li>
            <li>
              <Link href="#page-top">
                <button className="btn-transparent">
                  <BsArrowUp />
                </button>
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
