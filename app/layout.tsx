import { NavBar } from "@/components"
import './global.css'
import { Viewport } from "next"

export const metadata = {
  title: 'Elden Builder',
  description: '',
}

export const viewport: Viewport = {
  initialScale: 0.5,
  width: "device-width"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />  
        <div style={{height: "40px"}}></div>

        {children}
      </body>
    </html>
  )
}
