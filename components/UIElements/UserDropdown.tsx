'use client'
import { useClickOutside } from "@/hooks";
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import Link from "next/link";
import { useRef } from "react";

interface Props {
  onClickOutside: Function
}

function UserDropdown({ onClickOutside }: Props) {
  const dropdownRef = useRef(null); // creates a reference to the user dropdown div
  useClickOutside(dropdownRef, onClickOutside);

  // handler for when user clicks sign out on the user dropdown
  const signOutOnClick = () => {
    // takes user to the landing page and signs them out
    window.location.href = "/";
    signOut(auth);
  }

  return (
    <div className="user-dropdown-container ">
      <div className = "dropdown-container">
      <div className="dropdown" ref={dropdownRef}>
            <ul>
                <Link href={'/i/likes'}><li>View Likes</li></Link>
                <Link href={'/i/bookmarks'}><li>View Bookmarks</li></Link>
                <div className="separator"/>
                <li onClick={() => signOutOnClick()}>Sign Out</li>
            </ul>
        </div>
      </div>

    </div>
  )
}

export default UserDropdown
