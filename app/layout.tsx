import { NavBar } from "@/components"
import './global.css'

export const metadata = {
  title: 'Elden Builder',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <body>
        <NavBar />  
        {children}
      </body>
    </html>
  )
}
