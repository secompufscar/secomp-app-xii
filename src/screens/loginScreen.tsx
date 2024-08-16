import { View, TouchableOpacity, StatusBar, Alert, Text, Image } from "react-native"
import { useState } from "react"

import { useNavigation } from "@react-navigation/native"
import Entypo from '@expo/vector-icons/Entypo';

import { getProfileById, setProfile } from "../services/users"

import { StackTypes } from '../routes/stack.routes';

import { Input } from "../components/input";
import { Button } from "../components/button";

import { colors } from "../styles/colors"
import { useAuth } from "../hooks/AuthContext";
import api from "../services/api";

export default function Login() {
    const navigation = useNavigation<StackTypes>();
    const { setUser }: any = useAuth()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            Alert.alert("Login", "Preencha todos os campos")

            return
        }

        try {
            const response = await api.post("/login", {
                
            })
        } catch(error) {
            Alert.alert("Login", "Não foi possível efetuar o login, tente novamente mais tarde!")
        }
    }

    return (

        <View className="flex-1 bg-blue items-center justify-center">
            
            <StatusBar barStyle="light-content" />
            
            <View className="items-center">
                <Image
                    source={require("../../assets/logo.png")}
                    className="h-20"
                    resizeMode="contain"
                />
            </View>

            <StatusBar barStyle="light-content" />

            <View className="w-full gap-2 text-center justify-center p-8">

                <Input>
                    <Entypo name="email"
                        color={colors.white}
                        size={20}
                    />

                    <Input.Field
                        placeholder="E-mail"
                        onChangeText={setEmail}
                    />
                </Input>

                <Input>
                    <Entypo name="lock"
                        color={colors.white}
                        size={20}
                    />

                    <Input.Field
                        placeholder="Senha"
                        onChangeText={setSenha}
                    />

                </Input>

                <Button title="REALIZAR LOGIN" onPress={handleLogin} />

                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text className="text-white text-base font-bold text-center mt-4">
                        Ainda não possui cadastro?
                    </Text>
                </TouchableOpacity>

            </View>

        </View>

    )
}

