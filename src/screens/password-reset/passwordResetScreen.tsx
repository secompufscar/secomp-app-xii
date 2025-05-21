import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { sendForgotPasswordEmail } from "../../services/users";
import BackButton from "../../components/button/backButton";
import Button  from "../../components/button/button";

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
          <Text className="text-white text-2xl font-bold mb-3">
            Recuperar senha
          </Text>
          <Text className="text-gray-400 text-xs">
            Por favor, insira seu e-mail para redefinir sua senha
          </Text>
        </View>

        <View className="flex-row items-center bg-background border border-border rounded-lg pl-[18px] py-3.5 px-4.5 mb-4">
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HPv9vJILG7/hvrzhk90_expires_30_days.png"
            }}
            resizeMode="stretch"
            className="w-3 h-2.5 rounded-lg mr-3.5"
          />
          <TextInput
            placeholder="Digite seu e-mail"
            placeholderTextColor="#536080"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 text-xs text-border"
          />
        </View>

        <Button title="Enviar" onPress={replacePass}/>

      </ScrollView>
    </SafeAreaView>
  );
}
