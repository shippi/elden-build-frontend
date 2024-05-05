'use client'
import Link from "next/link"

function Footer() {
    return (
        <>
        <div className="footer">
            <div className="footer-content">
                <div className="contact">
                    <h3>Want to Report a Bug or Provide Feedback?</h3>
                    <br/>
                    <h4>Get in Touch:</h4>
                    <div className="contacts-container">
                        <Link href="https://www.reddit.com/user/shippiii/" target="_blank">
                            <i className="bi bi-reddit"/>
                            u/shippiii
                        </Link>
                    </div>
                    <div style={{height: "20px"}}/>
                    <small>
                        Currently supports Elden Ring v1.10
                    </small>
                </div>
                <div style={{borderLeft: "1px solid gray", height:"20px"}}/>
                <Link href={"/changelogs"}>Changelogs and Todos</Link>
                <div style={{borderLeft: "1px solid gray", height:"20px"}}/>
                Terms
                <div style={{borderLeft: "1px solid gray", height:"20px"}}/>
                Privacy
            </div>

        </div>
        </>
    )
}

export default Footer