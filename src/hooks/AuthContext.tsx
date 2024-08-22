import { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext({})

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");  // Remover o item completamente
      setUser(null);  // Atualizar o estado do usuário para null
    } catch (error) {
      console.error("Erro ao fazer sign out:", error);
    }
  };

  const signIn = async (data: any) => {
    await AsyncStorage.setItem("user", JSON.stringify(data))
    setUser(data)
  }

  const signUp = async (data: any) => {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
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
      signIn,
      signUp,
      user,
      setUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)