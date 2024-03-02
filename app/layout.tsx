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
      <body>
        <NavBar />  
        {children}
      </body>
    </html>
  )
}
