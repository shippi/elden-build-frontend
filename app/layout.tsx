import './global.css'
import { Footer, NavBar } from "@/components"
import { AuthContextProvider } from "@/context/AuthContext"

export const metadata = {
  title: "Elden Builder",
  description: "Plan, create, and share character builds for Elden Ring. A build calculator is featured that includes all the stats that you would see in-game, such as: base stats, attack power and spell scaling, defense, resistance, etc."
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
            <div style={{height: "24px"}}/>
            {children}
            <Footer/>
        </AuthContextProvider>
      </body>
    </html>
  )
}