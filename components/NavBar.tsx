import React from 'react'


function NavBar() {
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

    <div className="navbar">
        <a className="logo">ELDEN BUILD</a>

        <a className="navbar-btn">VIEW BUILDS</a>
        <a className="navbar-btn">BUILD CREATOR</a>
        <a className="navbar-btn">ABOUT</a>
        <a className="navbar-login">
            <i className="fa fa-user-circle" aria-hidden="true" style={{fontSize: "25px", paddingRight: "20px"}}></i>
            LOGIN
        </a>

        <div></div>
    </div>
    </>
  )
}

export default NavBar