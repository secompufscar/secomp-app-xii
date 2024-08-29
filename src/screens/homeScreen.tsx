import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from '../routes/stack.routes';

import { ButtonHome } from "../components/buttonHome";

import MultiCardCarousel from "../components/carousel"

import {getActivities} from "../services/activities"
import { useEffect } from 'react';

import { useAuth } from "../hooks/AuthContext";


import { useState } from "react"


export default function Home() {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {user:{user}}: any = useAuth()
    
    // const [activities, setActivities] = useState<Activity[]>([]);

    // useEffect(() => {
    //     const getActivitiesData = async () => {
    //         const data = await getActivities();
    //         setActivities(data);
    //     };
    
    //     getActivitiesData();
    //   }, []);

    return (

        <SafeAreaView className='bg-white flex-1'>
            <ScrollView className='flex-1'>

                <View className='flex-row  items-center  pt-12 pb-2 px-4 gap-4'>
                    <Text className='text-3xl font-bold text-blue'>Olá, {user.nome}!</Text>
                </View>


{/* 
                <View className='flex-row items-center justify-center pt-5 px-4 gap-4 space-x-4 border-b-2 border-blue mx-6 mb-2 py-4'>
                    <Text className='text-xl font-bold text-blue'>
                        O QUE É A SECOMP?
                    </Text>
                </View> */}

                <View className='flex-row items-center justify-center pt-9 pb-10 px-4 gap-4'>
                    <Text className='font-semibold break-all text-justify'>
                       BEM-VINDO À DÉCIMA SEGUNDA EDIÇÃO DA SEMANA DA COMPUTAÇÃO!
                    </Text>
                </View>

                <View className='items-center justify-center pb-7'>
                    <ButtonHome title="INSCREVA-SE NOS EVENTOS!" onPress={() => { navigation.navigate("Registration") }} />

                </View>


                <View className='flex-row items-center justify-center pt-12 px-4 gap-4 space-x-4 border-b-2 border-blue mx-6 mb-1 py-4'>
                    <Text className='text-xl font-bold text-blue'>
                        PATROCINADORES
                    </Text>
                </View>


                <MultiCardCarousel />
            </ScrollView>

        </SafeAreaView>
    );
}
