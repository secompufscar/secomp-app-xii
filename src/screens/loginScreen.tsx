import { View, TouchableOpacity, StatusBar, Alert, Text, Image } from "react-native"
import { useState } from "react"

import { useNavigation } from "@react-navigation/native"
import { StackTypes } from '../routes/stack.routes';

import Entypo from '@expo/vector-icons/Entypo';

import { Input } from "../components/input";
import { Button } from "../components/button";

import { colors } from "../styles/colors"

export default function Login() {

    const navigation = useNavigation<StackTypes>();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function handleLogin() {
        if (!email.trim() || !senha.trim())
            return Alert.alert("Login", "Preencha todos os campos")

        navigation.navigate("Home");
    }

    return (

        <View className="flex-1 bg-green-700 items-center justify-center p-8">


            <StatusBar barStyle="light-content" />

            <View className="flex-1 w-full mt-12 gap-3 text-center justify-center">
                
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

