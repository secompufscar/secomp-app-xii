import { useState } from "react"
import { View, Image, StatusBar, Alert, TouchableOpacity, Text, Platform, ScrollView } from "react-native"
import { FontAwesome5, Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons"

import { useNavigation } from "@react-navigation/native"
import { StackTypes } from '../routes/stack.routes';

import { colors } from "../styles/colors"

import { Input } from "../components/input"
import { Button } from "../components/button"
import { useAuth } from "../hooks/AuthContext";

import { SafeAreaView } from "react-native-safe-area-context";

import {signup} from "../services/users";

const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

function capitalizeFirstLetter(string: string) {
	const words = string.toLocaleLowerCase().split(" ");
	
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i][0] ? words[i][0].toUpperCase() + words[i].substr(1) : "";
	}
	
	return words.join(" ");
}

export default function SignUp() {

	const navigation = useNavigation<StackTypes>();
	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [senha, setSenha] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [senhaVisivel, setSenhaVisivel] = useState(false);
	
	const { signUp }: any = useAuth()

	const handleRegister = async () =>  {
        if (!email.trim() || !senha.trim() || !nome.trim()) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, preencha todos os campos!");
            } else {
                Alert.alert("Inscrição", "Por favor, preencha todos os campos!");
            }

            return
        }

        if (!validateEmail(email)) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, digite um email válido!");
            } else {
                Alert.alert("Inscrição", "Por favor, digite um email válido!");
            }

            return 
        }

        if (senha.length < 6) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, digite uma senha com mais de 6 caracteres!");
            } else {
                Alert.alert("Inscrição", "Por favor, digite uma senha com mais de 6 caracteres!");
            }

            return
        }

		//navigation.navigate("Home")

		setIsLoading(true)

		try {
			const data = await signup({ nome, email, senha })

			if (data === true) {
				if (Platform.OS === 'web') {
					alert("Um e-mail de confirmação foi enviado para seu e-mail!");
					navigation.navigate('Login'); 
				} else {
					Alert.alert(
						"Inscrição",
						"Um e-mail de confirmação foi enviado com sucesso!",
						[
							{ text: "OK", onPress: () => navigation.navigate('Login') } // Navega para a tela de login
						]
					);
				}
			}

		} catch (error) {
            const err = error as any; 

            const errorMessage = err.response?.data?.message || 'Falha ao processar o cadastramento.';

            if (Platform.OS === 'web') {
                window.alert(`${errorMessage}`);
            } else {
                Alert.alert("Inscreva-se", errorMessage);
            }
        } finally {
            setIsLoading(false)
        }
	}

	return (
        <SafeAreaView className="flex-1 bg-blue">

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
			


			<View className="w-full gap-2 text-center justify-center p-8">
				<Input>
					<FontAwesome5
						name="user-alt"
						color={colors.white}
						size={20}
					/>
					<Input.Field placeholder="Nome completo" value={nome} onChangeText={(text) => setNome(capitalizeFirstLetter(text))} />
				</Input>

				<Input>
					<Entypo name="email"
						color={colors.white}
						size={20}
					/>
					<Input.Field
						placeholder="E-mail"
						keyboardType="email-address"
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

				<Button className="mt-2" title="Inscreva-se" onPress={handleRegister} isLoading={isLoading} />

				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text className="text-white text-base font-bold text-center mt-4">
						Já possui cadastro?
					</Text>
				</TouchableOpacity>

			</View>
            </ScrollView>
        </SafeAreaView>
	)
}

