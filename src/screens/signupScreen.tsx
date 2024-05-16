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
  const [ra, setRA] = useState("")

  function handleRegister() {
    if (!name.trim() || !email.trim()) {
      return Alert.alert("Inscrição", "Preencha todos os campos!")
    }

    navigation.navigate("Home")
  }

  return (
    <View className="flex-1  bg-green-800 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <View className="w-full mt-12 gap-3">
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
          <Ionicons name="school"
            color={colors.white}
            size={20}
          />
          <Input.Field
            placeholder="Registro acadêmico"
            onChangeText={setRA}
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


