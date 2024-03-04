import React from 'react'
import Link from "next/link"

function NavBar() {
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className="navbar">
        <Link href="/" className="logo">ELDEN BUILDER</Link>

        <Link href="" className="navbar-btn">VIEW BUILDS</Link>
        <Link href="/build-creator" scroll={true} className="navbar-btn">BUILD CREATOR</Link>
        <Link href="" className="navbar-btn">ABOUT</Link>
        <Link href="" className="navbar-login">
            <i className="fa fa-user-circle" aria-hidden="true" style={{fontSize: "25px", paddingRight: "20px"}}></i>
            LOGIN
        </Link>

        <div></div>
    </div>
    <br/>
    </>
  )
}

export default NavBar