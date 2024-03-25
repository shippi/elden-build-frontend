'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link"

function NavBar() {
  const pathname = usePathname();

  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className="navbar">
        <Link href="/" className="logo">ELDEN BUILDER</Link>
        <div className="navbar-buttons">
          <Link href="" className={"navbar-btn" + (pathname == "/builds" ? " selected-page" : "")}>View Builds</Link>
          <Link href="/build-creator" className={"navbar-btn" + (pathname == "/build-creator" ? " selected-page" : "")}>Build Creator</Link>
          <Link href="" className="navbar-btn">Login</Link>
          <div style={{borderLeft: "1px solid gray", height:"25px"}}></div>
          <Link href="/signup" className={"navbar-btn"+ (pathname == "/signup" ? " selected-page" : "")}>Sign Up</Link>
        </div>
    </div>

    </>
  )
}

export default NavBar