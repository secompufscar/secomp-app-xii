import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from '../routes/stack.routes';

import ImageCarousel from "../components/carousel"

import { useAuth } from "../hooks/AuthContext";

import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

import { useState } from "react"


export default function AdminHome() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { signOut, user: { user } }: any = useAuth()

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

                <View className='flex-col items-start pt-5 pb-2 px-4 gap-2 '>
                    <Text className='text-3xl font-bold text-blue'>Olá, {user.nome}!</Text>
                    <Text className='text-sm text-neutral-500'>Pontos: {user.points}</Text>

                </View>

                <View className='h-10 mx-6 mb-10 py-6 flex-row items-center justify-start space-x-4 border-b-2 border-blue' />

                <View className='m-6 flex-col justify-start space-y-4'>
                    <TouchableOpacity onPress={() => { navigation.navigate('Categorias') }}>
                        <View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/20'>
                            <View className='w-14 h-full ml-2 items-center justify-center'>
                                <MaterialIcons name="qr-code" size={24} color="#445BE6" />
                            </View>

                            <View className='grow'>
                                <Text className='text-xl font-semibold text-neutral-700'>Leitura de Presença</Text>
                            </View>

                            <View className='w-14 h-full ml-2 items-center justify-center'>
                                <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
                            </View>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={signOut}>
                        <View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/20'>
                            <View className='w-14 h-full ml-2 items-center justify-center'>
                                <MaterialIcons name="logout" size={24} color="#445BE6" />
                            </View>

                            <View className='grow'>
                                <Text className='text-xl font-semibold text-neutral-700'>Sair</Text>
                            </View>

                            <View className='w-14 h-full ml-2 items-center justify-center'>
                                <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>


                <View className='pb-6 justify-center'>
                    <ImageCarousel />
                </View>

            </ScrollView>

        </SafeAreaView>
    );
}
