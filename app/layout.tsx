'use client'

import './global.css'
import { NavBar } from "@/components"
import { BuildCreatorContextProvider } from "@/context/BuildCreatorContext"
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
          <BuildCreatorContextProvider>
            <NavBar />  
            {children}
          </BuildCreatorContextProvider>
        </AuthContextProvider>
      </body>
      
    </html>
  )
}
