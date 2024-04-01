'use client'
import { AuthContext } from "@/context/AuthContext";
import { useClickOutside } from "@/hooks";
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/router";
import { useContext, useRef } from "react";


interface Props {
  onClickOutside: Function
}

function UserDropdown({onClickOutside}: Props) {
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, onClickOutside);

  const signOutOnClick = () => {
    signOut(auth);
    try {
      useRouter().reload();
    } catch (error) {
      
    }
    
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
