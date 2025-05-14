import { useState } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from "../hooks/AuthContext";
import { MaterialIcons, AntDesign  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BeautifulName } from "beautiful-name"

export default function UserHome() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { signOut, user: { user } }: any = useAuth();

    const handleUnderstandPress = async () => {
        await AsyncStorage.setItem("isFirstTime", "true")
        navigation.navigate('Home');
    };

    return (
        <View className='bg-white flex-1'>            
            <View className='flex-1 justify-center items-center p-4'>
                <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                    Olá, {new BeautifulName(user.nome).beautifulName}! 👋
                </Text>

                <Text style={{ fontSize: 22, textAlign: 'center', marginVertical: 40, fontWeight: "bold" }}>
                    Inscrição Confirmada! 👍
                </Text>

                <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 40 }}>
                    Em breve, você poderá se inscrever nas atividades da Semana da Computação da UFSCar 2024 - SECOMP. 🚀🚀
                </Text>

                <TouchableOpacity
                    onPress={handleUnderstandPress}
                    className="bg-blue-old"
                    style={{
                        paddingVertical: 14,
                        paddingHorizontal: 36,
                        width: "50%",
                        borderRadius: 5,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 18, marginRight: 10 }}>Entendi</Text>
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
