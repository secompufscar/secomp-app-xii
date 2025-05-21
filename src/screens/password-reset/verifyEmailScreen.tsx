import React from "react";
import {
    SafeAreaView,
    View,
    ScrollView,
    Text,
    Pressable
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { sendForgotPasswordEmail } from "../../services/users";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";


export default function VerifyEmail() {
    const navigation = useNavigation<AuthTypes>();
    const route = useRoute();
    console.log('route.params:', route.params);
    const { email } = route.params as { email: string } || { email: '' };

    // Reenviar e-mail de redefinição de senha
    async function resendEmail() {
        try {
          await sendForgotPasswordEmail({ email });
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
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pb-12 pt-6 w-full max-w-[1000px]">
                <BackButton/>

                <View className="mb-8">
                    <Text className="text-white text-2xl font-poppinsSemiBold mb-3">
                        Verifique seu e-mail
                    </Text>

                    <Text className="text-gray-400 font-inter text-sm">
                        Foi enviado um link para redefinição de senha no seu e-mail cadastrado.
                    </Text>
                </View>

                <Button title="Enviar novamente" onPress={() => {navigation.navigate("SetNewPassword")}}/>

                <Pressable
                    className="w-full mt-4 p-4 border border-gray-400 items-center justify-center rounded-lg outline-none"
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text className="text-gray-400 text-sm font-inter font-semibold">
                        Voltar para o login
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
