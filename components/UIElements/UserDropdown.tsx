'use client'
import { useClickOutside } from "@/hooks";
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation";
import { useRef } from "react";


interface Props {
  onClickOutside: Function
}

function UserDropdown({onClickOutside}: Props) {
  const router = useRouter();
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, onClickOutside);

  const signOutOnClick = () => {
    window.location.href = "/";
    signOut(auth);
  }

  return (
    <div className="user-dropdown-container">
        <div className="user-dropdown" ref={dropdownRef}>
            <ul>
                <li>View Likes</li>
                <li>View Bookmarks</li>
                <div className="separator"/>
                <li onClick={() => signOutOnClick()}>Sign Out</li>
            </ul>
        </div>
    </div>
  )
}

export default UserDropdown
