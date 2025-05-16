import { useEffect, useState } from "react";
import { Text, View, Pressable, ScrollView, Linking, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BeautifulName } from "beautiful-name"
import { useAuth } from "../../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CompetitionsList from "../../components/home/competitionsList";


export default function Home() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { signOut, user: { user } }: any = useAuth()

    // Mensagem baseada no horário do dia
    const getCurrentTime = () => {
        const hours = new Date().getHours();
        if (hours < 12) {
            return "Bom dia," ;
        } else if (hours >= 12 && hours < 18) {
            return "Boa tarde," ; 
        } else {
            return "Boa noite," ;
        }
    };

    // Mensagem baseada no dia do evento
    const getCurrentDay = () => {
        const day = new Date().toLocaleDateString();

        switch (day){
            case "29/09/2025":
                return "Hoje é o 1° dia de evento";
            case "30/09/2025":
                return "Hoje é o 2° dia de evento";
            case "01/10/2025":
                return "Hoje é o 3° dia de evento";
            case "02/10/2025":
                return "Hoje é o 4° dia de evento";
            case "03/10/2025":
                return "Hoje é o último dia de evento";
            default:
                return `Hoje não é dia de evento`;
        }
    }

    const greeting  = getCurrentTime();
    const eventDay = getCurrentDay();

    // Nome do usuário
    const nomeCompleto = new BeautifulName(user.nome).beautifulName;
    const nomes = nomeCompleto.trim().split(" ");

    const primeiroNome = nomes[0];
    const ultimoNome = nomes[nomes.length - 1];

    // Inscrever-se no evento
    const subscribe = () => {

        console.log("Usuário inscrito nesta edição com suceso!");
    }

    useEffect(() => {
        // Caso seja a primeira vez do usuário acessando o app
        const handleWelcome = async () => {
            const isNotFirstTime = await AsyncStorage.getItem("isFirstTime")

            if (!isNotFirstTime) navigation.navigate("Welcome")
        }

        handleWelcome()
    }, [])

    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pb-12 w-full max-w-[1000px]">
                <View className="w-full flex-row items-center justify-between mt-8 mb-8 gap-4">
                    <View className="flex-col h-full flex-1 ">
                        <Text className="text-[13px] text-blue-100 font-inter">{eventDay}</Text>
                        <View className="flex-row items-center justify-start mt-[7px]">
                            <Text className="text-[16px] text-white font-poppinsSemiBold">{greeting} </Text>
                            <Text className="text-[16px] text-green font-poppinsSemiBold">{`${primeiroNome} ${ultimoNome}`}</Text>
                        </View>
                    </View>
                    
                    {/* Notificações */}
                    <Pressable onPress={() => { navigation.navigate("") }}>
                        <View className="w-11 h-11 flex items-center justify-center rounded-[8px] p-2 bg-iconbg">
                            <FontAwesomeIcon className="text-blue-200 text-xl" icon={faBell} />
                        </View>
                    </Pressable>
                </View>

                {/* Inscrição no evento */}
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="flex-col w-full rounded-[8px] justify-start gap-2 mb-8 px-6 py-4"
                    >
                        <Text className="text-white text-[13px] font-poppinsMedium">Inscreva-se na Secomp</Text>
                        <Text className="text-default text-[12px] leading-[1.4]">Para participar do evento e de suas atividades, você deve se inscrever por aqui</Text>
                        <Pressable onPress={subscribe} className="w-44 bg-blue-500 rounded-[6px] py-3 px-4 items-center mt-2 mb-1">
                            <Text className="text-white text-[12px] font-poppinsMedium">Inscrever-se</Text>
                        </Pressable>
                </LinearGradient>

                <View className="w-full mb-8 gap-4">
                    <Text className="text-xs text-green font-poppinsSemiBold">Guia do evento</Text>

                    <Pressable onPress={() => { navigation.navigate("") }}>
                        <View className="h-[80px] bg-background py-3 px-5 flex-row items-center gap-4 rounded-[8px]">
                            <Image source={require('../../../assets/home/guidebook.png')} style={{ width: 54, height: 54 }}/>
                            <View className="flex-col w-full justify-start gap-1">
                                <Text className="text-white text-[13px] font-poppinsMedium">Como participar da Secomp?</Text>
                                <Text className="hidden text-default text-[12px] font-inter leading-[1.4] xxs:block">Um guia com tudo o que você precisa!</Text>
                                <Text className="block text-default text-[12px] font-inter leading-[1.4] xxs:hidden">Um guia contendo tudo!</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>

                <View className="w-full mb-8 gap-1">
                    <Text className="text-xs text-green font-poppinsSemiBold">Competições</Text>

                    <CompetitionsList />
                </View>

                <View className="mb-10 flex justify-center">
                    <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-md text-neutral-700 mb-4">Redes Sociais</Text>

                    <View className="flex-row justify-between items-center space-x-3">
                        <Pressable className="h-20 grow" onPress={() => Linking.openURL("https://www.instagram.com/secompufscar/")}>
                            <View className="h-full w-full rounded-lg bg-neutral-200/30 flex items-center justify-center">
                                <FontAwesome6 name="instagram" size={42} color="#E1306C" />
                            </View>
                        </Pressable>

                        <Pressable className="h-20 grow" onPress={() => Linking.openURL("https://www.linkedin.com/company/secomp-ufscar/posts")}>
                            <View className="h-full w-full rounded-lg bg-neutral-200/30 flex items-center justify-center">
                                <FontAwesome6 name="linkedin" size={42} color="#0077B5" />
                            </View>
                        </Pressable>

                        <Pressable className="h-20 grow" onPress={() => Linking.openURL("https://www.facebook.com/secompufscar")}>
                            <View className="h-full w-full rounded-lg bg-neutral-200/30  flex items-center justify-center">
                                <FontAwesome6 name="square-facebook" size={42} color="#1877F2" />
                            </View>
                        </Pressable>

                        <Pressable className="h-20 grow" onPress={() => Linking.openURL("https://www.secompufscar.com.br/")}>
                            <View className="h-full w-full rounded-lg bg-neutral-200/30 flex items-center justify-center">
                                <MaterialCommunityIcons name="web" size={42} color="#333333" />
                            </View>
                        </Pressable>
                    </View>
                </View>              
            </ScrollView>
        </SafeAreaView>
    );
}