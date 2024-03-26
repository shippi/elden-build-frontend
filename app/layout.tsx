'use client'
import { NavBar } from "@/components"
import './global.css'
import { AuthContextProvider } from "@/context/AuthContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content="Elden Builder"/>
        <meta name="viewport" content="width=device-width, initial-scale=0.5" />
      </head>
      
      <body>
      <AuthContextProvider>
        <NavBar />  
        <div style={{height: "40px"}}></div>
        {children}
      </AuthContextProvider>
      </body>
      
    </html>
  )
}
