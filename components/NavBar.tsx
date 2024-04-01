'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { LoginModal, SignUpModal, SignUpSuccessModal, UserDropdown } from '.';
import { useRouter } from 'next/router';

interface Props {
  cookieUsername: string | undefined
}

function NavBar({cookieUsername} : Props) {
  const pathname = usePathname();
  const {signUpOpened, setSignUpOpened, signUpSuccessOpened, loginOpened, setLoginOpened, currentUser, username, setUsername} = useContext(AuthContext);
  const [userDropdownOpened, setUserDropdownOpened] = useState(false);
  
  useEffect(() => {
    setUserDropdownOpened(false);
  }, [pathname, currentUser])

  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    {signUpOpened ? <SignUpModal/> : signUpSuccessOpened ? <SignUpSuccessModal/> : loginOpened && <LoginModal/>}
    {userDropdownOpened && <UserDropdown onClickOutside={() => setUserDropdownOpened(false)}/>}
    <div className="navbar">
        <Link href="/" className="logo">ELDEN BUILDER</Link>
        <div className="navbar-buttons">
          <Link href="" className={"navbar-btn" + (pathname == "/builds" ? " selected-page" : "")}>View Builds</Link>
          <Link href="/build-creator" className={"navbar-btn" + (pathname == "/build-creator" ? " selected-page" : "")}>Build Creator</Link>
          {
            (cookieUsername && !username || username) ?
            <>
              <Link href="" className="navbar-btn"></Link>
              <div style={{borderLeft: "1px solid gray", height:"25px"}}></div>
              <Link href="" className="navbar-btn">
                <div className={userDropdownOpened ? "disabled-link" : ""} onClick={() => {setUserDropdownOpened(!userDropdownOpened)}}>
                  {username ? username : cookieUsername}
                  <div style={{width: "10px"}}/>
                  <i className={(!userDropdownOpened ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true"></i>
                </div>
              </Link>
            </> 
            :
            <>
              <Link href="" className="navbar-btn" onClick={() => setLoginOpened(true)}>Log In</Link>
              <div style={{borderLeft: "1px solid gray", height:"25px"}}></div>
              <Link href="" className="navbar-btn" onClick={() => setSignUpOpened(true)}>Sign Up</Link>
            </>
          }
        </div>
    </div>
    </>
  )
}

export default NavBar