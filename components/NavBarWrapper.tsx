'use server'
import { AuthContextProvider } from "@/context/AuthContext"
import { NavBar } from "."
import { cookies } from "next/headers";


function NavBarWrapper() {
  const username = cookies().get("username")?.value;
  return (
    <AuthContextProvider>
      <NavBar cookieUsername={username} />
    </AuthContextProvider>
  )
}

export default NavBarWrapper
