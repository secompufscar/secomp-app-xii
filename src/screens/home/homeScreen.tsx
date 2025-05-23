import { useEffect, useState } from "react";
import { Text, View, Pressable, ScrollView, Linking, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BeautifulName } from "beautiful-name"
import { useAuth } from "../../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faStar, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";

import AppLayout from "../../components/appLayout";
import HomeCompetitions from "../../components/home/homeCompetitions";
import HomeSocials from "../../components/home/homeSocials";

export default function Home() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { signOut, user: { user } }: any = useAuth()
    const [pressed, setPressed] = useState(false);

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
    
    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <AppLayout>
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
                        <Text className="text-default text-[12px] font-inter leading-[1.4]">Para participar do evento e de suas atividades, você deve se inscrever por aqui</Text>
                        <Pressable onPress={subscribe} className="w-44 bg-blue-500 rounded-[6px] py-3 px-4 items-center mt-2 mb-1">
                            <Text className="text-white text-[12px] font-poppinsMedium">Inscrever-se</Text>
                        </Pressable>
                </LinearGradient>

                {/* Guia do evento */}
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

                {/* Competições */}
                <View className="w-full mb-8 gap-1">
                    <Text className="text-xs text-green font-poppinsSemiBold">Competições</Text>
                    <HomeCompetitions />
                </View>

                {/* Patrocinadores */}
                <View className="w-full mb-8 gap-4">
                    <Text className="text-xs text-green font-poppinsSemiBold">Nossos apoiadores</Text>

                    <Pressable 
                        onPress={() => { navigation.navigate("") }}
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                        className={`w-full h-[62px] p-2 gap-3 flex-row items-center border border-border rounded-[8px] transition-all duration-50 
                            ${pressed ? 'bg-background' : ''
                        }`}>
                        <View className="w-11 h-full flex items-center justify-center bg-background rounded-[5px]">
                            <FontAwesomeIcon className="text-blue-500 text-xl" icon={faStar} />
                        </View>

                        <Text className="flex-1 text-white text-[13px] font-inter font-medium">Patrocinadores</Text>

                        <View className="w-6 h-full flex items-center justify-center">
                            <FontAwesomeIcon className="text-white text-md" icon={faChevronRight} />
                        </View>
                    </Pressable>
                </View>

                {/* Redes sociais */}
                <View className="w-full mb-8 gap-4">
                    <Text className="text-xs text-green font-poppinsSemiBold">Redes sociais</Text>
                    <HomeSocials />
                </View>            
            </AppLayout>
        </SafeAreaView>
    );
}