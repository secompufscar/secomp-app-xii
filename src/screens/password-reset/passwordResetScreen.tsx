import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { sendForgotPasswordEmail } from "../../services/users";
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import BackButton from "../../components/button/backButton";
import Button  from "../../components/button/button";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation<AuthTypes>();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function replacePass() {
    if (validateEmail(email)) {
      navigation.navigate("VerifyEmail");
    } else {
      alert("É preciso informar um e-mail válido para redefinir a senha.");
      return;
    }
    try {
      await sendForgotPasswordEmail({ email }); // Assumindo que o body esperado é um objeto { email }
      navigation.navigate("VerifyEmail");
    } catch (error: any) {
      console.error("Erro ao enviar email de recuperação:", error);
      alert(
        error?.response?.data?.message ||
        "Ocorreu um erro ao tentar enviar o e-mail de redefinição. Insira outro e-mail ou tente novamente mais tarde."
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pb-12 w-full max-w-[1000px]">
        <BackButton/>

        <View className="mb-7">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-3">
            Recuperar senha
          </Text>

          <Text className="text-gray-400 text-sm">
            Por favor, insira seu e-mail para redefinir sua senha
          </Text>
        </View>

        <Input>
          <MaterialIcons name="email" size={20} color={colors.border} />

          <Input.Field
            placeholder="E-mail"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Input>

        <Button className="mt-4" title="Enviar" onPress={replacePass}/>

      </ScrollView>
    </SafeAreaView>
  );
}
