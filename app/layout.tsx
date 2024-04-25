import './global.css'
import { NavBar } from "@/components"
import { AuthContextProvider } from "@/context/AuthContext"

export const metadata = {
  title: "Elden Builder",
  visualViewport: "width=device-width, initial-scale=0.5"
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
            <NavBar />  
            {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
