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
        {/*User has signed in and has a username*/}
        {username && (
          <>
            <li className="push-right">
              <Link href={"/"}>
                <SignOutButton />
              </Link>
            </li>
            <li>
              <button
                className="btn-transparent"
                onClick={() => window.scrollTo(0, 0)}
              >
                <BsArrowUp />
              </button>
            </li>
          </>
        )}
        {/*User has not signed OR and has no username*/}
        {!username && (
          <>
            <li className="push-right">
              <Link href="/enter">
                <button className="btn-blue">Sign up/Login</button>
              </Link>
            </li>
            <li>
              <button
                className="btn-transparent"
                onClick={() => window.scrollTo(0, 0)}
              >
                <BsArrowUp />
              </button>
            </li>
          </>
        )}

        <li></li>
      </ul>
    </nav>
  );
}
