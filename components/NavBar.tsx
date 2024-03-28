'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { AuthContext, AuthContextProvider } from '@/context/AuthContext';
import { useContext } from 'react';
import { LoginModal, SignUpModal, SignUpSuccessModal } from '.';

function NavBar() {
  const pathname = usePathname();
  const {signUpOpened, setSignUpOpened, signUpSuccessOpened, loginOpened, setLoginOpened} = useContext(AuthContext);
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    {signUpOpened ? <SignUpModal/> : signUpSuccessOpened ? <SignUpSuccessModal/> : loginOpened && <LoginModal/>}
    <div className="navbar">
        <Link href="/" className="logo">ELDEN BUILDER</Link>
        <div className="navbar-buttons">
          <Link href="" className={"navbar-btn" + (pathname == "/builds" ? " selected-page" : "")}>View Builds</Link>
          <Link href="/build-creator" className={"navbar-btn" + (pathname == "/build-creator" ? " selected-page" : "")}>Build Creator</Link>
          <Link href="" className="navbar-btn" onClick={() => setLoginOpened(true)}>Log In</Link>
          <div style={{borderLeft: "1px solid gray", height:"25px"}}></div>
          <Link href="" className={"navbar-btn"} onClick={() => setSignUpOpened(true)}>Sign Up</Link>
        </div>
    </div>
  
    </>
  )
}

export default NavBar