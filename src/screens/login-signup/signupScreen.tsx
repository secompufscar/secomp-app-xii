import { useState } from "react"
import { View, Alert, TouchableOpacity, Text, Platform } from "react-native"
import { FontAwesome5, Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { StackTypes } from '../../routes/stack.routes';
import { colors } from "../../styles/colors"
import { Input } from "../../components/input/input"
import Button from "../../components/button/button"
import { useAuth } from "../../hooks/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {signup} from "../../services/users";
import validator from 'validator';
import AppLayout from "../../components/appLayout";
import BackButton from "../../components/button/backButton";


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
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [senha, setSenha] = useState("")
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isLoading, setIsLoading] = useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	
	// const { signUp }: any = useAuth()
	
	const validateEmail = (email: string): boolean => {
        return validator.isEmail(email);
    };

	const handleRegister = async () =>  {
        if (!email.trim() || !senha.trim() || !nome.trim()) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, preencha todos os campos!");
            } else {
                Alert.alert("Inscrição", "Por favor, preencha todos os campos!");
            }

            return
        }

        // Verifica a validade do e-mail
        if (validateEmail(email)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
            return;
        }
        
        // Verifica a validade da senha
        if (senha.length < 6) {
            setIsPasswordValid(false);
            return;
        } else {
            setIsPasswordValid(true);
        }

		setIsLoading(true)

		try {
			const data = await signup({ nome, email, senha })

			if (data.emailEnviado) {
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
        <SafeAreaView className="flex-1 bg-blue-900 items-center">
			<AppLayout>
				<BackButton/>

				<View className={`mt-8`}>
                    <Text className="text-white text-[24px] font-poppinsSemiBold">
                        Criar conta
                    </Text>
                </View>

				<View className="flex-col w-full gap-2 py-6 text-center justify-center">
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
							secureTextEntry={!isPasswordVisible}
						/>

						<TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
							<Entypo
								name={isPasswordVisible ? 'eye-with-line' : 'eye'} // Alterna o ícone do olho
								size={20}
								color={'#fff'}
							/>
						</TouchableOpacity>
					</Input>

					<Button className="mt-2" title="Inscreva-se" onPress={handleRegister}/>

					<TouchableOpacity onPress={() => navigation.navigate("Login")}>
						<Text className="text-white text-base font-bold text-center mt-4">
							Já possui inscrição?
						</Text>
					</TouchableOpacity>

				</View>
            </AppLayout>
        </SafeAreaView>
	)
}

