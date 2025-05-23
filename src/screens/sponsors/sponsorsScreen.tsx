import { SafeAreaView, ScrollView, View, Text, Button, Pressable, } from "react-native";
import BackButton from "../../components/button/backButton";
import { LinearGradient } from "expo-linear-gradient";

export default function Sponsors() {
    return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pb-12 pt-6 w-full max-w-[1000px]">
        <BackButton/>

        <LinearGradient
                            colors={["#29303F", "#2A3B5E"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="flex-col w-full rounded-[8px] justify-start gap-2 mb-8 px-6 py-4"
                            >
                                <Text className="text-white text-[13px] font-poppinsMedium">Inscreva-se na Secomp</Text>
                                <Text className="text-default text-[12px] font-inter leading-[1.4]">Para participar do evento e de suas atividades, você deve se inscrever por aqui</Text>
                                
                        </LinearGradient>
                        
        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-3">
            Recuperar senha
          </Text>

          <Text className="text-gray-400 font-inter text-sm">
            Por favor, insira seu e-mail para redefinir sua senha
          </Text>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};