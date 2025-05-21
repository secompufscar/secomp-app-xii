import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { useRoute } from "@react-navigation/native";
import { updatePassword } from "../../services/users";

export default function SetNewPasswordScreen() {
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const navigation = useNavigation<AuthTypes>();
  const route = useRoute();
  const { token } = route.params as { token: string };

  const handleUpdatePassword = async () => {
    if (!senha || !confirmSenha) {
      Alert.alert("Erro", "Preencha ambos os campos de senha.");
      return;
    }
    if (senha !== confirmSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }


    try {
      await updatePassword(token, senha); // Chamada real à API
      setSuccessVisible(true);
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Erro",
        error?.response?.data?.message || "Falha ao redefinir a senha. Tente novamente."
      );
    }
  };

  const onSuccessClose = () => {
    setSuccessVisible(false);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-blue-900 rounded-3xl max-w-[1000px]" contentContainerStyle={{ paddingTop: 82, paddingBottom: 40 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HPv9vJILG7/qeowg0dd_expires_30_days.png" }}
            resizeMode="stretch"
            className="w-[28px] h-[28px] rounded-3xl ml-6 mb-[46px]"
          />
        </Pressable>

        <View className="mb-8 ml-6">
          <Text className="text-white text-2xl font-bold mb-4">Defina uma nova senha</Text>
          <Text className="text-[#B4B4B4] text-xs">Crie a sua nova senha</Text>
        </View>

        {/* Campo: Senha */}
        <View className="flex-row items-center bg-background border border-border rounded-lg py-[14px] pl-[18px] pr-[18px] mb-4 mx-6">
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HPv9vJILG7/u7nk39y1_expires_30_days.png" }}
            resizeMode="stretch"
            className="w-[11px] h-[12px] rounded-md mr-[15px]"
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#52607F"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            className="text-white text-xs flex-1"
          />
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HPv9vJILG7/xhlvto9n_expires_30_days.png" }}
            resizeMode="stretch"
            className="w-[13px] h-[13px] rounded-md"
          />
        </View>

        {/* Campo: Confirmar senha */}
        <View className="flex-row items-center bg-background border border-border rounded-lg py-[14px] pl-[18px] pr-[18px] mb-8 mx-6">
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HPv9vJILG7/eu0cg9es_expires_30_days.png" }}
            resizeMode="stretch"
            className="w-[11px] h-[12px] rounded-md mr-[15px]"
          />
          <TextInput
            placeholder="Confirmar senha"
            placeholderTextColor="#52607F"
            secureTextEntry
            value={confirmSenha}
            onChangeText={setConfirmSenha}
            className="text-white text-xs flex-1"
          />
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HPv9vJILG7/6kmb69ux_expires_30_days.png" }}
            resizeMode="stretch"
            className="w-[13px] h-[13px] rounded-md"
          />
        </View>

        <TouchableOpacity className="items-center bg-blue-old rounded-lg py-[13px] mx-6" onPress={handleUpdatePassword}>
          <Text className="text-white text-sm font-bold">Atualizar senha</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={successVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
          <View className="w-[300px] p-6 bg-blue-900 rounded-2xl justify-center items-center">
            <Image
              source={require("../../../assets/animacoes/check-success.gif")}
              style={{ width: 150, height: 150 }}
              resizeMode="contain"
            />
            <Text className="text-white text-lg font-bold text-center mb-4">Senha redefinida com sucesso!</Text>
            <Pressable onPress={onSuccessClose} className="bg-blue-old py-2.5 px-5 rounded-lg">
              <Text className="text-white font-bold">OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
