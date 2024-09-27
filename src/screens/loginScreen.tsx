import { View, TouchableOpacity, StatusBar, Alert, Text, Image, Platform } from "react-native"
import { useState } from "react"

import { useNavigation } from "@react-navigation/native"
import Entypo from '@expo/vector-icons/Entypo';

import { StackTypes } from '../routes/stack.routes';

import { Input } from "../components/input";
import { Button } from "../components/button";

import { colors } from "../styles/colors"
import { useAuth } from "../hooks/AuthContext";

import {login} from "../services/users";

export default function Login() {
    const navigation = useNavigation<StackTypes>();
    const { signIn }: any = useAuth()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            if (Platform.OS === 'web') {
                window.alert("Inscrição: Preencha todos os campos!");
            } else {
                Alert.alert("Login", "Preencha todos os campos!");
            }
        }

        setIsLoading(true)

        try {
            const data = await login({email, senha})

            await signIn(data)

            console.log(data)

        } catch (error) {
            const err = error as any; 

            const errorMessage = err.response?.data?.message || 'Falha ao processar o login.';

            // Imprime o erro no console para depuração

            //console.error('Erro ao processar o check-in:', err.response.data);
         
            if (Platform.OS === 'web') {
                window.alert(`Login: ${errorMessage}`);
            } else {
                Alert.alert("Login", errorMessage);
            }

        } finally {
            setIsLoading(false)
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
                        secureTextEntry={true} 
                    />

                </Input>

                <Button title="LOGIN" onPress={handleLogin} isLoading={isLoading} />

                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text className="text-white text-base font-bold text-center mt-4">
                        Ainda não possui cadastro?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text className="text-white text-base font-bold text-center mt-4">
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>

            </View>

        </View>

    )
}

