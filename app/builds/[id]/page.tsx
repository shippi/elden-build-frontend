'use client'

import { Loading, NotFound } from "@/components";
import { AuthContext } from "@/context/AuthContext"
import { useLoading } from "@/hooks";
import { useContext } from "react"

interface Props {
    params: {
      id: string
    }
}

function Build({params: {id}}: Props) {
    const { currentUser } = useContext(AuthContext);
}

export default Build