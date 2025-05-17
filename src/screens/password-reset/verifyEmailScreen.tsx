import React from "react";
import {
    SafeAreaView,
    View,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    Pressable
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";

export default function VerifyEmail() {
    const navigation = useNavigation<AuthTypes>();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="flex-1 bg-[#1C212C] rounded-3xl max-w-[1000px]"
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        source={{
                            uri:
                                "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HPv9vJILG7/a2vyc524_expires_30_days.png",
                        }}
                        resizeMode="stretch"
                        className="w-[28px] h-[28px] rounded-3xl mt-[82px] mb-[46px] ml-[24px]"
                    />
                </Pressable>

                <View className="mb-[42px] ml-[24px]">
                    <Text className="text-white text-[24px] font-bold mb-4">
                        Verifique seu e-mail
                    </Text>
                    <Text className="text-[#B4B4B4] text-[12px]">
                        Foi enviado um link para redefinição de senha no seu e-mail cadastrado.
                    </Text>
                </View>

                <TouchableOpacity
                    className="items-center bg-[#4153DF] rounded-lg py-[13px] mb-4 mx-[24px]"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-white text-[14px] font-bold">
                        Digitar novamente o e-mail
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="items-center border border-white rounded-lg py-[13px] mb-[255px] mx-[24px]"
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text className="text-white text-[14px] font-bold">
                        Voltar para o login
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
