import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from "@react-navigation/native"
import { StackTypes } from '../routes/stack.routes';

import { ButtonHome } from "../components/buttonHome";

import { colors } from "../styles/colors"

import MultiCardCarousel from "../components/carousel"


export default function Home() {
    const navigation = useNavigation<StackTypes>();

    return (
        <SafeAreaView className='bg-white flex-1'>

            <View className='flex-row  items-center  pt-12 pb-2 px-4 gap-4'>
                <Text className='text-3xl font-bold text-green-700'>Olá, Usuário!</Text>
            </View>

            <View className='flex-row items-center justify-center pt-5 px-4 gap-4 '>
                <Text className='text-xl font-semibold text-neutral-700'>
                    O QUE É A SECOMP?
                </Text>
            </View>


            <View className='flex-row items-center justify-center pt-9 pb-10 px-4 gap-4'>
                <Text className='font-semibold-light break-all text-justify'>
                    A Semana Acadêmica da Computação da Universidade Federal de São Carlos (SECOMP UFSCar) 
                    surgiu da necessidade de trazer assuntos que fossem de interesse tanto da comunidade acadêmica quanto de entusiastas. 
                    A cada ano, alunos da graduação dos cursos do Departamento de Computação se mobilizam para realizar este grande evento,
                    no qual pessoas de diferentes áreas relacionadas são convidadas a apresentar, discutir 
                    e debater experiências e novidades que trarão informações, conhecimentos e inovação aos participantes.
                </Text>
            </View>

            <View className='items-center justify-center'>
            <ButtonHome title="INSCREVA-SE NOS EVENTOS!" onPress={() => {navigation.navigate("Home")}} />
            </View>



            <View className='flex-row items-center justify-center pt-9 px-4 gap-4'>
                <Text className='text-xl font-semibold text-neutral-700'>
                    PATROCINADORES
                </Text>
            </View>

            
            <MultiCardCarousel/>


        </SafeAreaView>
    );
}

