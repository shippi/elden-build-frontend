'use client'
import { useState } from 'react'
import Link from "next/link"

function NavBar() {
  const [currPage, setCurrPage] = useState("");

  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className="navbar">
        <Link href="/" className="logo" onClick={() => setCurrPage("")}>ELDEN BUILDER</Link>
        <div className="navbar-buttons">
          <Link href="" className={"navbar-btn" + (currPage == "0" ? " selected-page" : "")} onClick={() => setCurrPage("0")}>View Builds</Link>
          <Link href="/build-creator" className={"navbar-btn" + (currPage == "1" ? " selected-page" : "")} onClick={() => setCurrPage("1")}>Build Creator</Link>
          <Link href="" className={"navbar-btn" + (currPage == "2" ? " selected-page" : "")} onClick={() => setCurrPage("2")}>About</Link>
          <Link href="" className="navbar-btn">Login</Link>
          <div style={{borderLeft: "1px solid gray", height:"25px"}}></div>
          <Link href="" className="navbar-btn">Sign Up</Link>
        </div>
    </div>
    <br/>
    <br/>
    </>
  )
}

export default NavBar