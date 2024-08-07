import { useState } from "react"
import { View, Image, StatusBar, Alert, TouchableOpacity, Text } from "react-native"
import { FontAwesome5, Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons"

import { useNavigation } from "@react-navigation/native"
import { StackTypes } from '../routes/stack.routes';

import { colors } from "../styles/colors"

import { Input } from "../components/input"
import { Button } from "../components/button"

export default function SignUp() {

	const navigation = useNavigation<StackTypes>();
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [senha, setSenha] = useState("")

	function handleRegister() {
		if (!name.trim() || !email.trim()) {
			return Alert.alert("Inscrição", "Preencha todos os campos!")
		}

		navigation.navigate("Home")
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
			


			<View className="w-full gap-2 text-center justify-center p-8">
				<Input>
					<FontAwesome5
						name="user-alt"
						color={colors.white}
						size={20}
					/>
					<Input.Field placeholder="Nome completo" onChangeText={setName} />
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
					/>
				</Input>

				<Button title="Realizar inscrição" onPress={handleRegister} />

				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text className="text-white text-base font-bold text-center mt-4">
						Já possui cadastro?
					</Text>
				</TouchableOpacity>

			</View>


		</View>
	)
}


