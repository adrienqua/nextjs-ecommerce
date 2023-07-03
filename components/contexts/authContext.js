"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState("red")

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
