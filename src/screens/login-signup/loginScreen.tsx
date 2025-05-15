import { View, TouchableOpacity, StatusBar, Alert, Text, Image, Platform, ScrollView } from "react-native"
import { useState } from "react"

import { useNavigation } from "@react-navigation/native"
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";

import { StackTypes } from '../../routes/stack.routes';

import { Input } from "../../components/input";
import { Button } from "../../components/button";

import { colors } from "../../styles/colors"
import { useAuth } from "../../hooks/AuthContext";

import { login } from "../../services/users";

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default function Login() {
    const navigation = useNavigation<StackTypes>();
    const { signIn }: any = useAuth()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, preencha todos os campos!");
            } else {
                Alert.alert("Login", "Por favor, preencha todos os campos!");
            }

            return
        }

        if (!validateEmail(email)) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, digite um email válido!");
            } else {
                Alert.alert("Login", "Por favor, digite um email válido!");
            }

            return
        }

        if (senha.length < 6) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, digite uma senha com mais de 6 caracteres!");
            } else {
                Alert.alert("Login", "Por favor, digite uma senha com mais de 6 caracteres!");
            }

            return
        }

        setIsLoading(true)

        try {
            const data = await login({ email, senha })

            await signIn(data)

        } catch (error) {
            const err = error as any;

            const errorMessage = err.response?.data?.message || 'Falha ao processar o login.';

            // Imprime o erro no console para depuração

            //console.error('Erro ao processar o check-in:', err.response.data);

            if (Platform.OS === 'web') {
                window.alert(`${errorMessage}`);
            } else {
                Alert.alert("Login", errorMessage);
            }

        } finally {
            setIsLoading(false)
        }
    }



    return (
        <SafeAreaView className="flex-1 bg-blue-old">

            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }} scrollEnabled={false}>
                <StatusBar barStyle="light-content" />

                <View className="items-center">
                    <Image
                        source={require("../../assets/logo.png")}
                        className="h-24"
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
                            secureTextEntry={!senhaVisivel}
                        />

                        <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                            <Entypo
                                name={senhaVisivel ? 'eye-with-line' : 'eye'} // Alterna o ícone do olho
                                size={20}
                                color={'#fff'}
                            />
                        </TouchableOpacity>

                    </Input>

                    <Button className="mt-2" title="Entrar" onPress={handleLogin} isLoading={isLoading} />

                    {/* <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text className="text-white text-base font-bold text-center mt-4">
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity> */}

                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text className="text-white text-base font-bold text-center mt-4">
                            Ainda não possui inscrição?
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}