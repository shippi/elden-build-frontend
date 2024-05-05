import './global.css'
import { Footer, NavBar } from "@/components"
import { AuthContextProvider } from "@/context/AuthContext"

export const metadata = {
  title: "Elden Builder",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
            <NavBar/>  
            {children}
            {/*<Footer/>*/}
        </AuthContextProvider>
      </body>
    </html>
  )
}
