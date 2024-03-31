import { NavBarWrapper } from "@/components"
import './global.css'

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
        <NavBarWrapper />  
        {children}
      </body>
      
    </html>
  )
}
