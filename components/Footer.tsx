import Link from "next/link"

function Footer() {
    return (
        <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <div className="footer">
            <div className="footer-content">
                <div className="contact">
                    <h3>Want to Report a Bug or Provide Feedback?</h3>
                    <br/>
                    <h4>Get in Touch:</h4>
                    <div className="contacts-container">
                        <div>
                            <i className="bi bi-discord"/>
                            .shippi
                        </div>
                        <Link href="https://github.com/shippi" target="_blank">
                            <i className="bi bi-github"/>
                            /shippi
                        </Link>
                        <Link href="https://www.reddit.com/user/shippiii/" target="_blank">
                            <i className="bi bi-reddit"/>
                            u/shippiii
                        </Link>

                    </div>
                </div>
                <div style={{borderLeft: "1px solid gray", height:"20px"}}/>
                Changelogs and Todos
                <div style={{borderLeft: "1px solid gray", height:"20px"}}/>
                About
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