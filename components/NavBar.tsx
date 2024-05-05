'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { LoginModal, ResetPasswordModal, SignUpModal, SignUpSuccessModal, UserDropdown } from '.';
import { useWindowSizeChange } from '@/hooks';

function NavBar() {
  const pathname = usePathname();
  const {signUpOpened, setSignUpOpened, signUpSuccessOpened, loginOpened, setLoginOpened, resetOpened, setResetOpened, currentUser, username} = useContext(AuthContext);
  const [displayIcon, setDisplayIcon] = useState(false);
  const [userDropdownOpened, setUserDropdownOpened] = useState(false);
  
  useEffect(() => {
    if (window.innerWidth < 530) setDisplayIcon(true);
    else setDisplayIcon(false);
  }, []);

  // hook that closes the user dropdown if page or current user is changed
  useEffect(() => {
    setUserDropdownOpened(false);
  }, [pathname, currentUser])
  
  useWindowSizeChange(() => {
    if (window.innerWidth < 530) setDisplayIcon(true);
    else setDisplayIcon(false);
  })

  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
    {signUpOpened ? <SignUpModal/> : signUpSuccessOpened ? <SignUpSuccessModal/> : loginOpened && <LoginModal/>}
    {userDropdownOpened && <UserDropdown onClickOutside={() => setUserDropdownOpened(false)}/>}
    {resetOpened && <ResetPasswordModal/>}
    <div className="navbar">
        <Link href="/" className="logo"></Link>
        <div className="navbar-buttons">
          <Link href="/builds" className={"view-builds navbar-btn" + (pathname == "/builds" ? " selected-page" : "")}> 
            <i className="fa fa-search" />
          </Link>
          <Link href="/build-creator" className={"creator navbar-btn" + (pathname == "/build-creator" ? " selected-page" : "")}>
            <i className="fa fa-pencil-square-o"/>
          </Link>
          <Link href="https://ko-fi.com/shippi" target="_blank" className="donate navbar-btn">
            <img src="/icons/kofi.svg"/>
          </Link>
          {
            username ?
            <>        
              <div className="column-separator" style={{marginLeft: "16px"}}/>    
              <Link href="" className="navbar-btn">
                <div className={userDropdownOpened ? "disabled-link" : ""} onClick={() => {setUserDropdownOpened(!userDropdownOpened)}}>
                  {
                    displayIcon ?
                    <i className="bi bi-person" />
                    :
                    <>
                    {username}
                    <div style={{width: "8px"}}/>
                    <i className={(!userDropdownOpened ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true"></i>
                    </>
                  }
                  
                </div>
              </Link>
            </> 
            :
            <>
              <Link href="" className="login navbar-btn" onClick={() => setLoginOpened(true)}>Log In</Link>
              <div className="column-separator"/> 
              <Link href="" className="sign-up navbar-btn" onClick={() => setSignUpOpened(true)}>Sign Up</Link>
            </>
          }
        </div>
    </div>
    </>
  )
}

export default NavBar