import { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext({})

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const signOut = async () => {
    await AsyncStorage.setItem("user", null)
  }

  useEffect(() => {
    const handle = async () => {
      try {
        const data = await AsyncStorage.getItem("user")
        setUser(JSON.parse(data))
        setLoading(false)
      } catch(error) {
        setUser(null)
        setLoading(false)
      }
    }

    handle()
  }, [])

  return (
    <AuthContext.Provider value={{
      signOut,
      user,
      setUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)